import React, { Component } from 'react';
import { connect } from 'react-redux'
import cuid from 'cuid';
import { Segment, Form, Button } from 'semantic-ui-react';
import { createRecord, updateRecord } from '../recordActions'

const mapState = (state, ownProps) => {
  const recordId = ownProps.match.params.id;

  let record = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }

  if (recordId && state.records.length > 0) {
    record = state.records.filter(record => record.id === recordId)[0]
  }

  return {
    record
  }
}

const actions = {
  createRecord,
  updateRecord
}

class RecordForm extends Component {

  state = {
    record: Object.assign({}, this.props.record)
  }

  onFormSubmit = (rcd) => {
    rcd.preventDefault();
    if (this.state.record.id) {
      this.props.updateRecord(this.state.record);
      this.props.history.goBack();
    } else {
      const newRecord = {
        ...this.state.record,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      this.props.createRecord(newRecord)
      this.props.history.push('/records')
    }

  }

  onInputChange = (rcd) => {
    const newRecord = this.state.record;
    newRecord[rcd.target.name] = rcd.target.value
    this.setState({
      record: newRecord
    })
  }

  render() {

    const {handleCancel} = this.props;
    const {record} = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Record Title</label>
            <input name='title' onChange={this.onInputChange} value={record.title} placeholder="record Title" />
          </Form.Field>
          <Form.Field>
            <label>Record Date</label>
            <input name='date' onChange={this.onInputChange} value={record.date} type="date" placeholder="record Date" />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input name='city' onChange={this.onInputChange} value={record.city} placeholder="City record is taking place" />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input name='venue' onChange={this.onInputChange} value={record.venue} placeholder="Enter the Venue of the record" />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input name='hostedBy' onChange={this.onInputChange} value={record.hostedBy} placeholder="Enter the name of person hosting" />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState, actions)(RecordForm);
