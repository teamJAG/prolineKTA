import { CREATE_RECORD, DELETE_RECORD, UPDATE_RECORD } from './recordConstants';

export const createRecord = (record) => {
  return {
    type: CREATE_RECORD,
    payload: {
      record
    }
  }
}

export const updateRecord = (record) => {
  return {
    type: UPDATE_RECORD,
    payload: {
      record
    }
  }
}

export const deleteRecord = (recordId) => {
  return {
    type: DELETE_RECORD,
    payload: {
      recordId
    }
  }
}