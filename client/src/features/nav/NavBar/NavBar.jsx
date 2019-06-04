import React, { Component } from 'react';
import { Menu, Dropdown, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            Proline KTA
          </Menu.Item>
          <Dropdown item text="Records">
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/records">Keys</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/properties">Properties</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/people">People</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item as={NavLink} to="/testing" name="Testing" />
            
          <Menu.Item as={NavLink} to="/report" name="Reports" />

          <Menu.Item>
            <Button
              as={NavLink}
              to="/key"
              name="addKey"
              floated="right"
              //positive
              inverted
              color="teal"
              content="Add Key"
            />
          </Menu.Item>

          <Menu.Item>
            <Button
              as={NavLink}
              to="/property"
              name="addProperty"
              floated="right"
              //positive
              inverted
              color="teal"
              content="Add Property"
            />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
