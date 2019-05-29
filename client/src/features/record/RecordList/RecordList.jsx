import React, { Component } from 'react';
// import RecordListItem from './RecordListItem';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class RecordList extends Component {
  render() {
    // const { records, deleteRecord } = this.props;
    const columns = [{
      Header:'Name',
      accessor: 'title' // String-based value accessors!
    }, {
      Header: 'Age',
      accessor: 'date',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'friendName', // Required because our accessor is not a string
      Header: 'Friend Name',
      accessor: 'city' // Custom value accessors!
    }, {
      Header: props => <span>Friend Age</span>, // Custom header components!
      accessor: 'venue'
    }, {
      Header: 'Host',
      accessor: 'hostedBy'
    }];
    return (
      <div>
        {/* {records.map(record => (
          <RecordListItem
            key={record.id}
            record={record}
            deleteRecord={deleteRecord}
          />
        ))} */}
        <ReactTable
        data={this.props.records}
        columns={columns}
        />
      </div>
    );
  }
}

export default RecordList;
