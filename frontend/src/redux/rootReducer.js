import { combineReducers } from 'redux'
import apiCallInProgress from '../common/Api/ApiReducer'
import tasks, { taskCount } from '../components/Task/TaskReducer'

const rootReducer = combineReducers({
  tasks,
  taskCount,
  apiCallInProgress
});

export default rootReducer;
