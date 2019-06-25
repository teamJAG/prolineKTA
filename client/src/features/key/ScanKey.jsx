//This class handles the entire checkout process, passing callback functions to stateful and stateless components,
//setting flags based on the client's business rules, and conditionally rendering the results, as well as
//transaction slips for the client to keep a physical trail of the transaction as well.

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Label, Header, Divider } from "semantic-ui-react";
import KeyPending from "./KeyPending";
import CheckKeyOut from "./CheckKeyOut";
import CheckKeyIn from "./CheckKeyIn";
import { fetchKeyStatus, fetchKeyCheck } from "../../app/fetch/fetches";
import PrintCohoSlip from "../slips/CohoSlip";
import PrintElevatorSlip from "../slips/ElevatorSlip";
import PrintFobSlip from "../slips/FobSlip";
import PrintGuestSlip from "../slips/GuestSlip";
import PrintPurchaseSlip from "../slips/PurchaseSlip";
import PrintRentalSlip from "../slips/RentalSlip";
import PrintTradeSlip from "../slips/TradeSlip";

class ScanKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableForm: false,
      renderTransactionSlip: false,
      renderDepositSlip: false,
      renderNewContractor: false,
      scannedKey: "",
      keyPending: false,
      keyCheckedIn: false,
      keyRecord: {},
      keyTransaction: {},
      autofill: {},
      searchResults: []
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyScan = this.handleKeyScan.bind(this);
    this.handlePending = this.handlePending.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleCheckin = this.handleCheckin.bind(this);
  }

  //Moves the scanned key QR Code to state
  handleInput(e) {
    if (e.target.value) {
      this.setState({
        scannedKey: e.target.value
      });
    }
  }

  //Sends POST request to retrieve a key record and [if applicable] a transaction record from the db. Mutates state and UI
  //according to the key's status
  async handleKeyScan(e) {
    e.preventDefault();
    const request = {
      id: this.state.scannedKey
    };
    await fetchKeyStatus(request, "POST", res => {
      if (res.key.keyStatus === "PENDING") {
        this.setState(state => {
          return {
            keyPending: true,
            keyCheckedIn: true,
            keyRecord: res.key,
            disableForm: true
          };
        });
      } else if (res.key.keyStatus === "IN") {
        this.setState(state => {
          return {
            keyPending: false,
            keyCheckedIn: true,
            keyRecord: res.key,
            disableForm: true
          };
        });
      } else if (res.key.keyStatus === "OUT" && res.trans) {
        this.setState(state => {
          return {
            keyPending: false,
            keyCheckedIn: false,
            keyRecord: res.key,
            keyTransaction: res.trans,
            disableForm: true
          };
        });
      }
    });
  }

  //Moves a key record's status into pending, updates the db
  async handlePending(e) {
    e.preventDefault();
    let request = {
      keyStatus: "PENDING",
      keyId: this.state.keyRecord.keyId
    };
    await fetchKeyStatus(request, "PUT", res => {
      this.setState({
        disableForm: false,
        keyPending: true
      });
    });
  }

  async handleCheckout(e) {
    e.preventDefault();
    //Extract the form data from the CheckOut submit and assign NULLs for the database record where needed
    let target = e.target;
    let firstName, lastName, company, deposit, depositType, fees, notes, sale, exit;
    target.first_name.value === ""
      ? (firstName = null)
      : (firstName = target.first_name.value);
    target.last_name.value === ""
      ? (lastName = null)
      : (lastName = target.last_name.value);
    target.company.value === ""
      ? (company = null)
      : (company = target.company.value);
    target.deposit.value === ""
      ? (deposit = null)
      : (deposit = target.deposit.value);
    target.depositType.value === ""
      ? (depositType = null)
      : (depositType = target.depositType.value);
    target.fees.value === "" ? (fees = null) : (fees = target.fees.value);
    target.notes.value === "" ? (notes = null) : (notes = e.target.notes.value);
    target.sale.checked ? (sale = true) : (sale = false);
    target.exit.checked ? (exit = true) : (exit = false);

    const transRequest = {
      firstName: firstName,
      lastName: lastName,
      company: company,
      deposit: deposit,
      depositType: depositType,
      fees: fees,
      notes: notes,
      sale: sale,
      exit: exit,
      keyId: this.state.keyRecord.keyId
    };

    //Fetch to create a transaction record and change key status to '0'/'Checked Out'
    await fetchKeyCheck(transRequest, "POST", res => {
      const autofill = Object.assign(transRequest, this.state.keyRecord, res.contractor);
      this.setState({
        autofill : autofill
      });
      if (res.redirect) {
        this.setState({ renderNewContractor: true });
      } else if (this.state.keyRecord.deposit > 0) {
        this.setState({
          disableForm: true,
          keyCheckedIn: false,
          keyPending: false,
          renderTransactionSlip: true,
          renderDepositSlip: true,
        });
      } else if (sale) {
        this.setState({
          disableForm: true,
          keyCheckedIn: false,
          keyPending: false,
          renderTransactionSlip: true,
          keySold: true,
        });
      } else if (exit) {
        this.setState({
          disableForm: true,
          keyCheckedIn: false,
          keyPending: false,
          renderTransactionSlip: true,
          rentalExit: true,
        });
      } else {
        this.setState({
          disableForm: true,
          keyCheckedIn: false,
          keyPending: false,
          renderTransactionSlip: true,
        });
      }
    });
  }

  async handleCheckin(e) {
    e.preventDefault();
    let request = {
      keyId: this.state.keyRecord.keyId,
      transId: this.state.keyTransaction.id
    };
    await fetchKeyCheck(request, "PUT", res => {
      this.setState({
        disableForm: false
      });
    });
  }

  render() {
    const containerStyle = {
      display: "flex",
      justifyContent: "center",
      paddingTop: "10%"
    };

    let newContractor;
    this.state.renderNewContractor
      ? (newContractor = <Redirect to="/createcontractor" />)
      : (newContractor = null);

    if (!this.state.disableForm && !this.state.renderTransactionSlip) {
      return (
        <div style={containerStyle}>
          <Form onSubmit={this.handleKeyScan}>
            <Header>Check Key Status</Header>
            <Divider />
            <Form.Field>
              <Label pointing="below">Scan QR Code</Label>
              <Form.Input
                id="keyID"
                as="input"
                autoFocus
                type="text"
                onChange={this.handleInput}
              />
            </Form.Field>
            <Divider />
            <Form.Button color="purple" content="Submit" />
          </Form>
        </div>
      );
    } else if (!this.state.keyPending && this.state.keyCheckedIn) {
      return (
        <div style={{ containerStyle }}>
          <KeyPending
            keyRecord={this.state.keyRecord}
            isPending={this.handlePending}
          />
        </div>
      );
    } else if (this.state.keyPending && this.state.keyCheckedIn) {
      return (
        <div style={{ containerStyle }}>
          {newContractor}
          <CheckKeyOut
            keyRecord={this.state.keyRecord}
            checkout={this.handleCheckout}
          />
        </div>
      );
    } else if (
      this.state.renderTransactionSlip &&
      !this.state.keyPending &&
      !this.state.keyCheckedIn &&
      this.state.keySold
    ) {
      return (
        <div style={{ containerStyle }}>
          <PrintPurchaseSlip autofill={this.state.autofill} />
        </div>
      );
    } else if (
      this.state.renderTransactionSlip &&
      !this.state.keyPending &&
      !this.state.keyCheckedIn &&
      this.state.rentalExit
    ) {
      return (
        <div style={{ containerStyle }}>
          <PrintRentalSlip autofill={this.state.autofill} />
        </div>
      );
    }  else if (
      this.state.renderTransactionSlip &&
      !this.state.keyPending &&
      !this.state.keyCheckedIn
    ) {
      switch (this.state.keyRecord.keyType) {
        case "MASTER":
          return (
            <div style={{ containerStyle }}>
              <PrintFobSlip autofill={this.state.autofill} />
            </div>
          );
        case "TRADES":
          return (
            <div style={{ containerStyle }}>
              <PrintTradeSlip autofill={this.state.autofill} />
            </div>
          );
        case "FOB":
          return (
            <div style={{ containerStyle }}>
              <PrintFobSlip autofill={this.state.autofill} />
            </div>
          );
        case "GARAGE":
          return (
            <div style={{ containerStyle }}>
              <PrintElevatorSlip autofill={this.state.autofill} />
            </div>
          );
        case "ELEVATOR":
          return (
            <div style={{ containerStyle }}>
              <PrintElevatorSlip autofill={this.state.autofill} />
            </div>
          );
        case "PROLINE":
          return (
            <div style={{ containerStyle }}>
              <PrintFobSlip autofill={this.state.autofill} />
            </div>
          );
        case "GUEST-ROOM":
          let guest;
          this.state.keyRecord.propertyName === "COHO (Phase 1 & 2)"
            ? (guest = <PrintCohoSlip autofill={this.state.autofill} />)
            : (guest = <PrintGuestSlip autofill={this.state.autofill} />);
          return <div style={{ containerStyle }}>{guest}</div>;
        default:
          return null;
      }
    } else if (
      !this.state.renderTransactionSlip &&
      !this.state.keyPending &&
      !this.state.keyCheckedIn
    ) {
      return (
        <div style={{ containerStyle }}>
          <CheckKeyIn
            keyRecord={this.state.keyRecord}
            transaction={this.state.keyTransaction}
            checkin={this.handleCheckin}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ScanKey;
