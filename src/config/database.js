import mongoose from 'mongoose'
import configurations from './config.js'

const config = configurations[process.env.NODE_ENV || 'development']

export default function () {
  return mongoose.connect(config.database.dsn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
}
