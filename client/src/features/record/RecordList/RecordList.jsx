import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

function handleHTTPErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

async function fetchData(endpoint, page, pageSize, sorted, filtered, handleData) {
  let requestBody = {
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
       loading: false,
       pages: 0
    };
}

  render() {

    const columns = [{
      Header: 'Property Type',
      accessor: 'property_type',
      minWidth: 150
    }, {
      Header: 'Property Address',
      accessor: 'address',
      minWidth: 200
    }, {
      Header: 'City/Municipality',
      accessor: 'city',
      style: {textAlign: 'center'}
    }, {
      Header: 'Key Location',
      accessor: 'storage_location',
      style: {textAlign: 'center'}
    }, {
      Header: 'Office Location',
      accessor: 'office_location',
      minWidth: 120,
      style: {textAlign: 'center'}
    }, {
      Header: 'Key Number',
      accessor: 'key_number',
    }, {
      Header: 'Key Type',
      accessor: 'key_type',
      style: {textAlign: 'center'}
    }, {
      Header: 'Key Status',
      accessor: 'key_status',
      style: {textAlign: 'center'}
    }
  ];

    return (
      <div>
        <ReactTable
          className = '-highlight'
          data={this.state.data}
          columns={columns}
          defaultPageSize={25}
          loading={this.state.loading}
          showPagination={true}
          showPaginationTop={false}
          showPaginationBottom={true}
          pageSizeOptions={[5, 10, 20, 25, 50, 100]}
          manual
          onFetchData={(state, instance) => {
                  this.setState({loading: true});
                  fetchData("keys", state.page, state.pageSize, state.sorted, state.filtered, (res) => {
                  this.setState({
                          data: res,
                          pages: res.totalPages,
                          loading: false
                  })
          });
          }}
        />
      </div>
    );
  }
}

export default RecordList;