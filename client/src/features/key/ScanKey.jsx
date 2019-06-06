import React, { Component } from 'react';
import { Form, Input, Label, Header, Divider, Button } from 'semantic-ui-react';
import KeyPending from './KeyPending';
import CheckKeyOut from './CheckKeyOut';
import CheckKeyIn from './CheckKeyIn';

class ScanKey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scannedKey: '',
            keyPending: false,
            keyChecked: true
        };
    }

    handleSubmit() {
        return null;
    }

    render() {

        let scanForm;
        let pending;
        let checkIn;

        if (this.state.keyPending === false && this.state.keyChecked === true) {

            const scanIdStyle = {
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '10%'
            };

            return (
                <div style={scanIdStyle}>
                    <Form onSubmit={this.handleSubmit}>
                        <Header>Check Key Status</Header>
                        <Divider />
                        <Form.Field>
                            <Label pointing='below'>Select Box and Scan QR Code</Label>
                            <Form.Input as='input' type='text' size='huge' />
                        </Form.Field>
                        <Divider />
                        <Form.Button content='Submit' />
                    </Form>
                </div>
            );
        } else if (this.state.keyPending === true && this.state.keyChecked === true) {

        } else if (this.state.keyPending === false && this.state.keyChecked === false) {

        }
    }
}

export default ScanKey;