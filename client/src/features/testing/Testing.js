import React from 'react';
import { Button, Form, Grid, Header, Message, Segment,} from 'semantic-ui-react';

// This page is just to show an example on how the login and create user form looks like
// Login form example
export default () => (
  <Grid centered columns={2}>
    <Grid.Column>
      <Header as="h2" textAlign="center">
        Login
      </Header>
      <Segment>
        <Form size="large">
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Email address"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />
          <Button color="blue" fluid size="large">
            Login
          </Button>
        </Form>
      </Segment>
      <Message>
        Not registered yet? <a href="#">Sign Up</a>
      </Message>
    </Grid.Column>

{/* Create/update user form example */}
    <Grid.Column>
      <Header as="h2" textAlign="center">
        Create/Update User
      </Header>
        <Segment>
        <Form size="large">
          <Form.Input
            fluid
            iconPosition="left"
            placeholder="First Name"
          />
          <Form.Input
            fluid
            iconPosition="left"
            placeholder="Last Name"
          />
          <Form.Input
            fluid
            iconPosition="left"
            placeholder="Username"
          />
          <Form.Input
            fluid
            iconPosition="left"
            placeholder="Temp Password"
            type="password"
          />
          <Form.Input
            fluid
            iconPosition="left"
            placeholder="Email address"
          />
          <Form.Input
            fluid
            iconPosition="left"
            placeholder="Phone Number"
          />
          <Form.Input
            fluid
            iconPosition="left"
            placeholder="Address"
          />
          <Form.Field label='User Privilege' control='select'>
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
          </Form.Field>
          <Form.Field label='Department' control='select'>
            <option value='a'>A</option>
            <option value='b'>B</option>
          </Form.Field>
          <Form.Group grouped>
          <button class="ui green button">Save Record</button>
          <button class="ui black basic button">Cancel</button>
          <button class="ui red button">Delete Record</button>
          </Form.Group>
          
          {/* <Button color="blue" fluid size="large">
            Register
          </Button> */}
        </Form>
      </Segment>
      </Grid.Column>
  </Grid>
);