function handleHTTPErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

//Fetch call to get data for React-Table
export async function fetchRecordData(endpoint, queryType, page, pageSize, sorted, filter, handleData) {
    let requestBody = {
      queryType: queryType,
      page: page,
      pageSize: pageSize,
      sorted: sorted,
      filter: filter,
    };
    try {
      let result = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      result = await handleHTTPErrors(result);
      const records = await result.json();
      console.log("API response OK.");
      return handleData(records);
    } catch (err) {
      console.log("fetchData failed: " + JSON.stringify(err));
      window.alert("Failure: " + JSON.stringify(err.message));
      return;
    }
  }

//Fetch for individual key/property records
  export async function fetchRecord(request, method, endpoint, handleData) {
    try {
      let result = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
      result = await handleHTTPErrors(result);
      const records = await result.json();
      return handleData(records);
    } catch(err) {
      console.log("fetch failed: " + JSON.stringify(err));
      window.alert("Failure: " + JSON.stringify(err.message));
      return;
    }
  }


//Fetch for individual key/transaction records
export async function fetchKeyStatus(request, method, handleData) {
  try {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/keystatus`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    result = await handleHTTPErrors(result);
    const record = await result.json();
    console.log("API response: " + JSON.stringify(record));
    return handleData(record);
  } catch (err) {
    window.alert(err);
    console.log("fetchKeyStatus failed: " + JSON.stringify(err));
    window.alert("Failure: " + JSON.stringify(err.message));
    return;
  }
}

//Fetch for changing key status and creation transactions
export async function fetchKeyCheck(request, method, handleData) {
  try {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/keycheck`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    result = await handleHTTPErrors(result);
    const record = await result.json();
    console.log("API response: " + JSON.stringify(record));
    return handleData(record);
  } catch (err) {
    console.log("fetchKeyCheck failed: " + JSON.stringify(err));
    window.alert("Failure: " + JSON.stringify(err.message));
    return;
  }
}

//Fetch for result sets for the autocomplete search bars
export async function fetchNames(request, handleData) {
  try {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/search`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    result = await handleHTTPErrors(result);
    const records = await result.json();
    return handleData(records);
  } catch (err) {
    console.log("fetch failed: " + JSON.stringify(err));
    window.alert("Failure: " + JSON.stringify(err.message));
    return; 
  }
}