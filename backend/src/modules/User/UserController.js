import UserModel from './UserModel'
import { validationResult } from 'express-validator'
import { generateJWT } from '../../utilities/jwt/jwt'

const create = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.json(errors)
    const user = new UserModel({
      email: req.body.email,
      password: req.body.password
    })
    const savedUser = await user.save()
    if (savedUser) {
      const token = generateJWT(user)
      return res.json({ user, token })
    }
  } catch (error) {
    return res.status(400).send({ error })
  }
}

export {
  create
}
