/* A parent component to handle the appropriate props to be passed down to the data table component, 
where the columns and filtering are described by objects matched to the type of table being viewed
(Keys, Properties or People). The type of records being requested are selected in the NavBar and 
props are passed by React-Router in 'layout/App' */


import React, { Component } from 'react';
import { Input, Divider, Dropdown, Menu } from 'semantic-ui-react'
import RecordList from './RecordList';
import * as ui from './ui';

import 'semantic-ui-css/semantic.min.css';

class RecordDashboard extends Component {

  handleValue = (e, { value }) => this.setState({ filterValue: value});
  handleId = (e, { value }) => this.setState({ filterId: value })

  constructor(props) {
    super(props);
    this.state = {
      filterId: '',
      filterValue: '',
      tableType: this.props.tableType
    };
    this.handleId = this.handleId.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  //On switching table views from the NavBar, clear the last filter search and switch props
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.tableType !== prevState.tableType) {
      return {
        filterValue: '',
        tableType: nextProps.tableType
      };
    }
    return null;
  }

  render() {

    let columns = [];
    let options = [];
    let filter = {
      id: this.state.filterId,
      value: this.state.filterValue
    }
      //Selecting objects to pass, matching our requested table, which describe our columns and formatting
      switch (this.props.tableType) {
      case "keys":
        columns = ui.keyColumns;
        options = ui.keyFilter;
        break;
      case "properties":
        columns = ui.propertyColumns;
        options = ui.propFilter;
        break;
      case "people":
        columns = ui.peopleColumns;
        options = ui.peopleFilter;
        break;
      default:
        break;
  }



    return (
      <div>
        <div>
          <Dropdown 
          options={options}
          selection
          onChange={this.handleId}
          value={this.state.value}
          placeholder='Category...'
          />
          <Input
          style={{paddingLeft: '5px'}}
          icon='search'
          iconPosition='left'
          placeholder='Search...'
          onChange={this.handleValue}
          value={this.state.filterValue}
          />
        </div>
        <Divider/>
        <div>
          <RecordList type={this.props.tableType} columns={columns} filter={filter} />
        </div>
      </div>
    )
  }
}

export default RecordDashboard;