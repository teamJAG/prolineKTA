import { FETCH_RECORDS_SUCCESS, FETCH_RECORDS_FAIL } from './recordConstants';

function handleHTTPErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchDataSuccess = (data) => {
  return {
    type: FETCH_RECORDS_SUCCESS,
    payload: data
  }
}

export const fetchDataFail = (error) => {
  return {
    type: FETCH_RECORDS_FAIL,
    error: error
  }
}

export async function fetchRecords(dispatch){
  try {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/keys`);
    result = await handleHTTPErrors(result);
    const records = await result.json();
    return dispatch(fetchDataSuccess(records));
  } catch (err) {
    console.log(err);
    return dispatch(fetchDataFail(err));
  }
}

export function updateRecord(record) {
  return;
}

export function createRecord(record) {
  return;
}

export function deleteRecord(record) {
  return;
}