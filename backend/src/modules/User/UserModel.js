import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
const SALT_ROUNDS = 12
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
    index: { unique: true },
    min: 6,
    max: 30
  },
  fullName: {
    type: String,
    required: false,
    match: [/[a-zA-Z]/] // regex built-in validation
  },
  role: {
    type: String,
    require: true,
    enum: ['super admin', 'admin', 'regular'],
    default: 'regular'
  }
}, {
  timestamps: true
})

/**
 * @description
 * Use function keyword to get the binding for this keyword which represents the returned user from Mongo
 */
UserSchema.pre('save', async function preSave (next) {
  // user refers to the actual to BE SAVED object
  const user = this
  // isModified is given by mongoose
  if (!user.isModified('password')) return next()
  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS)
    user.password = hash
    return next()
  } catch (error) {
    return next(error)
  }
})

/**
 * @description Use function keyword to get the binding for this keyword which represents the returned user from Mongo
 * this method will be available on every document comes from the database
 * @param passwordFromRequest
 * @returns {*}
 */
UserSchema.methods.comparePassword = async function comparePassword (passwordFromRequest) {
  // compare function with linear execution time to prevent timing attacks.
  // these are attacks that execute time after comparison, to guess how close a given password is to the real one.
  return bcrypt.compare(passwordFromRequest, this.password)
}

export default mongoose.model('User', UserSchema)
