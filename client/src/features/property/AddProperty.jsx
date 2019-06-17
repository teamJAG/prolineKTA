import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  TextArea,
  Button,
  Divider,
  Form,
  Dropdown,
  Input,
  Header
} from "semantic-ui-react";
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
      comments: "",
      redirect: false
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
    await fetchRecord(request, "POST", "/propertyrecord", res => {
      this.setState({redirect: true});
    });
  }

  render() {
    let redirect;
    this.state.redirect ? redirect = (<Redirect to="/properties" />) : redirect = null
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
      paddingTop: 20,
      textAlign: "left",
      width: "50%"
    };

    return (
      <div
        style={{
          marginTop: 10,
          padding: 20,
          display: "block",
          textAlign: "center"
        }}
      >
      {redirect}
        <div style={containerStyle}>
          <Form onSubmit={this.handleSubmit}>
            <Header className="ui horizontal divider header">
              Create Property
            </Header>
            <Form.Field>
              <label>Name</label>
              <Input
                placeholder="Property Name"
                onChange={this.handleChange}
                name="propertyName"
                value={this.state.propertyName}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Building Number</label>
              <Input
                placeholder="####"
                onChange={this.handleChange}
                name="propertyNumber"
                value={this.state.propertyNumber}
                required
                pattern='^[A-Za-z0-9]{4}'
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <Input
                placeholder="Address"
                onChange={this.handleChange}
                name="address"
                value={this.state.address}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <Input
                placeholder="City"
                onChange={this.handleChange}
                name="city"
                value={this.state.city}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Postal Code</label>
              <Input
                placeholder="V1V1V1"
                onChange={this.handleChange}
                name="postalCode"
                value={this.state.postalCode}
                required
                pattern='[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$'
              />
            </Form.Field>
            <Form.Field>
              <label>Property Type</label>
              <Dropdown
                name="propertyType"
                selection
                placeholder="Property Type"
                onChange={this.handleChange}
                value={this.state.propertyType}
                options={propTypeOptions}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Comments</label>
              <TextArea
                style={{ minHeight: 100, width: "50%" }}
                name="comments"
                fluid
                placeholder="Additional Comments..."
                onChange={this.handleChange}
                value={this.state.comments}
              />
            </Form.Field>
            <Divider />
            <Button type="submit" color="purple">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
