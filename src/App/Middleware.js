import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import favicon from 'serve-favicon';
import express from 'express'
import path from 'path'

export default (app) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(cors())
  }
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(helmet.hidePoweredBy())
  app.use(compression())
  /**
   * @description body parser
   * Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
   */
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(favicon(path.join(__dirname, '../../frontend/build/favicon.ico')))
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
}
