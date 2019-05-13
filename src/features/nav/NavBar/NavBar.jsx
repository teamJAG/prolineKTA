import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

class NavBar extends Component {
  state = {
    authenticated: false
  };

  handleSignIn = () => {
    this.setState({
      authenticated: true
    });
  };

  handleSignOut = () => {
    this.setState({
      authenticated: false
    });
    this.props.history.push('/')
  };

  render() {
    const { authenticated } = this.state;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            Proline KTA
          </Menu.Item>
          <Menu.Item as={NavLink} to="/records" name="Properties" />
          <Menu.Item as={NavLink} to="/test" name="Test" />
          {authenticated &&
          <Menu.Item as={NavLink} to="/people" name="Employees" />}

          {authenticated &&

          <Menu.Item>
            <Button
              as={Link}
              to="/createEvent"
              floated="right"
              //positive
              inverted
              color="teal"
              content="Add Property"
            />
          </Menu.Item>}

        {authenticated &&
        <Menu.Item>
        <Button
          as={Link}
          to="/createEvent"
          floated="right"
          //positive
          inverted
          color="teal"
          content="Create Report"
        />
      </Menu.Item>
        }

          {authenticated ? (
            <SignedInMenu signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
