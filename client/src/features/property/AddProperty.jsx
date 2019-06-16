import React, { Component } from "react";
import { Form, Dropdown, Input } from "semantic-ui-react-form-validator";
import { TextArea, Button, Divider } from "semantic-ui-react";
import { fetchRecord } from "../../app/fetch/fetches";

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
  }

  handleChange(e, data) {
    this.setState({
      [data.name]: data.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {
      address,
      city,
      postalCode,
      propertyName,
      propertyNumber,
      propertyType,
      comments
    } = this.state;
    const request = {
      address: address,
      city: city,
      postalCode: postalCode,
      propertyName: propertyName,
      propertyNumber: propertyNumber,
      propertyType: propertyType,
      comments: comments
    };
    await fetchRecord(request, "POST", "/propertyrecord", res => {});
  }

  render() {
    const propTypeOptions = [
      {
        key: "1",
        text: "Strata",
        value: "STRATA"
      },
      {
        key: "2",
        text: "Rental",
        value: "RENTAL"
      },
      {
        key: "3",
        text: "Sundry",
        value: "SUNDRY"
      },
      {
        key: "4",
        text: "Office",
        value: "OFFICE"
      }
    ];
    const containerStyle = {
      display: "inline-block",
      marginLeft: "12%",
      paddingTop: 20,
      textAlign: "left",
      width: '50%'
    };

    return (
      <div style={{ marginTop: 10, padding: 20, display: "block", textAlign: "center" }}>
        <h1 className="ui horizontal divider header">Create Property</h1>
        <div
          style={containerStyle}
        >
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
              errorMessages={[
                "this field is required",
                "postalcode is invalid"
              ]}
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
              style={{ minHeight: 100, width: "50%" }}
              name="comments"
              label="Comments"
              fluid
              placeholder="Additional Comments..."
              onChange={this.handleChange}
              value={this.state.comments}
            />
            <Divider />
            <Button type="submit" color="teal">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}