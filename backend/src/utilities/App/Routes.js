import UserRoutes from '../../modules/User/UserRoute'

export default (app) => {
  app.use('/api', UserRoutes)
}
