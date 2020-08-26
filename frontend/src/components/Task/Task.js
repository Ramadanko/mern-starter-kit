import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as taskActions from './TaskActions'
import TaskList from './TaskList'
import Paging from '../../common/Paging/Paging'
import SortBy from '../../common/SortBy/SortBy'
import LimitResult from '../../common/LimitResult/LimitResult'
import queryString from 'query-string'
import BackdropLoader from '../../common/BackdropLoader/BackdropLoader'
import { Grid, Typography } from '@material-ui/core'

class Task extends React.PureComponent {

  loadTasks = (key, value) => {
    let { actions, history } = this.props
    const queryStringObject = queryString.parse(history.location.search)
    let parsedQueryString = queryString.stringify(queryStringObject)
    parsedQueryString = parsedQueryString ? '?' + parsedQueryString : ''
    actions.getTasks(parsedQueryString)
  }

  remove = (id) => {
    this.props.actions.deleteTask(id)
      .then(res => {

      });
  }

  handleNewTask = () => {
    this.props.history.push('/task/create')
  }

  componentDidMount() {
    this.loadTasks()
  }

  render() {
    const { tasks, loading, taskCount, history } = this.props
    const queryStringObject = queryString.parse(history.location.search)
    const page = queryStringObject.page || 1
    const limit = parseInt(queryStringObject.limit) || 10
    const count = taskCount ? Math.round(taskCount / limit) : 1
    return (
      loading ?
        <BackdropLoader /> :
        <>
          <div>
            <Typography variant="h3" gutterBottom>
              All Tasks
              <Typography variant="caption" gutterBottom onClick={this.handleNewTask} style={{ cursor: 'pointer' }}>
                New Task
              </Typography>
            </Typography>
          </div>
          <Grid container spacing={2} alignItems="center" justify="flex-end" className="filters-wrapper">
            <Grid item><SortBy callback={this.loadTasks} /></Grid>
            <Grid item><LimitResult callback={this.loadTasks} /></Grid>
          </Grid>
          <TaskList items={tasks} remove={this.remove} />
          <br />
          <Paging page={page} count={count} callback={this.loadTasks} />
        </>
    );

  }
}

Task.propTypes = {
  tasks: PropTypes.array.isRequired,
  taskCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks.items ? state.tasks.items : [],
    taskCount: state.tasks.taskCount,
    loading: state.apiCallInProgress > 0
  }
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(taskActions, dispatch)
});

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(Task);
