import UserModel from '../User/UserModel'
import { generateJWT, decodeToken } from '../../utilities/jwt/jwt'

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(400).json({ message: 'Authentication failed. Invalid email/password.' })
    }

    const isPasswordMatch = await user.comparePassword(req.body.password)
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Authentication failed. Invalid email/password.' })
    }

    const { token, expiresAt } = generateJWT(user)
    const { email } = user
    return res.json({ user: { email }, token, expiresAt })
  } catch (error) {
    return res.json(error)
  }
}

export const logout = async (req, res) => {
  try {

  } catch (error) {

  }
}

export const isLoggedIn = async (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    /**
     * @description automatic decode
     * this will call next if token is valid and send error if its not.
     * It will attached the decoded token to req.user
     */
    return decodeToken(req, res, next)
  }
  return res.status(401).json({ message: 'Not logged in.' })
}

export const validateUserInDB = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id)
    if (!user) return res.status(401).json({ message: 'Unauthorized.' })
    req.user = user
    return next()
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' })
  }
}
