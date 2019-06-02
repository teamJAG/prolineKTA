import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../recordActions';
import RecordList from '../RecordList/RecordList';
import { Search } from 'semantic-ui-react';

const mapStateToProps = state => ({
  records: state.records,
  isLoading: state.isLoading
});

class RecordDashboard extends Component {

  componentDidMount() {
    this.props.dispatch(fetchData);
  }

  render() {
    const { records, isLoading } = this.props;
    return (
      <div>
        <div>
          <Search
            loading={isLoading}
             />
        </div>
          <RecordList records={records} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(RecordDashboard);
