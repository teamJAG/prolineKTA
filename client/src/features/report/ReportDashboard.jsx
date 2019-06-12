import React, { Component } from 'react';
import { Input, Divider, Dropdown, Menu } from 'semantic-ui-react'
import ReportList from './ReportList';
import * as ui from './ui';

import 'semantic-ui-css/semantic.min.css';

class ReportDashboard extends Component {

  handleValue = (e, { value }) => this.setState({ filterValue: value});
  handleId = (e, { value }) => this.setState({ filterId: value })

  constructor(props) {
    super(props);
    this.state = {
      filterId: '',
      filterValue: ''
    };
    this.handleId = this.handleId.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }

  render() {

    let columns = [];
    let options = [];
    let filter = {
      id: this.state.filterId,
      value: this.state.filterValue
    }
    
      switch (this.props.tableType) {
      case "keys":
        columns = ui.reportColumns;
        options = ui.reportFilter;
        break;
      case "buildings":
        columns = ui.buildingColumns;
        options = ui.buildingFilter;
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
          />
        </div>
        <Divider/>
        <div>
          <ReportList type={this.props.tableType} columns={columns} filter={filter} />
        </div>
      </div>
    )
  }
}

export default ReportDashboard;
