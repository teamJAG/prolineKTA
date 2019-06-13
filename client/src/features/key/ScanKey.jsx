import React, { Component } from "react";
import { Form, Label, Header, Divider } from "semantic-ui-react";
import KeyPending from "./KeyPending";
import CheckKeyOut from "./CheckKeyOut";
import CheckKeyIn from "./CheckKeyIn";
import { fetchKeyStatus, fetchKeyCheck } from "../../app/fetch/fetches";

class ScanKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableForm: false,
      renderTransactionSlip: false,
      renderDepositSlip: false,
      scannedKey: "",
      keyPending: false,
      keyCheckedIn: false,
      keyRecord: {},
      keyTransaction: {},
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
  handleKeyScan(e) {
    e.preventDefault();
    const request = {
      id: this.state.scannedKey
    };
    fetchKeyStatus(request, "POST", res => {
      if (res.key.keyStatus === 1) {
        window.alert("Request OK.");
        this.setState(state => {
          return {
            keyPending: true,
            keyCheckedIn: true,
            keyRecord: res.key,
            disableForm: true
          };
        });
      } else if (res.key.keyStatus === 2) {
        window.alert("Request OK.");
        this.setState(state => {
          return {
            keyPending: false,
            keyCheckedIn: true,
            keyRecord: res.key,
            disableForm: true
          };
        });
      } else if (res.key.keyStatus === 0 && res.trans) {
        window.alert("Request OK.");
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
      keyStatus: 1,
      keyId: this.state.scannedKey
    };
    try {
      await fetchKeyStatus(request, "PUT", res => {
        if (res.affectedRows === 1) {
          window.alert("Request OK.");
          this.setState({
            disableForm: false,
            keyPending: true
          });
        } else {
          throw new Error("Failed to place key into pending.");
        }
      });
    } catch (err) {
      console.log(err);
      window.alert(err.message);
    }
  }

  async handleCheckout(e) {
    e.preventDefault();

    const statusRequest = {
      keyStatus: 0,
      keyId: this.state.scannedKey
    };
    let target = e.target;
    let firstName, lastName, company, deposit, depositType, fees, notes;
    target.firstName.value === ""
      ? (firstName = null)
      : (firstName = target.firstName.value);
    target.lastName.value === ""
      ? (lastName = null)
      : (lastName = target.lastName.value);
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

    const transRequest = {
      firstName: firstName,
      lastName: lastName,
      company: company,
      deposit: deposit,
      depositType: depositType,
      fees: fees,
      notes: notes,
      keyId: this.state.keyRecord.keyId
    };

    try {
      //Fetch to create a transaction record.
      await fetchKeyCheck(transRequest, "POST", res => {
        if (res.affectedRows !== 1) {
          throw new Error("Error: Failed to create transaction");
        }
      });
      //Fetch to change key status to 'checked out'.
      await fetchKeyStatus(statusRequest, "PUT", res => {
        if (res.affectedRows !== 1) {
          throw new Error("Error: key is still in pending");
        }
      });

      //Wait half a second before triggering a transaction slip render so that
      //fetch statements can propogate errors if necessary.
      setTimeout(() => {
        window.alert("Request OK.");
        if (this.state.keyRecord.deposit > 0) {
          this.setState({
            keyCheckedIn: false,
            renderTransactionSlip: true,
            renderDepositSlip: true
          });
        } else {
          this.setState({
            renderTransactionSlip: true
          });
        }
      }, 500);
    } catch (err) {
      console.log(err);
      window.alert(err.message);
      return;
    }
  }

  async handleCheckin(e) {
    e.preventDefault();
    let request = {
      keyStatus: 2,
      keyId: this.state.keyRecord.keyId,
      transId: this.state.keyTransaction.id
    };
    try {
      await fetchKeyCheck(request, "PUT", res => {
        if (res.affectedRows === 1) {
          window.alert("Request OK.");
          this.setState({
            disableForm: false
          });
        } else {
          throw new Error("Failed to update key status.");
        }
      });
    } catch (err) {
      console.log(err);
      window.alert(err.message);
    }
  }

  render() {
    const containerStyle = {
      display: "flex",
      justifyContent: "center",
      paddingTop: "10%"
    };

    if (!this.state.disableForm) {
      return (
        <div style={containerStyle}>
          <Form onSubmit={this.handleKeyScan}>
            <Header>Check Key Status</Header>
            <Divider />
            <Form.Field>
              <Label pointing="below">Select and Scan QR Code</Label>
              <Form.Input
                id="keyID"
                as="input"
                type="text"
                onChange={this.handleInput}
              />
            </Form.Field>
            <Divider />
            <Form.Button content="Submit" />
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
          <CheckKeyOut
            keyRecord={this.state.keyRecord}
            checkout={this.handleCheckout}
          />
        </div>
      );
    } else if (!this.state.keyPending && !this.state.keyCheckedIn) {
      return (
        <div style={{ containerStyle }}>
          <CheckKeyIn
            keyRecord={this.state.keyRecord}
            transaction={this.state.keyTransaction}
            checkin={this.handleCheckin}
          />
        </div>
      );
    } else if (this.state.renderDepositSlip) {
      switch (this.state.keyRecord.keyType) {
        case "MASTER":
          break;
        case "TRADES":
          break;
        case "FOB":
          break;
        case "GARAGE":
          break;
        case "ELEVATOR":
          break;
        case "PROLINE":
          break;
        default:
          break;
      }
      return <div style={{ containerStyle }} />;
    }
  }
}

export default ScanKey;
