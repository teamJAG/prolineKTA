import React, { Component } from 'react'
import {Form, Dropdown, Input} from 'semantic-ui-react-form-validator'
import {Button} from 'semantic-ui-react';
import PrintQRCode from "./PrintQRCode";

export default class AddPropertyForm extends React.Component {
// state
state = {
  formData: {
    address:'',
    city: '',
    storageLocation: '',
    keyQuantity: '',
    keyType: '',
    postalCode: '',
    showQR: false,
  },
  submitted: false,
};

handleChange = (event) => {
  const { formData } = this.state;
  formData[event.target.name] = event.target.value;
  this.setState({ formData });
};

handleSubmit = () => {
  this.setState({ submitted: true, showQR: true }, () => {
    // formData({ showQR: true });
    setTimeout(() => this.setState({ submitted: false }), 5000);
  });
};
  
render() {
  const keyTypeOptions = [
    {
      key: 'Master',
      text: 'Master',
      value: 'Master',
    },
    {
      key: 'Trades',
      text: 'Trades',
      value: 'Trades',
    },
    {
      key: 'FOB',
      text: 'FOB',
      value: 'FOB',
    },
    {
      key: 'Garage',
      text: 'Garage',
      value: 'Garage',
    },
    {
      key: 'Elevator',
      text: 'Elevator',
      value: 'Elevator',
    },
    {
      key: 'Proline',
      text: 'Proline',
      value: 'Proline',
    },
  ];
  // ------------------------------------- Add Property Form -------------------------------------------
  const { formData, submitted } = this.state;
  // if (!values.showQR) {
    if (!this.state.showQR) {
    return (
      <Form ref="form" onSubmit={this.handleSubmit}>
        <div style={{ marginTop: 10, padding: 20 }}>
        <h1 class = "ui horizontal divider header"> Create Property</h1> 

        <Input
          label="Address"
          placeholder="Address"
          onChange={this.handleChange}
          name="address"
          value={formData.address}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <Input
          label="City"
          placeholder="City"
          onChange={this.handleChange}
          name="city"
          value={formData.city}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <Input
          label="Storage Location"
          placeholder="Storage Location"
          onChange={this.handleChange}
          name="storageLocation"
          value={formData.storageLocation}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <Input
          type="number"
          label="Key Quantity"
          placeholder="Key Quantity"
          onChange={this.handleChange}
          name="keyQuantity"
          value={formData.keyQuantity}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <Dropdown
          label="Key Type"
          name="keyType"
          fluid
          selection
          placeholder="Key Type"
          onChange={(e,{value})=>{this.setState({dropdown:value})}}
          value={this.state.dropdown} 
          validators={['required']} 
          errorMessages={['this field is required']} 
          options={keyTypeOptions}
        />
        <br />

        <Button type="submit" variant="contained" color="primary" disabled={submitted}>
        {(submitted && 'Your form is submitted!') || (!submitted && 'Submit')}
        </Button>      
        </div>
      </Form>
      );
      } else {
       return <PrintQRCode/>;
     }
  }
}