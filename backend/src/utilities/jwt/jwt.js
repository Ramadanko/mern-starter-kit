import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

const algorithm = 'HS256'
const expiresIn = 36000 // time in seconds: 10 hours
export const jwtSecret = 'some secret'
export const decodeToken = expressJwt({ secret: jwtSecret, algorithms: [algorithm] })

export const generateJWT = (user) => {
  const token = jwt.sign({ email: user.email, _id: user.id }, jwtSecret, { algorithm: algorithm, expiresIn: expiresIn })
  return { token, expires_at: (Date.now() + (expiresIn * 1000)) }
}
