import UserRoutes from '../modules/User/UserRoute'
import AuthRoute from '../modules/Auth/AuthRoute'
import { isLoggedIn, validateUserInDB } from '../modules/Auth/AuthController'
import TaskRoute from '../modules/Task/TaskRoute'
import path from 'path'

export default (app) => {
  app.use('/api',AuthRoute)
  // secure API access
  app.all('/api/*', isLoggedIn, validateUserInDB)
  app.use('/api', UserRoutes)
  app.use('/api', TaskRoute)
  app.get('/*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../../../frontend/build/index.html'))
  });
}
