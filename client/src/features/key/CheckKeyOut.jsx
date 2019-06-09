import React from 'react';
import { Form, Divider, Header } from 'semantic-ui-react';

const CheckKeyOut = (props) => {

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '10%'
    };

    return (
        <div style={{containerStyle}}>
            <Header>Check Out Pending Key</Header>
            <Divider />
            <Form onSubmit={props.checkout} >
            </Form>
        </div>
    )
}

export default CheckKeyOut;