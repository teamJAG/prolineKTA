import React from 'react';
import { Button, Divider, Header, Label } from 'semantic-ui-react';

const KeyPending = (props) => {

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '10%'
    };
    
    return (
        <div style={containerStyle}>
            <Header>Set Key As Pending</Header>
            <Button onClick={props.isPending}>Submit</Button>   
        </div>
    )
}

export default KeyPending;