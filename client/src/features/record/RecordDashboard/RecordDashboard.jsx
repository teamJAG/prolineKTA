import React, { Component } from 'react';
import { Input, Divider, Dropdown } from 'semantic-ui-react'
import RecordList from '../RecordList/RecordList';
import * as ui from '../ui';

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
    
      switch (this.props.tableType) {
      case "keys":
        columns = ui.keyColumns;
        break;
      case "properties":
        columns = ui.propertyColumns;
        break;
      case "people":
        columns = ui.peopleColumns;
        break;
      default:
        break;
  }

  let filter = {
    id: this.state.filterId,
    value: this.state.filterValue
  }

  const options = [
    { id: 'filterId', text: '', value: ''},
    { id: 'filterId', text: 'First Name', value: 'first_name'},
    { id: 'filterId', text: 'Last Name', value: 'last_name' },
    { id: 'filterId', text: 'E-mail', value: 'email' },
    { id: 'filterId', text: 'Phone', value: 'phone_num' },
    { id: 'filterId', text: 'Company', value: 'company'}
  ]

    return (
      <div>
        <Input
        id='filterValue'
        icon='search'
        iconPosition='left'
        placeholder='Search...'
        onChange={this.handleText}
        />
        <Dropdown 
        id='filterId' 
        options={options}
        placeholder='By...'
        onChange={this.handleText}
        selection
        value={this.state.filterId}
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