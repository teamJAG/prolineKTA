import React from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react'

// Still need to work on this page
 
class Register extends React.Component {
    state = {
        username: '',
        email: '',
        password: ''
    };

    onSbmit = () => {
        console.log(this.state);
    }

    onChange = e => {
        const {name, value} = e.target.name;
        this.setState({ [name]: value});

    }

    render () {
        const { username, email, password } = this.state

        return (
            <Container text>
                <Header as='h2'> Register </Header> 
                <Input 
                    name="username"
                    onChange={this.onChange} 
                    value={username} 
                    placeholder="username" 
                    fluid
                /> 
                <Input 
                    name="email"
                    onChange={this.onChange} 
                    value={username} 
                    placeholder="email" 
                    fluid
                /> 
                <Input 
                    name="password"
                    onChange={this.onChange} 
                    type="password" 
                    placeholder="password" 
                    fluid
                /> 
            <Button onClick={this.onSubmit}>Submit</Button>
            </Container>
        );
    }
}
export default Register;
