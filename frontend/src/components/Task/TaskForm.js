import React, { useState } from 'react';
import PropTypes from 'prop-types'
import * as taskActions from './TaskActions'
import { useHistory } from 'react-router-dom'
import TinyMCE from '../../common/TinyMCE/TinyMCE'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {
  Button,
  TextField,
  Select,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  FormControl,
  Typography,
  LinearProgress,
  MenuItem
} from '@material-ui/core/'

const TaskForm = ({ taskStatusOptions, actions, ...props }) => {

  let history = useHistory();
  let [task, setTask] = useState({...props.task});

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.saveTask(task)
      .then(task => {
        history.push(`/task/${task._id}`)
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    setTask( prevTask => ({...prevTask, [name]: value}))
  }

  const handleRteChange = (value) => {
    setTask(prevState => ({
      ...prevState,
      description: value
    }))
  }

  return (
    <>
      <h1>{task._id ? 'Edit' : 'Create'} task</h1>
      <form onSubmit={handleSubmit} noValidate autoComplete="off" className="task-form">
        <FormControl margin="dense" fullWidth>
          <label htmlFor="title">Title</label>
          <OutlinedInput required id='title' name='title' autoFocus onChange={handleChange} value={task.title} />
        </FormControl>
        <FormControl fullWidth>
          <label htmlFor="status">Status</label>
          <Select name="status" id="status" onChange={handleChange} value={task.status} variant="outlined">
            {taskStatusOptions.map((item, index) => (
              <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TinyMCE handleRteChange={handleRteChange} value={task.description} />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">Save</Button>
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
