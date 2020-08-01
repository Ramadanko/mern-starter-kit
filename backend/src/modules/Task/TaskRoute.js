import express from 'express'
import * as task from './TaskController'
import { taskUpdateValidations, taskCreateValidations } from './TaskValidations'

const router = express.Router()

router.route('/task')
  .post(taskCreateValidations, task.create)
  .get(task.read)

router.route('/task/:id')
  .get(task.getById)
  .put((req, res, next) => {
    return next()
  }, taskUpdateValidations, task.update)
  .delete(task.remove)

export default router
