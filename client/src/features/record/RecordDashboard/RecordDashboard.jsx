import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecords } from '../recordActions';
import RecordList from '../RecordList/RecordList';

const mapStateToProps = state => ({
  records: state.records
});

class RecordDashboard extends Component {

  componentDidMount() {
    this.props.dispatch(fetchRecords);
  }

  render() {
    const { records } = this.props;
    return (
      <RecordList records={records} />
    );
  }
}

export default connect(mapStateToProps)(RecordDashboard);
