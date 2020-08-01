import UserRoutes from '../../modules/User/UserRoute'
import AuthRoute from '../../modules/Auth/AuthRoute'
import { isLoggedIn, validateUserInDB } from '../../modules/Auth/AuthController'

export default (app) => {
  app.use(AuthRoute)
  // secure API access
  app.all('/api/*', isLoggedIn, validateUserInDB)
  app.use('/api', UserRoutes)
}
