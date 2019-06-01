import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class RecordList extends Component {

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
          data={this.props.records}
          columns={columns}
        />
      </div>
    );
  }
}

export default RecordList;