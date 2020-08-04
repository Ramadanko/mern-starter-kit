import taskActionTypes from './TaskConstants'
import initialState from '../../redux/initialState'

export default (state = initialState.tasks, action) => {
  switch (action.type) {
  case taskActionTypes.READ_TASKS:
    return [...action.payload];
  default:
    return state;
  }
}

export const taskCount = (state = initialState.taskCount, action) => {
  if (action.type === taskActionTypes.SET_TASK_COUNT) {
    return action.payload
  }

  return state;
}
