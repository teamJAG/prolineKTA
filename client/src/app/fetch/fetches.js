function handleHTTPErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export async function fetchRecordData(queryType, page, pageSize, sorted, filter, handleData) {
    let requestBody = {
      queryType: queryType,
      page: page,
      pageSize: pageSize,
      sorted: sorted,
      filter: filter,
    };
    try {
      let result = await fetch(`${process.env.REACT_APP_API_URL}/records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      result = await handleHTTPErrors(result);
      const records = await result.json();
      return handleData(records);
    } catch (err) {
      console.log("fetchData failed: " + err);
      return err;
    }
  }

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
    return handleData(record);
  } catch (err) {
    console.log("fetchKeyStatus failed: " + err);
    return err;
  }
}

export async function fetchKeyCheck(keyID, method, handleData) {
  try {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/keycheck`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(keyID)
    });
    result = await handleHTTPErrors(result);
    const record = await result.json();
    return handleData(record);
  } catch (err) {
    console.log("fetchKeyCheck failed: " + err);
    return err;
  }
}