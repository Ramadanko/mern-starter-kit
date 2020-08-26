import taskActionTypes from './TaskConstants'
import initialState from '../../redux/initialState'

export const tasks = (state = initialState.tasks.items, action) => {
  switch (action.type) {
    case taskActionTypes.READ_TASKS:
      return [...action.payload];
    case taskActionTypes.GET_TASK_BY_ID:
      return state.length > 0 ? [...state, action.payload] : [action.payload]
    case taskActionTypes.CREATE_TASK:
      return state.length > 0 ? [...state, action.payload] : [action.payload]
    case taskActionTypes.UPDATE_TASK:
      return state.map(item => (item._id === action.payload._id ? { ...action.payload } : item))
    case taskActionTypes.DELETE_TASK:
      return state.filter(item => item._id !== action.payload)
    default:
      return state;
  }
}

export const taskCount = (state = initialState.tasks.taskCount, action) => {
  if (action.type === taskActionTypes.SET_TASK_COUNT) {
    return action.payload
  }

  return state;
}
