import os from 'os'
import http from 'http'
import express from 'express'
import cluster from 'cluster'
import config from './config/config.js'
import startDatabase from './config/database'
import Middleware from './utilities/App/Middleware'
import Routes from './utilities/App/Routes'

const CPUs = os.cpus().length
const log = config[process.env.NODE_ENV || 'development'].log
const app = express()
const server = http.createServer(app)

// set up application middleware
Middleware(app);
// set up application routes
Routes(app);
// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 404
  res.status(status).json(err)
})

const normalizePort = val => {
  const port = parseInt(val, 10)
  if (Number.isNaN(port)) {
    // named pipe
    return val
  }
  if (port >= 0) {
    return port
  }

  return false
}
const port = normalizePort(process.env.PORT || 3000)
app.set('port', port)

/**
 * @description
 */
if (cluster.isMaster && process.env.NODE_ENV !== 'development') {
  log.info(`Master ${process.pid} is running`)
  // create a worker for each cpu
  for (let cpu = 0; cpu < CPUs; cpu++) {
    cluster.fork()
  }
  cluster.on('exit', (worker) => {
    log.fatal(`Worker ${worker.process.pid} just died`)
  })
} else {
  startDatabase()
    .then(() => {
      log.info('Connected to MongoDB')
      server.listen(port)
    })
    .catch(error => log.warn(error))
}

server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`
  log.info(`Server is listening on ${bind}`)
})

// handle server error
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

  switch (error.code) {
    case 'EACCES':
      log.fatal(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      log.fatal(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      log.info(error)
  }
})
