import Task from './TaskModel'
import { validationResult } from 'express-validator'
import { buildObjectToSave } from '../../utilities/functions'

const read = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0
    const limit = req.query.limit ? parseInt(req.query.limit) : 10
    const sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt'
    const count = await Task.estimatedDocumentCount()
    const allTask = await Task.find({}).limit(limit).skip(limit * page).sort(sortBy)
    return res.json({ items: allTask, count })
  } catch (error) {
    return res.status(404).json({ message: "Couldn't retrieve items from database" })
  }
}

const getById = async (req, res) => {
  try {
    const todo = await Task.findById(req.params.id)
    return res.json({ item: todo })
  } catch (error) {
    return res.json(error)
  }
}

const create = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.json(errors)
  try {
    const toBeSaved = buildObjectToSave(req.body, Object.keys(Task.schema.obj))
    const todo = new Task(toBeSaved)
    const savedTask = await todo.save()
    if (savedTask) return res.json({ item: savedTask })
  } catch (error) {
    return res.json(error)
  }
}

const update = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.json(errors)
  try {
    const toBeSaved = buildObjectToSave(req.body, Object.keys(Task.schema.obj))
    const todo = await Task.findByIdAndUpdate(req.params.id, toBeSaved, { new: true, runValidators: true })
    return res.json({ item: todo })
  } catch (error) {
    return res.json(error)
  }
}

const remove = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    return res.json({ message: 'deleted!' })
  } catch (error) {
    return res.json(error)
  }
}

// TODO search later
// const search = async (req, res) => {
//
// }

export {
  read,
  getById,
  create,
  update,
  remove
}
