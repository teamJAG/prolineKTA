import React, { Component } from "react";
import { Form, Dropdown, Input } from "semantic-ui-react-form-validator";
import { TextArea, Button, Divider } from "semantic-ui-react";
import { fetchRecord } from '../../app/fetch/fetches';

export default class AddProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      postalCode: "",
      propertyName: "",
      propertyNumber: "",
      propertyType: "",
      comments: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, data) {
    this.setState({
      [data.name]: data.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { address, city, postalCode, propertyName, propertyNumber, propertyType, comments } = this.state;
    const request = {
      address: address,
      city: city,
      postalCode: postalCode,
      propertyName: propertyName,
      propertyNumber: propertyNumber,
      propertyType: propertyType,
      comments: comments
    };
    await fetchRecord(request, "POST", "/propertyrecord", res => {
      return;
    });
  }

  render() {
    const propTypeOptions = [
      {
        key: "Strata",
        text: "Strata",
        value: "STRATA"
      },
      {
        key: "Rental",
        text: "Rental",
        value: "RENTAL"
      },
      {
        key: "Sundry",
        text: "Sundry",
        value: "SUNDRY"
      },
      {
        key: "Office",
        text: "Office",
        value: "OFFICE"
      }
    ];

    return (
      <div style={{ marginTop: 10, padding: 20 }}>
        <h1 className="ui horizontal divider header">Create Property</h1>
        <Form onSubmit={this.handleSubmit}>
          <Input
            label="Name"
            placeholder="Property Name"
            onChange={this.handleChange}
            name="propertyName"
            value={this.state.propertyName}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <Input
            label="Building Number"
            placeholder="####"
            onChange={this.handleChange}
            name="propertyNumber"
            value={this.state.propertyNumber}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <Input
            label="Address"
            placeholder="Address"
            onChange={this.handleChange}
            name="address"
            value={this.state.address}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <Input
            label="City"
            placeholder="City"
            onChange={this.handleChange}
            name="city"
            value={this.state.city}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <Input
            label="Postal Code"
            placeholder="Postal Code"
            onChange={this.handleChange}
            name="postalCode"
            value={this.state.postalCode}
            validators={[
              "required",
              "matchRegexp:[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
            ]}
            errorMessages={["this field is required", "postalcode is invalid"]}
          />
          <Dropdown
            label="Property Type"
            name="propertyType"
            selection
            placeholder="Property Type"
            onChange={this.handleChange}
            value={this.state.propertyType}
            validators={["required"]}
            errorMessages={["this field is required"]}
            options={propTypeOptions}
          />
          <TextArea
            style={{ minHeight: 100 }}
            name="comments"
            label="Comments"
            fluid
            placeholder="Additional Comments..."
            onChange={this.handleChange}
            value={this.state.comments}
          />
          <Divider />
          <Button type="submit" color="purple">Submit</Button>
        </Form>
      </div>
    );
  }
}
