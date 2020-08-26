import actions from './TaskConstants'
import * as taskApi from './TaskApi'
import { apiCallError, beginApiCall } from '../../common/Api/ApiActions'

export const getTasksSuccess = (tasks) => ({ type: actions.READ_TASKS, payload: tasks })
export const setTaskCount = (count) => ({ type: actions.SET_TASK_COUNT, payload: count })
export const getTaskByIdSuccess = (task) => ({ type: actions.GET_TASK_BY_ID, payload: task })
export const creteTaskSuccess = (task) => ({ type: actions.CREATE_TASK, payload: task })
export const updateTaskSuccess = (task) => ({ type: actions.UPDATE_TASK, payload: task })
export const deleteTaskSuccess = (id) => ({ type: actions.DELETE_TASK, payload: id })

export const getTasks = (queryString) => {
  return async (dispatch, getState) => {
    dispatch(beginApiCall())
    try {
      let { count } = getState()
      let response = await taskApi.getTasks(queryString)
      dispatch(getTasksSuccess(response.data.items))
      if (response.data.count !== count)
        dispatch(setTaskCount(response.data.count))
    } catch (error) {
      dispatch(apiCallError(error))
      throw error
    }
  }
}

export const getTaskById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(beginApiCall())
      let response = await taskApi.getTaskById(id)
      dispatch(getTaskByIdSuccess(response.data.item))
    } catch (error) {
      dispatch(apiCallError(error))
      throw error
    }
  }
}

export const saveTask = task => {
  return async (dispatch) => {
    dispatch(beginApiCall())
    if (task._id) {
      try {
        let response = await taskApi.updateTask(task)
        dispatch(updateTaskSuccess(response.data.item))
        return response.data.item
      } catch (error) {
        dispatch(apiCallError(error))
        throw error
      }
    } else {
      try {
        let response = await taskApi.createTask(task)
        dispatch(creteTaskSuccess(response.data.item))
        return response.data.item
      } catch (error) {
        dispatch(apiCallError(error))
        throw error
      }
    }
  }
}

export const deleteTask = (id) => {
  return (dispatch) => {
    return taskApi.deleteTask(id).then(res => {
      dispatch(deleteTaskSuccess(id))
      return res;
    }).catch(error => {
      dispatch(apiCallError(error))
      throw error;
    })
  }
}
