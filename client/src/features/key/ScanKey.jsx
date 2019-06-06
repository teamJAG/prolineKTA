import React, { Component } from 'react';
import { Form, Input, Label, Header, Divider, Button } from 'semantic-ui-react';
import Center from 'react-center';

class ScanKey extends Component {

    render() {

        const flexContainerStyle = {
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '10%'
        };

        return (

                <div style={flexContainerStyle}>
                    <Form>
                        <Header>Check Key Status</Header>
                        <Divider />
                        <Form.Field>
                            <Label pointing='below'>Select Box and Scan QR Code</Label>
                            <Input fluid={false} type='text' size='huge' />
                        </Form.Field>
                        <Divider />
                        <Button type='submit'>Submit</Button>
                    </Form>
                </div>
            // </Center>
        );
    }
}

export default ScanKey;