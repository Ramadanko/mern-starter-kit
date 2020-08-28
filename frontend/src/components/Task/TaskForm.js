import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as taskActions from './TaskActions'
import { useHistory } from 'react-router-dom'
import TinyMCE from '../../common/TinyMCE/TinyMCE'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Button,
  Select,
  OutlinedInput,
  FormControl,
  LinearProgress,
  MenuItem,
  FormHelperText
} from '@material-ui/core/'
import isEmpty from 'validator/es/lib/isEmpty'
import sanitizeHtml from 'sanitize-html'

const TaskForm = ({ taskStatusOptions, actions, ...props }) => {

  let history = useHistory()
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  let [task, setTask] = useState({ ...props.task })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isFormValid()) {
      return
    }
    setSaving(true)
    actions.saveTask(task)
      .then(task => {
        history.push(`/task/${task._id}`)
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setTask(prevTask => ({ ...prevTask, [name]: value }))
  }

  const handleRteChange = (value) => {
    setTask(prevState => ({
      ...prevState,
      description: value
    }))
  }

  const isFormValid = () => {
    const errors = {}

    if (!task.title && isEmpty(task.title)) {
      errors.title = 'Title cannot be empty'
    }

    if (!validateEditor(task.description)) {
      errors.description = "Invalid editor contents";
    }

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateEditor = (value) => {
    return sanitizeHtml(value, {
      exclusiveFilter: (frame) => {
        return frame.tag === 'script'
      },
      textFilter: (value) => {
        return value.replace(/\\n|\s\s/g, '').trim()
      },
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h2']),
      allowedAttributes: false
    })
  }

  return (
    <>
      <h1>{task._id ? 'Edit' : 'Create'} task</h1>
      <form onSubmit={handleSubmit} noValidate autoComplete="off" className="task-form">
        <FormControl margin="dense" fullWidth error={!!errors.title}>
          <label htmlFor="title">Title</label>
          <OutlinedInput required id='title' name='title' autoFocus onChange={handleChange} value={task.title} />
          {errors.title ? <FormHelperText>{errors.title}</FormHelperText> : null}
        </FormControl>
        <FormControl fullWidth>
          <label htmlFor="status">Status</label>
          <Select name="status" id="status" onChange={handleChange} value={task.status} variant="outlined">
            {taskStatusOptions.map((item, index) => (
              <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth error={!!errors.description}>
          <TinyMCE handleRteChange={handleRteChange} value={task.description} />
          {errors.description ? <FormHelperText>{errors.description}</FormHelperText> : null}
        </FormControl>
        <Button variant="contained" color="primary" type="submit" disabled={saving}>Save</Button>
        <br />
        {saving ? <LinearProgress /> : null}
      </form>
    </>
  )
}

TaskForm.propTypes = {
  task: PropTypes.object.isRequired,
  taskStatusOptions: PropTypes.array.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(taskActions, dispatch)
})

export default connect(null, mapDispatchToProps)(TaskForm)
