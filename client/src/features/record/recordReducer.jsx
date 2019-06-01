import { createReducer } from 'redux-create-reducer';
import { CREATE_RECORD, DELETE_RECORD, UPDATE_RECORD, FETCH_RECORDS_SUCCESS, FETCH_RECORDS_FAIL } from './recordConstants';


const initialState = [{}];

export const createRecord = (state, payload) => {
  return [...state, Object.assign({}, payload.record)]
}

export const updateRecord = (state, payload) => {
  return [
    ...state.filter(record => record.id !== payload.record.id),
    Object.assign({}, payload.record)
  ]
}

export const deleteRecord = (state, payload) => {
  return [
    ...state.filter(record => record.id !== payload.recordId)
  ]
}

export function fetchRecordsSuccess(state, action) {
  return [
    ...action.payload
  ]
}

export function fetchRecordsFail(state, action) {
  return [
    ...state, action.error
  ]
}

export default createReducer(initialState, {
  [CREATE_RECORD]: createRecord,
  [UPDATE_RECORD]: updateRecord,
  [DELETE_RECORD]: deleteRecord,
  [FETCH_RECORDS_SUCCESS]: fetchRecordsSuccess,
  [FETCH_RECORDS_FAIL]: fetchRecordsFail
})