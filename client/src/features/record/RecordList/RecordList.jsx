import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class RecordList extends Component {
  render() {

    const columns = [{
      Header: 'Property Type',
      accessor: 'property.name', // String-based value accessors!
      minWidth: 150
    }, {
      Header: 'Property Address',
      accessor: 'property.address',
      minWidth: 200
    }, {
      Header: 'City/Municipality',
      accessor: 'property.city' // Custom value accessors!
    }, {
      Header: props => <span style={{textAlign:"center"}}>Key Location</span>, // Custom header components!
      accessor: 'key.id'
    }, {
      Header: 'Office Location',
      accessor: 'key.status',
      minWidth: 120
    }, {
      Header: 'Key Type',
      accessor: 'key.type'
    }, {
      Header: 'Key Status',
      accessor: 'key.status'
    }];

    return (
      <div>
        <ReactTable
          className = '-highlight'
          data={this.props.records}
          columns={columns}
        />
      </div>
    );
  }
}

export default RecordList;