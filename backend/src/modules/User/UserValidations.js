import { check } from 'express-validator'
import messages from './UserMessages'

const validationsArray = [
  check('email').trim().isEmail().normalizeEmail().escape().withMessage(messages.notValidEmail),
  check('password').trim().isLength({ min: 8 })
]

export default validationsArray
