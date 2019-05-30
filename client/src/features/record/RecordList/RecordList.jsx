import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class RecordList extends Component {
  render() {

    const columns = [{
      Header: 'Name',
      accessor: 'property.name' // String-based value accessors!
    }, {
      Header: 'Address',
      accessor: 'property.address',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'City',
      accessor: 'property.city' // Custom value accessors!
    }, {
      Header: props => <span>Key Id</span>, // Custom header components!
      accessor: 'key.id'
    }, {
      Header: 'Key Status',
      accessor: 'key.status'
    }];

    return (
      <div>
        <ReactTable
          data={this.props.records}
          columns={columns}
        />
      </div>
    );
  }
}

export default RecordList;