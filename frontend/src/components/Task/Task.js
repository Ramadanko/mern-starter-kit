import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as taskActions from './TaskActions'
import TaskList from './TaskList'
import Paging from '../../common/Paging/Paging'
import { useHistory } from 'react-router-dom'
import SortBy from '../../common/SortBy/SortBy';
import LimitResult from '../../common/LimitResult/LimitResult'
import queryString from 'query-string'
import BackdropLoader from '../../common/BackdropLoader/BackdropLoader'
import Grid from '@material-ui/core/Grid'

const Task = ({ tasks, taskCount, loading, actions, ...props }) => {

  let history = useHistory();
  let queryStringObject = queryString.parse(history.location.search);
  let page = queryStringObject.page || 1;
  let sortBy = queryStringObject.sortBy || '';
  let limit = parseInt(queryStringObject.limit) || 10;
  let count = taskCount ? Math.round(taskCount / limit) : 1;

  useEffect(() => {
    loadTasks(false);
  }, [page, sortBy, limit])

  const loadTasks = (key, value) => {
    let parsedQueryString = queryString.stringify(queryStringObject);
    parsedQueryString = parsedQueryString ? '?' + parsedQueryString : ''
    actions.getTasks(parsedQueryString);
  }

  const remove = (id) => {
    actions.deleteTask(id);
  }

  return (
    loading ?
      <BackdropLoader /> :
      <>
        <h1>All Tasks</h1>
        <Grid container spacing={2} alignItems="center" justify="flex-end">
          <Grid item><SortBy /></Grid>
          <Grid item><LimitResult /></Grid>
        </Grid>
        <TaskList items={tasks} remove={remove} />
        <br />
        <Paging page={page} count={count} loadData={loadTasks} />
      </>
  );
}

Task.propTypes = {
  tasks: PropTypes.array.isRequired,
  taskCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    tasks: state.tasks,
    taskCount: state.taskCount,
    loading: state.apiCallInProgress > 0
  }
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(taskActions, dispatch)
});

const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
export default connectedStateAndProps(Task);
