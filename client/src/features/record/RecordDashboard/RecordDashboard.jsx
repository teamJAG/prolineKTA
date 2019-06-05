import React, { Component } from 'react';
import { Input, Divider } from 'semantic-ui-react'
import RecordList from '../RecordList/RecordList';
import * as ui from '../ui';

import 'semantic-ui-css/semantic.min.css';

class RecordDashboard extends Component {

  handleText(event, data) {
    if (event.target.id === "filterId") {
      this.setState({
        filterId: event.target.value
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
      filtered: {
        filterId: '',
        filterValue: ''
      }
    };
    this.handleText = this.handleText.bind(this);
  }

  render() {

    return (
      <div>
        <Input id='filterValue' icon='search' placeholder='Search...' onChange={this.handleText} />
        <Input id='filterId' list='id' placeholder='By...' onChange={this.handleText} />
        <datalist id='id'>
          <option data-value='first_name' value='First Name' />
          <option data-value='last_name' value='Last Name' />
          <option data-value='email' value='E-mail' />
          <option data-value='phone_num' value='Phone' />
          <option data-value='company' value='Company' />
        </datalist>
        <div className='ui divider'>
          <Divider />
        </div>
        <div>
          <RecordList type={this.props.tableType} filtered={this.state.filtered}/>
        </div>
      </div>
    )
  }
}

export default RecordDashboard;