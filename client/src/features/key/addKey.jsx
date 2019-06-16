//It is assumed that the Key Quantity and the Key Number will be the same. If this is not accurate any longer,
//or needs to be changed and made unique, a 'Key Number' input needs to be added, and the props being passed
//to <PrintQRCode> needs to be renamed from 'keyNumber={...keyQuantity}' to an appropriate value.

import React from "react";
import { Form, Dropdown, Input } from "semantic-ui-react-form-validator";
import { Button } from "semantic-ui-react";
import PrintQRCode from "./PrintQRCode";
import { fetchRecord } from "../../app/fetch/fetches";
import AutoComplete from "./AutoComplete";

class AddKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      keyStorageLocation: "",
      keyOfficeLocation: "",
      keyQuantity: 0,
      keyNumber: 0,
      keyType: "",
      deposit: 0,
      showQR: false,
      propertyNumber: "",
      keyNumber: 0
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
      keyStorageLocation,
      keyOfficeLocation,
      keyQuantity,
      keyType,
      deposit
    } = this.state;
    const request = {
      address: address,
      city: city,
      keyStorageLocation: keyStorageLocation,
      keyOfficeLocation: keyOfficeLocation,
      keyQuantity: keyQuantity,
      keyType: keyType,
      deposit: deposit
    };
    await fetchRecord(request, "POST", "/keyrecord", res => {
      this.setState({
        showQR: true,
        propertyNumber: res.property_number,
        keyNumber: res.key_number
      });
    });
  }

  render() {
    const keyTypeOptions = [
      {
        key: "Master",
        text: "Master",
        value: "MASTER"
      },
      {
        key: "Trades",
        text: "Trades",
        value: "TRADES"
      },
      {
        key: "FOB",
        text: "FOB",
        value: "FOB"
      },
      {
        key: "Garage",
        text: "Garage",
        value: "GARAGE"
      },
      {
        key: "Elevator",
        text: "Elevator",
        value: "ELEVATOR"
      },
      {
        key: "Proline",
        text: "Proline",
        value: "PROLINE"
      },
      {
        key: "Guest",
        text: "Guest Room",
        value: "GUEST-ROOM"
      }
    ];
    const containerStyle = {
      display: "inline-block",
      marginLeft: "12%",
      paddingTop: 20,
      textAlign: "left",
      width: "50%"
    };

    if (!this.state.showQR) {
      return (
        <div
          style={{
            marginTop: 10,
            padding: 20,
            display: "block",
            textAlign: "center"
          }}
        >
          <h1 className="ui horizontal divider header">Create Key</h1>
          <div style={containerStyle}>
            <Form onSubmit={this.handleSubmit}>
              <AutoComplete 
                table="address_tab"
                id="address"
                as={Input}
                label="Street Address"
                placeholder="Address"
                name="address"
                value={this.state.address}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <Input
                onChange={this.handleChange}
                value={this.state.city}
                label="City"
                placeholder="City"
                name="city"
                o
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <Input
                onChange={this.handleChange}
                value={this.state.keyStorageLocation}
                label="Storage Location"
                placeholder="Storage Location"
                name="keyStorageLocation"
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <Input
                onChange={this.handleChange}
                value={this.state.keyOfficeLocation}
                label="Office Location"
                placeholder="Office Location"
                name="keyOfficeLocation"
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <Input
                onChange={this.handleChange}
                value={this.state.keyQuantity}
                type="number"
                min="0"
                label="Key Quantity"
                placeholder="Key Quantity"
                name="keyQuantity"
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <Dropdown
                options={keyTypeOptions}
                onChange={this.handleChange}
                value={this.state.keyType}
                selection
                label="Key Type"
                name="keyType"
                placeholder="Key Type"
                validators={["required"]}
                errorMessages={["this field is required"]}
              />

              <Input
                onChange={this.handleChange}
                value={this.state.deposit}
                type="number"
                min="0"
                label="Deposit"
                placeholder="Is there a deposit on the key?"
                name="deposit"
              />
              <br />
              <Button type="submit" color="teal">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      );
    } else {
      return (
        <PrintQRCode
          propertyNumber={this.state.propertyNumber}
          keyOfficeLocation={this.state.keyOfficeLocation}
          keyType={this.state.keyType}
          keyNumber={this.state.keyNumber}
          keyQuantity={this.state.keyQuantity}
        />
      );
    }
  }
}

export default AddKey;
