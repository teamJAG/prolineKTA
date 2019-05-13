import React, { Component } from 'react';
import RecordListItem from './RecordListItem';

class RecordList extends Component {
  render() {
    const { records, deleteRecord } = this.props;
    return (
      <div>
        {records.map(record => (
          <RecordListItem
            key={record.id}
            record={record}
            deleteRecord={deleteRecord}
          />
        ))}
      </div>
    );
  }
}

export default RecordList;
