import { combineReducers } from 'redux'
import apiCallInProgress from '../common/Api/ApiReducer'

const rootReducer = combineReducers({
  apiCallInProgress
});

export default rootReducer;
