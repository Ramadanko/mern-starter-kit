import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as taskActions from './TaskActions'
import { bindActionCreators } from 'redux'


const TaskDetail = ({ id, task, actions }) => {

  let length = task && Object.keys(task).length;
  useEffect(() => {
    if (!length) {
      actions.getTaskById(id).catch(error => {
        console.log('error ===>', error)
      })
    }
  },[length, actions, id])

  return (
    task && Object.keys(task).length ?
      <>
        <h1>{task.title}</h1>
        <p><b>Status:</b> {task.status}</p>
        <div dangerouslySetInnerHTML={{ __html: task.description }} />
      </> : ''
  )
}


TaskDetail.propTypes = {
  id: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = (state, prevProps) => {
  const id = prevProps.match.params.id;
  // TODO: replace with redux selectors
  const task = state.tasks.length > 0 ? state.tasks.find(item => item && item._id === id) : {};
  return { task, id }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(taskActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
