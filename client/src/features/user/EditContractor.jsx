import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Button, Divider, Form, Input, Header } from "semantic-ui-react";
import { fetchRecord } from "../../app/fetch/fetches";

export default class EditContractor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.location.keyRecord.first_name,
      lastName: this.props.location.keyRecord.last_name,
      phoneNum: this.props.location.keyRecord.phone_num,
      email: this.props.location.keyRecord.email,
      company: this.props.location.keyRecord.company,
      contractorId: this.props.location.keyRecord.contactor_id,
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
    const { firstName, lastName, phoneNum, email, company } = this.state;
    const request = {
      firstName: firstName,
      lastName: lastName,
      phoneNum: phoneNum,
      email: email,
      company: company
    };
    await fetchRecord(request, "PUT", "/contractors", res => {
      this.setState({redirect: true});
    });
  }
  render() {
    const containerStyle = {
      display: "inline-block",
      paddingTop: 20,
      textAlign: "left",
      width: "50%"
    };
    let redirect;
    this.state.redirect ? redirect = (<Redirect to="/people" />) : redirect = null;

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
              Add Contractor
            </Header>
            <Form.Field>
              <label>First Name</label>
              <Input
                placeholder="First Name"
                onChange={this.handleChange}
                name="firstName"
                value={this.state.firstName}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <Input
                placeholder="Last Name"
                onChange={this.handleChange}
                name="lastName"
                value={this.state.lastName}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Phone Number</label>
              <Input
                placeholder="10 digits"
                onChange={this.handleChange}
                name="phoneNum"
                value={this.state.phoneNum}
                required
                type='tel'
                pattern='\d{10}'
              />
            <Form.Field>
                <label>E-Mail</label>
                <Input
                placeholder="you@domain.com"
                onChange={this.handleChange}
                name="email"
                value={this.state.email}
                type='email'
            />
            </Form.Field>
            </Form.Field>
            <Form.Field>
              <label>Company</label>
              <Input
                placeholder="Company Name"
                onChange={this.handleChange}
                name="company"
                value={this.state.company}
                required
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
