import React, { Component } from "react";
import { Menu, Dropdown, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";

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
              <Dropdown.Item as={NavLink} to="/keys">
                Keys
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/properties">
                Properties
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/people">
                People
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown item text="Reports">
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/keyreports">
                Keys Out
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/buildingreports">
                Buildings
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          

          <Dropdown item text="Forms">
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/guest">
                Guest
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/coho">
                Guest - Coho
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/elevator">
                Elevator
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/fob">
                Fob
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/trade">
                Trades
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/rental">
                Final Rental
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/purchase">
                Purchase
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/generic">
                Generic
              </Dropdown.Item>
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
              color="white"
              content="Add Key"
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
              color="white"
              content="Add Property"
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
              color="white"
              content="Scan Key"
            />
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
