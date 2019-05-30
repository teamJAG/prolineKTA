import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteRecord } from '../recordActions';
import RecordList from '../RecordList/RecordList';

const mapState = state => ({
  records: state.records
});

const actions = {
  deleteRecord
};

class RecordDashboard extends Component {
  handleDeleteRecord = recordId => () => {
    this.props.deleteRecord(recordId);
  };

  render() {
    const { records } = this.props;
    return (
      <RecordList deleteRecord={this.handleDeleteRecord} records={records} />
    );
  }
}

export default connect(mapState, actions)(RecordDashboard);
