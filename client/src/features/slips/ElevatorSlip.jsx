import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import {
  Grid,
  Segment,
  Radio,
  Checkbox,
  Label,
  Input,
  Button,
  Form,
  Divider,
  Header
} from "semantic-ui-react";
import ReactToPrint from "react-to-print";

class ElevatorSlip extends React.Component {
  state = {};
  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const containerStyle = {
      display: "auto",
      justifyContent: "center",
      transform: "scale(.80)",
    };
    let date = moment().format('YYYY-MM-DD');
    let dueDate = moment().add('days', 30).format('YYYY-MM-DD');

    return (
      <div style={ containerStyle }>
        <Grid columns={1}>
          <Grid.Row stretched>
            <Grid.Column />
            <Grid.Column>
              <Segment>
                <Form>
                  <Header textAlign="center">Elevator/Garage</Header>
                  <Divider />

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Date Out</label>
                        <input type="date" id="dateOut" defaultValue={date} />
                      </div>
                      <div class="field">
                        <label>Date Due</label>
                        <input type="date" id="dueDate" defaultValue={dueDate} />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>Building</label>
                    <input type="text" id="propertyName" />
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>First Name</label>
                        <input type="text" id="firstName" />
                      </div>
                      <div class="field">
                        <label>Last Name</label>
                        <input type="text" id="lastName" />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <div class="three fields">
                      <div class="field">
                        <label>Deposit</label>
                        <Input labelPosition="right" type="text" id="deposit">
                          <Label basic>$</Label>
                          <input />
                          <Label>.00</Label>
                        </Input>
                      </div>
                      <div class="field">
                        <br />
                        <label>Paid By:</label>
                        <Checkbox
                          radio
                          label="Cash"
                          name="checkboxRadioGroup"
                          value="cash"
                          checked={this.state.value === "cash"}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="field">
                        <br />
                        <br />
                        <Checkbox
                          radio
                          label="Cheque"
                          name="checkboxRadioGroup"
                          value="cheque"
                          checked={this.state.value === "cheque"}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </Form.Field>

                  <Divider />
                  <Header textAlign="center">
                    Please return to:
                    <br />
                    PROLINE MANAGEMENT LTD.
                    <br />
                    201 - 20 Burnside Road West, Victoria BC V9A 1B3
                    <Divider horizontal>
                      <i class="cut icon" />
                    </Divider>
                  </Header>
                  <Divider />

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Building</label>
                        <input type="text" id="propertyName" />
                      </div>
                      <div class="field">
                        <label>Unit</label>
                        <input type="text" id="unit" />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>First Name</label>
                        <input type="text" id="firstName" />
                      </div>
                      <div class="field">
                        <label>Last Name</label>
                        <input type="text" id="lastName" />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>Signature</label>
                    <input style={{ minHeight: "5em" }} disabled />
                  </Form.Field>

                  <Form.Field>
                    <label>Phone Number</label>
                    <input type="text" id="phone" />
                  </Form.Field>

                  <Form.Field>
                    <div class="three fields">
                      <div class="field">
                        <label>Deposit</label>
                        <Input labelPosition="right" type="text" id="deposit">
                          <Label basic>$</Label>
                          <input />
                          <Label>.00</Label>
                        </Input>
                      </div>
                      <div class="field">
                        <br />
                        <label>Paid By:</label>
                        <Checkbox
                          radio
                          label="Cash"
                          name="checkboxRadioGroup"
                          value="cash"
                          checked={this.state.value === "cash"}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="field">
                        <br />
                        <br />
                        <Checkbox
                          radio
                          label="Cheque"
                          name="checkboxRadioGroup"
                          value="cheque"
                          checked={this.state.value === "cheque"}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Date Out</label>
                        <input type="date" id="dateOut" defaultValue={date} />
                      </div>
                      <div class="field">
                        <label>Date Due</label>
                        <input type="date" id="dueDate" defaultValue={dueDate} />
                      </div>
                    </div>
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const PrintSlip = () => {
  const slipRef = React.useRef();
  const [redirect, setRedirect] = useState(null);
  return (
    <div>
      {redirect}
      <ReactToPrint
        trigger={() => <Button color="purple">Print Slip</Button>}
        content={() => slipRef.current}
        onAfterPrint={() => {setRedirect(<Redirect to="/keyreports" />)}}
      />
      <ElevatorSlip ref={slipRef} />
    </div>
  );
};

export default PrintSlip;
