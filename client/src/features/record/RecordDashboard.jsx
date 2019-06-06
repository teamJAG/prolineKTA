import React, { Component } from 'react';
import { Input, Divider, Dropdown } from 'semantic-ui-react'
import RecordList from './RecordList';
import * as ui from './ui';

import 'semantic-ui-css/semantic.min.css';

class RecordDashboard extends Component {

  handleText(event, data) {
    if (event.target.id === "filterId") {
      this.setState({
        filterId: data.value
      });
    } else {
      this.setState({
        filterValue: event.target.value
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      filterId: '',
      filterValue: ''
    };
    this.handleText = this.handleText.bind(this);
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
        <Dropdown 
        options={options}
        placeholder='Category...'
        onChange={this.handleText}
        selection
        value={this.state.filterId}
        />
        <Input
        id='filterValue'
        icon='search'
        iconPosition='left'
        placeholder='Search...'
        onChange={this.handleText}
        />
        <Divider />
        <div>
          <RecordList columns={columns} type={this.props.tableType} filter={filter}/>
        </div>
      </div>
    )
  }
}

export default RecordDashboard;