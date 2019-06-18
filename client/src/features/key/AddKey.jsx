//It is assumed that the Key Quantity and the Key Number will be the same. If this is not accurate any longer,
//or needs to be changed and made unique, a 'Key Number' input needs to be added, and the props being passed
//to <PrintQRCode> needs to be renamed from 'keyNumber={...keyQuantity}' to an appropriate value.

import React from "react";
import { Button, Form, Dropdown, Input, Header } from "semantic-ui-react";
import PrintQRCode from "./PrintQRCode";
import { fetchRecord } from "../../app/fetch/fetches";
import AutoComplete from "./AutoComplete";
import * as ui from "./ui";

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
      keyNumber: 0,
      selected: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleChange(e, data) {
    this.setState({
      [data.name]: data.value
    });
  }

  handleSelected() {
    this.setState({selected: true});
  }

  async handleSubmit(e, data) {
    e.preventDefault();
    console.log(data);
    const {
      city,
      keyStorageLocation,
      keyOfficeLocation,
      keyQuantity,
      keyType,
      address,
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
    const containerStyle = {
      display: "inline-block",
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
          <div style={containerStyle}>
            <Form onSubmit={this.handleSubmit}>
              <Header className="ui horizontal divider header">
                Create Key
              </Header>
              <Form.Field>
                <label>Street Address</label>
                <AutoComplete
                  table="address_tab"
                  id="address"
                  as={Input}
                  onChange={this.handleChange}
                  placeholder="Address"
                  name="address"
                  selected={this.handleSelected}
                />
              </Form.Field>
              <Form.Field>
              <label>City</label>
              <Input
                onChange={this.handleChange}
                value={this.state.city}
                placeholder="City"
                name="city"
                required
              />
              </Form.Field>
              <Form.Field>
              <label>Storage Location</label>
              <Input
                onChange={this.handleChange}
                value={this.state.keyStorageLocation}
                placeholder="Storage Location"
                name="keyStorageLocation"
              />
              </Form.Field>
              <Form.Field>
              <label>Office Location</label>
              <Dropdown
                options={ui.keyOfficeLocationOptions}
                onChange={this.handleChange}
                value={this.state.keyOfficeLocation}
                selection
                name="keyOfficeLocation"
                placeholder="Office location..."
              />
              </Form.Field>
              <Form.Field>
              <label>Key Quantity</label>
              <Input
                onChange={this.handleChange}
                value={this.state.keyQuantity}
                type="number"
                min="0"
                placeholder="Key Quantity"
                name="keyQuantity"
              />
              </Form.Field>
              <Form.Field>
              <label>Key Type</label>
              <Dropdown
                options={ui.keyTypeOptions}
                onChange={this.handleChange}
                value={this.state.keyType}
                selection
                name="keyType"
                placeholder="Key Type"
              />
              </Form.Field>
              <Form.Field>
              <label>Deposit</label>
              <Input
                onChange={this.handleChange}
                value={this.state.deposit}
                type="number"
                min="0"
                placeholder="Is there a deposit on the key?"
                name="deposit"
              />
              </Form.Field>
              <br />
              <Button type="submit" color="purple">
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
