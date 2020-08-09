import mongoose from 'mongoose'

const taskStatusEnum = ['open', 'in-progress', 'done']

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3
  },
  description: {
    type: String,
    require: true
  },
  status: {
    type: String,
    required: true,
    enum: taskStatusEnum,
    default: 'open'
  },
  assignee: {
    userId: { type: String, default: '' },
    username: { type: String, default: '' }
  }
}, {
  timestamps: true
})

export default mongoose.model('Task', TaskSchema)
