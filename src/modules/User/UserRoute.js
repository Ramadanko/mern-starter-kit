import express from 'express'
import validationsArray from './UserValidations'
import { create } from './UserController'

const router = express.Router()

router.post('/user/create', validationsArray, create)

export default router
