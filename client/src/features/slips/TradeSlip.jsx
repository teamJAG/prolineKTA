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

class TradeSlip extends React.Component {
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
                  <Header textAlign="center">Trade</Header>
                  <Divider />

                  <Form.Field>
                    <label>Building</label>
                    <input type="text" id="propertyName" defaultValue={this.props.autofill.address} />
                  </Form.Field>

                  <Form.Field>
                    <label>Company</label>
                    <input type="text" id="company" defaultValue={this.props.autofill.company} />
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Date Booked</label>
                        <input type="date" id="bookedOut" defaultValue={date} />
                      </div>
                      <div class="field">
                        <label>Due Date</label>
                        <input type="date" id="dueDate" defaultValue={dueDate} />
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
                    <label>Building</label>
                    <input type="text" id="propertyName" defaultValue={this.props.autofill.address} />
                  </Form.Field>

                  <Form.Field>
                    <label>Description</label>
                    <input type="number" id="description" defaultValue={this.props.autofill.comments} />
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>First Name</label>
                        <input type="text" id="firstName" defaultValue={this.props.autofill.firstname} />
                      </div>
                      <div class="field">
                        <label>Last Name</label>
                        <input type="text" id="lastName" defaultValue={this.props.autofill.lastName} />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>Company</label>
                    <input type="text" id="company" defaultValue={this.props.autofill.company} />
                  </Form.Field>

                  <Form.Field>
                    <label>Signature</label>
                    <input style={{ minHeight: "5em" }} disabled />
                  </Form.Field>

                  <Form.Field>
                    <label>Phone Number</label>
                    <input type="text" id="phone" defaultValu={this.props.autofill.company} />
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <Checkbox
                          radio
                          label="To Return"
                          name="checkboxRadioGroup"
                          value="return"
                          checked={this.state.value === "return"}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="field">
                        <Checkbox
                          radio
                          label="To Keep (No Charge)"
                          name="checkboxRadioGroup"
                          value="keep"
                          checked={this.state.value === "keep"}
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

const PrintTradeSlip = () => {
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
      <TradeSlip ref={slipRef} />
    </div>
  );
};

export default PrintTradeSlip;
