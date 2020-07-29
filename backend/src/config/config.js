import bunyan from 'bunyan'

const loggers = {
    test: bunyan.createLogger({ name: 'development', level: 'fatal' }),
    production: bunyan.createLogger({ name: 'development', level: 'info' }),
    development: bunyan.createLogger({ name: 'development', level: 'debug' })
}

export default {
    development: {
        log: loggers.development,
        database: {
            dsn: process.env.DB_DSN_DEVELOPMENT
        }
    },
    production: {
        log: loggers.production,
        database: {
            dsn: process.env.DB_DSN_PRODUCTION
        }
    },
    test: {
        log: loggers.test,
        database: {
            dsn: process.env.DB_DSN_TEST
        }
    }
}
