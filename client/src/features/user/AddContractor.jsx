import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react-form-validator";
import { Button, Divider } from "semantic-ui-react";
import { fetchRecord } from '../../app/fetch/fetches';

export default class AddContractor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNum: "",
      company: "",
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
    const { firstName, lastName, phoneNum, company } = this.state;
    const request = {
      firstName: firstName,
      lastName: lastName,
      phoneNum: phoneNum,
      company: company
    };
    await fetchRecord(request, "POST", "/contractors", res => {
      return;
    });
  }
  render() {
      const containerStyle = {
          display: "inline-block",
          margin: 'auto',
          paddingTop: 20,
          textAlign: "left",
          width: '50%'
      };
    

    return (
      <div style={{ marginTop: 10, padding: 20 }}>
        <h1 className="ui horizontal divider header">Add Contractor</h1>
        <div style={ containerStyle }>
        <Form onSubmit={this.handleSubmit}>
          <Input
            label="First Name"
            placeholder="First Name"
            onChange={this.handleChange}
            name="firstName"
            value={this.state.firstName}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <Input
            label="Last Name"
            placeholder="Last Name"
            onChange={this.handleChange}
            name="lastName"
            value={this.state.lastName}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <Input
            label="Phone Number"
            placeholder="###-###-####"
            onChange={this.handleChange}
            name="phoneNum"
            value={this.state.phoneNum}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <Input
            label="Company"
            placeholder="Company Name"
            onChange={this.handleChange}
            name="company"
            value={this.state.company}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <Divider />
          <Button type="submit" color="purple">Submit</Button>
        </Form>
      </div>
    </div>
    );
  }
}
