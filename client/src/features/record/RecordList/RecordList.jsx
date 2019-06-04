import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

function handleHTTPErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

async function fetchData(endpoint, queryType, page, pageSize, sorted, filtered, handleData) {
  let requestBody = {
    queryType: queryType,
    page: page,
    pageSize: pageSize,
    sorted: sorted,
    filtered: filtered,
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
    return handleData(records);
  } catch (err) {
    console.log("fetchData failed: " + err);
    return err;
  }
}

class RecordList extends Component {

  constructor(props) {
    super(props);
    this.state = {
       data: [],
       pages: 0,
       loading: false
    };
}

  render() {



    return (
      <div>
        <ReactTable
          className = '-highlight'
          data={this.state.data}
          pages={this.state.pages}
          columns={this.props.columns}
          minRows={1}
          defaultPageSize={20}
          loading={this.state.loading}
          showPagination={true}
          showPaginationTop={false}
          showPaginationBottom={true}
          pageSizeOptions={[5, 10, 20, 25, 50, 100]}
          manual
          onFetchData={(state, instance) => {
                  this.setState({loading: true});
                  fetchData("keys", this.props.type, state.page, state.pageSize, state.sorted, state.filtered, (res) => {
                  this.setState({
                          data: res.data,
                          pages: res.pages,
                          loading: false
                  });
          });
          }}
        />
      </div>
    );
  }
}

export default RecordList;