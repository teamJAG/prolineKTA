import React from "react";
import { Grid, Segment, Radio, Checkbox, Label, Input, Button, Form, Divider, Header } from "semantic-ui-react";
import ReactToPrint from "react-to-print";




class ElevatorSlip extends React.Component {
    state = {}
  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const containerStyle = {
      display: "flex",
      justifyContent: "center",
      paddingTop: "10%"
    };

  return (
    <div style={{ containerStyle }}>
      <Grid columns={1}>
        <Grid.Row stretched>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Form>
                <Header textAlign="center">Final Rental Documents &/ Key Signout</Header>
                <Divider />

                <Form.Field>
                  <div class="two fields">
                    <div class="field">
                      <label>Building Address</label>
                      <input type="text" id="propertyName"></input>
                    </div>
                    <div class="field">
                      <label>Unit</label>
                      <input type="text" id="unit"></input>
                    </div>
                  </div>
                </Form.Field>

                <Form.Field>
                  <label>I acknowledge that I have received the following for the above mentioned property:</label>
                  <div class="two fields">
                      <div class="field">
                  <Checkbox checkbox label="Original tenacny documents"/>
                    </div>
                    <div class="field">
                  <Checkbox checkbox label="Keys &/ fobs"/>
                    </div>
                    </div>
                </Form.Field>

                <Form.Field>
                    <div class="two fields">
                        <div class="field">
                            <label>Signature</label>
                            <input style={{minHeight:"5em"}} disabled></input>
                        </div>
                        <div class="field">
                            <label>Date</label>
                            <input type="date" id="dateSigned"></input>
                        </div>
                    </div>
                </Form.Field>

                <Divider />
                <Header textAlign="center">PROLINE MANAGEMENT LTD.
                <br/>201 - 20 Burnside Road West, Victoria BC V9A 1B3 | T: 250.475.6440 | F: 250.475.6442
                  <br/>Westshore: 250.915.8888 | Nanaimo: 250.754.6440 | www.prolinemanagement.com
                  <Divider horizontal><i class="cut icon"></i></Divider>
                </Header>
                <Divider />

                <Header textAlign="center">Final Rental Documents &/ Key Signout</Header>

                <Form.Field>
                  <div class="two fields">
                    <div class="field">
                      <label>Left At Reception By</label>
                      <input type="text" id="opStaff"></input>
                    </div>
                    <div class="field">
                      <label>Date</label>
                      <input type="date" id="dateSigned"></input>
                    </div>
                    </div>
                </Form.Field>

                <Form.Field>
                  <div class="two fields">
                    <div class="field">
                      <label>Building Address</label>
                      <input type="text" id="propertyName"></input>
                    </div>
                    <div class="field">
                      <label>Unit</label>
                      <input type="text" id="unit"></input>
                    </div>
                  </div>
                </Form.Field>

                <Form.Field>
                    <Header textAlign="center">Party Picking Up</Header>
                  <div class="three fields">
                    <div class="field">
                      <label>Company</label>
                      <input type="text" id="firstName"></input>
                    </div>
                    <div class="field">
                        <label>First Name</label>
                        <input type="text" id="firstName"></input>
                    </div>
                    <div class="field">
                      <label>Last Name</label>
                      <input type="text" id="lastName"></input>
                    </div>
                    </div>
                </Form.Field>

                <Form.Field>
                  <label>I acknowledge that I have received the following for the above mentioned property:</label>
                  <div class="two fields">
                      <div class="field">
                  <Checkbox checkbox label="Original tenacny documents"/>
                    </div>
                    <div class="field">
                  <Checkbox checkbox label="Keys &/ fobs"/>
                    </div>
                    </div>
                </Form.Field>

                <Form.Field>
                    <div class="two fields">
                        <div class="field">
                            <label>Signature</label>
                            <input style={{minHeight:"5em"}} disabled></input>
                        </div>
                        <div class="field">
                            <label>Date</label>
                            <input type="date" id="dateSigned"></input>
                        </div>
                    </div>
                </Form.Field>

                <Form.Field>
                  <label>Phone Number</label>
                  <input type="text" id="phone"></input>
                </Form.Field>

              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
};

const PrintSlip = () => {
  const slipRef = React.useRef()
    return (
    <div>
      <ReactToPrint
        trigger={() => <Button color="teal">Print Slip</Button>}
        content={() => slipRef.current}
        />
        <ElevatorSlip style={{ marginLeft: "10px" }} ref={slipRef} />
    </div>
  );
};


export default PrintSlip;