import React, { Component } from 'react';
import { Form, Label, Header, Divider} from 'semantic-ui-react';
import KeyPending from './KeyPending';
import CheckKeyOut from './CheckKeyOut';
import CheckKeyIn from './CheckKeyIn';

class ScanKey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disableForm: false,
            scannedKey: null,
            keyPending: false,
            keyChecked: true
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        return null;
    }

    render() {

        let { scannedKey, disableForm, keyPending, keyChecked } = this.state;

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
        } else if (disableForm && keyPending === false && keyChecked === true) {

            return (
                <div style={{containerStyle}}>
                    <KeyPending />
                </div>
            )

        } else if (disableForm && keyPending === true && keyChecked === true) {

            return (
                <div style={{containerStyle}}>
                    <CheckKeyOut />
                </div>
            )

        } else if (disableForm && keyPending === false && keyChecked === false) {
            
            return (
                <div style={{containerStyle}}>
                    <CheckKeyIn />
                </div>
            )
        }
    }
}

export default ScanKey;