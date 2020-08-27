import React from 'react';
import PropTypes from 'prop-types'
import * as taskActions from './TaskActions'
import BackdropLoader from '../../common/BackdropLoader/BackdropLoader'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import TaskForm from './TaskForm'

class ManageTask extends React.Component {

  constructor(props) {
    super(props);
    this.state = { task: {} }
  }

  componentDidMount() {
    let { taskInterface, actions, match, task } = this.props;
    let { id } = match.params;
    if (!id) {// creating new one
      this.setState({ task: { ...taskInterface } })
    } else if (id && Object.keys(task).length === 0) {
      // updating new one but URL is loaded directly
      actions.getTaskById(id).catch(err => {
        throw err
      })
    } else {
      // update new one by clicking on edit link
      this.setState({ task: { ...task } })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (Object.keys(prevProps.task).length !== Object.keys(this.props.task).length) {
      this.setState({ task: { ...this.props.task } })
    }
  }

  render() {
    let { taskStatusOptions } = this.props;
    let { task } = this.state;
    return (
      Object.keys(task).length === 0 ? <BackdropLoader /> :
        <TaskForm task={task} taskStatusOptions={taskStatusOptions} />
    )
  }
}

ManageTask.propTypes = {
  task: PropTypes.object.isRequired,
  taskStatusOptions: PropTypes.array.isRequired,
  taskInterface: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const task = id && state.task.items.length > 0 ? state.task.items.find(item => item._id === id) : {}
  return {
    task
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(taskActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageTask)
