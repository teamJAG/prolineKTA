import React, { Component } from 'react';
import { Menu, Dropdown, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';

class NavBar extends Component {

  render() {
    return (
      <Menu inverted fluid fixed="top">
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
            
          <Dropdown item text="Reports">
          <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/keyreports">Keys</Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/buildingreports">Buildings</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Button
              as={NavLink}
              to="/createkey"
              name="addKey"
              floated="right"
              //positive
              inverted
              color="teal"
              content="Add/Edit Key"
            />
          </Menu.Item>

          <Menu.Item>
            <Button
              as={NavLink}
              to="/createproperty"
              name="addProperty"
              floated="right"
              //positive
              inverted
              color="teal"
              content="Add/Edit Property"
            />
          </Menu.Item>

          <Menu.Item>
          <Button
            as={NavLink}
            to="/scankey"
            name="checkKey"
            floated="right"
            //positive
            inverted
            color="teal"
            content="Scan Key"
          />
        </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
