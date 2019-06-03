import { FETCHING, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from './recordConstants';

function handleHTTPErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchDataLoading = () => {
  return {
    type: FETCHING,
    payload: {
      isLoading: true
    }
  }
}

export const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data
  }
}

export const fetchDataFail = (err) => {
  return {
    type: FETCH_DATA_FAIL,
    payload: {
      error : true
    }
  }
}

export async function fetchData(dispatch){
  try {
    dispatch(fetchDataLoading());
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