import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { fetchLogin } from "../../app/fetch/fetches";
import {
  Grid,
  Header,
  Segment,
  Form,
  Modal,
  Button,
  Input
} from "semantic-ui-react";

const HomePage = props => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img
              className="ui image massive"
              src="assets/logo.png"
              alt="logo"
            />
            <div className="content">Proline KTA</div>
          </h1>
          <h2>Start Tracking Keys</h2>
          <Modal
            trigger={
              <div className="ui huge white inverted button">
                Proceed
                <i className="right arrow icon" />
              </div>
            }
            basic
          >
            <Modal.Content>
              <Grid centered columns={2}>
                <Grid.Column>
                  <Segment>
                    <Header as="h2" textAlign="center">
                      Login
                    </Header>
                    <Form size="large" onSubmit={props.login}>
                      <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="User Name"
                        name="username"
                      />
                      <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        name="password"
                        type="password"
                      />
                      <Form.Button
                        color="purple"
                        fluid
                        size="large"
                        type="submit"
                        content="Submit"
                      />
                    </Form>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Modal.Content>
          </Modal>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        Developed for Proline Propety Management by Aidan Ranney, Jesse Johnston & Gary Walsh
      </div>
    </div>
  );
};

export default HomePage;
