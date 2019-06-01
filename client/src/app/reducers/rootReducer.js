import { combineReducers } from 'redux';
import recordReducer from '../../features/record/recordReducer'

const rootReducer = combineReducers({
  records : recordReducer
})

export default rootReducer