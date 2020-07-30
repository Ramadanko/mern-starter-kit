import bodyParser from 'body-parser'
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan'
import cors from 'cors'

export default (app) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
  }
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(helmet.hidePoweredBy())
  app.use(compression())
  /**
   * @description body parser
   * Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
   */
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

}
