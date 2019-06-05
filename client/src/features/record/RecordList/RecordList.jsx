import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as ui from '../ui';

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
       page: 0,
       pages: 0,
       pageSize: 20,
       sorted: [],
       filtered: [],
       loading: false,
       columnsType: ui.keyColumns
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      switch (this.props.type) {
        case "keys":
          fetchData("keys", this.props.type, this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered, (res) => {
            this.setState({
              columnsType: ui.keyColumns,
              data: res.data,
              pages: res.pages,
              loading: false
            });
          });
          break;
        case "properties":
            fetchData("keys", this.props.type, this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered, (res) => {
              this.setState({
                columnsType: ui.propertyColumns,
                data: res.data,
                pages: res.pages,
                loading: false
              });
            });
          break;
        case "people":
            fetchData("keys", this.props.type, this.state.page, this.state.pageSize, this.state.sorted, this.state.filtered, (res) => {
              this.setState({
                columnsType: ui.peopleColumns,
                data: res.data,
                pages: res.pages,
                loading: false
              });
            });
          break;
        default:
          return;
      }
    }
  }

  render() {

    return (
      
      <div>
        <ReactTable
          className = '-highlight'
          data={this.state.data}
          pages={this.state.pages}
          columns={this.state.columnsType}
          minRows={1}
          defaultPageSize={20}
          loading={this.state.loading}
          showPagination={true}
          showPaginationTop={false}
          showPaginationBottom={true}
          pageSizeOptions={[5, 10, 20, 25, 50, 100]}
          manual
          onPageChange={(pageIndex) => {this.setState({page: pageIndex});}}
          onPageSizeChange={(pageSize, pageIndex) => {this.setState({ page: pageIndex, pageSize: pageSize});}}
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