import React from 'react';
import {Form, Divider, Header, Label } from 'semantic-ui-react';
import { fetchKey } from '../../app/fetch/fetches';

const KeyPending = (props) => {

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '10%'
    };
    
    return (
        <div style={containerStyle}>
        <Form>
            <Header>Place Key Into Pending</Header>
            <Divider />
            <Form.Field>
                <Label pointing='below'>Select and Scan QR Code</Label>
                <Form.Input id ='keyID' as='input' type='text' />
            </Form.Field>
            <Divider />
            <Form.Button content='Submit' />
        </Form>
    </div>
    )
}

export default KeyPending;