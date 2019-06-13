import React, { Component } from 'react'
import {Form, Dropdown, Input} from 'semantic-ui-react-form-validator'
import {TextArea, Button} from 'semantic-ui-react';

export default class AddPropertyForm extends React.Component {
// state
state = {
  formData: {
    city: '',
    propType: '',
    propName: '',
    propAddr: '',
    postalCode: '',
  },
  submitted: false,
};

handleChange = (event) => {
  const { formData } = this.state;
  formData[event.target.name] = event.target.value;
  this.setState({ formData });
};

handleSubmit = () => {
  this.setState({ submitted: true }, () => {
    setTimeout(() => this.setState({ submitted: false }), 5000);
  });
};
  
render() {
  const propTypeOptions = [
    {
      key: 'Strata',
      text: 'Strata',
      value: 'Strata',
    },
    {
      key: 'Condo',
      text: 'Condo',
      value: 'Condo',
    },
    {
      key: 'Saundry',
      text: 'Saundry',
      value: 'Saundry',
    },
    {
      key: 'FOB',
      text: 'FOB',
      value: 'FOB',
    }
  ];
  // ------------------------------------- Add Property Form -------------------------------------------
  const { formData, submitted } = this.state;
  return (
    <Form ref="form" onSubmit={this.handleSubmit}>
      <div style={{ marginTop: 10, padding: 20 }}>
      <h1 class = "ui horizontal divider header"> Create Property</h1> 

      <Input
        label="City"
        placeholder="City"
        onChange={this.handleChange}
        name="city"
        value={formData.city}
        validators={['required']}
        errorMessages={['this field is required']}
      />
      <Dropdown
        label="Property Type"
        name="propType"
        fluid
        selection
        placeholder="Property Type"
        onChange={(e,{value})=>{this.setState({dropdown:value})}}
        value={this.state.dropdown} 
        validators={['required']} 
        errorMessages={['this field is required']} 
        options={propTypeOptions}
      />
      <Input
        label="Property Name"
        placeholder="Property Name"
        onChange={this.handleChange}
        name="propName"
        value={formData.propName}
        validators={['required']}
        errorMessages={['this field is required']}
      />
      <Input
        label="Property Address"
        placeholder="Property Address"
        onChange={this.handleChange}
        name="propAddr"
        value={formData.propAddr}
        validators={['required']}
        errorMessages={['this field is required']}
      />
      <Input
        label="Postal Code"
        placeholder="Postal Code"
        onChange={this.handleChange}
        name="postalCode"
        value={formData.postalCode}
        validators={['required', 'matchRegexp:[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]']}
        errorMessages={['this field is required', 'postalcode is invalid']}
      />
      <TextArea
        style={{ minHeight: 100 }}
        name="additionalComment"
        label="Additional Comment"
        placeholder="Additional Comment"
        onChange={this.handleChange}
      />
      <br />

      <Button type="submit" variant="contained" color="primary" disabled={submitted}>
      {(submitted && 'Your form is submitted!') || (!submitted && 'Submit')}
      </Button>      
      </div>
    </Form>
    );
  }
}