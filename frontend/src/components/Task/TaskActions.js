import actions from './TaskConstants';
import * as taskApi from './TaskApi'
import { apiCallError, beginApiCall } from '../../common/Api/ApiActions'

export const getTasksSuccess = (tasks) => ({ type: actions.READ_TASKS, payload: tasks })
export const setTaskCount = (count) => ({ type: actions.SET_TASK_COUNT, payload: count })

export function getTasks(queryString) {
  return async (dispatch) => {
    dispatch(beginApiCall())
    try {
      let response = await taskApi.getTasks(queryString);
      dispatch(getTasksSuccess(response.data.items));
      dispatch(setTaskCount(response.data.count));
    } catch (error) {
      apiCallError()
    }
  }
}
