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
                  <Header textAlign="center">
                    Final Rental Documents &/ Key Signout
                  </Header>
                  <Divider />

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Building Address</label>
                        <input type="text" id="propertyName" defaultValue={this.props.autofill.address} />
                      </div>
                      <div class="field">
                        <label>Unit</label>
                        <input type="text" id="unit" />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>
                      I acknowledge that I have received the following for the
                      above mentioned property:
                    </label>
                    <div class="two fields">
                      <div class="field">
                        <Checkbox checkbox label="Original tenacny documents" />
                      </div>
                      <div class="field">
                        <Checkbox checkbox label="Keys &/ fobs" />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Signature</label>
                        <input style={{ minHeight: "5em" }} disabled />
                      </div>
                      <div class="field">
                        <label>Date</label>
                        <input type="date" id="dateSigned" defaultValue={date} />
                      </div>
                    </div>
                  </Form.Field>

                  <Divider />
                  <Header textAlign="center">
                    PROLINE MANAGEMENT LTD.
                    <br />
                    201 - 20 Burnside Road West, Victoria BC V9A 1B3 | T:
                    250.475.6440 | F: 250.475.6442
                    <br />
                    Westshore: 250.915.8888 | Nanaimo: 250.754.6440 |
                    www.prolinemanagement.com
                    <Divider horizontal>
                      <i class="cut icon" />
                    </Divider>
                  </Header>
                  <Divider />

                  <Header textAlign="center">
                    Final Rental Documents &/ Key Signout
                  </Header>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Left At Reception By</label>
                        <input type="text" id="opStaff" />
                      </div>
                      <div class="field">
                        <label>Date</label>
                        <input type="date" id="dateSigned" defaultValue={date} />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Building Address</label>
                        <input type="text" id="propertyName" defaultValue={this.props.autofill.address} />
                      </div>
                      <div class="field">
                        <label>Unit</label>
                        <input type="text" id="unit" />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <Header textAlign="center">Party Picking Up</Header>
                    <div class="three fields">
                      <div class="field">
                        <label>Company</label>
                        <input type="text" id="company" defaultValue={this.props.autofill.company} />
                      </div>
                      <div class="field">
                        <label>First Name</label>
                        <input type="text" id="firstName" defaultValue={this.props.autofill.firstName} />
                      </div>
                      <div class="field">
                        <label>Last Name</label>
                        <input type="text" id="lastName" defaultValue={this.props.autofill.lastName} />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>
                      I acknowledge that I have received the following for the
                      above mentioned property:
                    </label>
                    <div class="two fields">
                      <div class="field">
                        <Checkbox checkbox label="Original tenacny documents" />
                      </div>
                      <div class="field">
                        <Checkbox checkbox label="Keys &/ fobs" />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Signature</label>
                        <input style={{ minHeight: "5em" }} disabled />
                      </div>
                      <div class="field">
                        <label>Date</label>
                        <input type="date" id="dateSigned" defaultValue={date} />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>Phone Number</label>
                    <input type="text" id="phone" defaultValue={this.props.autofill.phone_num} />
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

const PrintRentalSlip = () => {
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

export default PrintRentalSlip;
