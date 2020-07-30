import express from 'express'
import { login, logout } from './AuthController'
import validationsArray from '../User/UserValidations'

const router = express.Router()
router.get('/logout', logout)
router.post('/Login', validationsArray, login)
export default router
