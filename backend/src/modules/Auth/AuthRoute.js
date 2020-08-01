import express from 'express'
import { login, logout } from './AuthController'
import validationsArray from '../User/UserValidations'

const router = express.Router()
router.get('/auth/logout', logout)
router.post('/auth/login', validationsArray, login)
export default router
