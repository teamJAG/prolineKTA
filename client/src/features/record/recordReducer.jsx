import { createReducer } from '../../app/common/util/reducerUtil';
import { CREATE_RECORD, DELETE_RECORD, UPDATE_RECORD } from './recordConstants';

const initialState = [
  {
    property : {
      id : 1,
      address : "414-a Craigflower rd.",
      address2 : "",
      postalCode : "",
      city : "Victoria",
      phone : 2508882090,
      name : "Craigflower Village"
    },
    key : {
      id : 1,
      location : "Main Office",
      quantity: 1,
      status : "in",
      pending: false,
      type : "master"
    }
  },
  {
    property : {
      id : 2,
      address : "815 Head st.",
      address2 : "",
      postalCode : "",
      city : "Victoria",
      phone : 2508492343,
      name : "Slum Lord Court"
    },
    key : {
      id : 2,
      location : "Main Office",
      quantity: 1,
      status : "out",
      pending: false,
      type : "master"
    }
  },
  {
    property : {
      id : 3,
      address : "2121 Fairfield rd.",
      address2 : "",
      postalCode : "",
      city : "Victoria",
      phone : 2503190325,
      name : "Avalon Court"
    },
    key : {
      id : 3,
      location : "Main Office",
      quantity: 1,
      status : "in",
      pending: true,
      type : "trade"
    }
  }
];

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

export default createReducer(initialState, {
  [CREATE_RECORD]: createRecord,
  [UPDATE_RECORD]: updateRecord,
  [DELETE_RECORD]: deleteRecord
})