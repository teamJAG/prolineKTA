import { createReducer } from 'redux-create-reducer';
import { CREATE_RECORD, DELETE_RECORD, UPDATE_RECORD, FETCHING, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from './recordConstants';


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

export function fetchDataLoading(state, action) {
  return [
    ...state, action.payload
  ]
}

export function fetchDataSuccess(state, action) {
  return [
    action.payload
  ]
}

export function fetchDataFail(state, action) {
  return [
    action.payload
  ]
}

export default createReducer(initialState, {
  [CREATE_RECORD]: createRecord,
  [UPDATE_RECORD]: updateRecord,
  [DELETE_RECORD]: deleteRecord,
  [FETCHING]: fetchDataLoading,
  [FETCH_DATA_SUCCESS]: fetchDataSuccess,
  [FETCH_DATA_FAIL]: fetchDataFail
})