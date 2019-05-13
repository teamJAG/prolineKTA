import React, { Component } from './node_modules/react';
import { Grid } from './node_modules/semantic-ui-react';
import { connect } from './node_modules/react-redux';
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
      <Grid>
        <Grid.Column width={10}>
          <RecordList deleteRecord={this.handleDeleteRecord} records={records} />
        </Grid.Column>
        <Grid.Column width={6} />
      </Grid>
    );
  }
}

export default connect(mapState, actions)(RecordDashboard);
