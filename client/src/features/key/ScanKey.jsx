import React, { Component } from 'react';
import { Form, Input, Label, Divider, Button } from 'semantic-ui-react';

class ScanKey extends Component {

    render() {

        const style = {
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '100vh'
        }

        return (
            <div style={style}>
                <Form>
                    <Label>Check Key In/Out</Label>
                    <Divider />
                    <Form.Field>
                        <Label pointing='below'>Select and Scan QR Code</Label>
                        <Input fluid={false} type='text' size='huge' />
                    </Form.Field>
                    <Divider />
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default ScanKey;