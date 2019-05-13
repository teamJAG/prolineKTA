import { combineReducers } from 'redux';
import testReducer from '../../features/testarea/testReducer';
import recordReducer from '../../features/record/recordReducer'

const rootReducer = combineReducers({
  test: testReducer,
  records: recordReducer
})

export default rootReducer