import React, { Component } from 'react';
import { Form, Label, Header, Divider} from 'semantic-ui-react';
import KeyPending from './KeyPending';
import CheckKeyOut from './CheckKeyOut';
import CheckKeyIn from './CheckKeyIn';
import { fetchKeyStatus } from '../../app/fetch/fetches';

class ScanKey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disableForm: false,
            scannedKey: null,
            keyPending: false,
            keyCheckedIn: false,
            keyRecord: null,
            keyTransaction: null
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePending = this.handlePending.bind(this);
    }

    handleInput(e) {
        if (e.target.value) {
            this.setState({
                scannedKey: e.target.value
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const request = {
            id: this.state.scannedKey
        };
        fetchKeyStatus(request, "POST", (res) => {
            if (res.keyStatus === 1) {
                this.setState({
                    keyPending: true,
                    keyCheckedIn: true,
                    keyRecord: res.key,
                    disableForm: true
                });
            } else if (res.key.keyStatus === 2) {
                this.setState({
                    keyPending: false,
                    keyCheckedIn: true,
                    keyRecord: res.key,
                    disableForm: true
                });
            } else if (res.key.keyStatus === 0 && res.trans) {
                this.setState({
                    keyPending: false,
                    keyCheckedIn: false,
                    disableForm: true,
                    keyRecord: res.key,
                    keyTransaction: res.trans
                });
            }
        });
    }

    handlePending() {
        let request = {
            keyStatus: 1,
            keyId: this.state.scannedKey
        }
        fetchKeyStatus(request, "PUT", (res) => {
            if (res.status === 200) {
                this.setState({
                    disableForm: false,
                    keyPending: true
                });
                return 
            }
        });
    }

    render() {

        let { disableForm, keyPending, keyCheckedIn, keyRecord, keyTransaction } = this.state;

        const containerStyle = {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '10%'
        };

        if (!disableForm) {
            return (
                <div style={containerStyle}>
                    <Form onSubmit={this.handleSubmit}>
                        <Header>Check Key Status</Header>
                        <Divider />
                        <Form.Field>
                            <Label pointing='below'>Select and Scan QR Code</Label>
                            <Form.Input id ='keyID' as='input' type='text' onChange={this.handleInput} />
                        </Form.Field>
                        <Divider />
                        <Form.Button content='Submit' />
                    </Form>
                </div>
            );
        } else if (!keyPending && keyCheckedIn) {

            return (
                <div style={{containerStyle}}>
                    <KeyPending key={keyRecord} isPending={this.handlePending} />
                </div>
            )

        } else if (keyPending && keyCheckedIn) {

            return (
                <div style={{containerStyle}}>
                    <CheckKeyOut key={keyRecord} />
                </div>
            )

        } else if (!keyPending && !keyCheckedIn) {
            
            return (
                <div style={{containerStyle}}>
                    <CheckKeyIn key={keyRecord} transaction={keyTransaction} />
                </div>
            )
        }
    }
}

export default ScanKey;