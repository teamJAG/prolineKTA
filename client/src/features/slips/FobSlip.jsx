import React from "react";
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

class FobSlip extends React.Component {
  state = {};
  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const containerStyle = {
      display: "flex",
      justifyContent: "center",
      paddingTop: "10%"
    };

    return (
      <div style={{ containerStyle }}>
        <Divider />
        <Grid columns={1}>
          <Grid.Row stretched>
            <Grid.Column />
            <Grid.Column>
              <Segment>
                <Form>
                  <Header textAlign="center">Proline Keys/Fobs</Header>
                  <Divider />

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Date Out</label>
                        <input type="date" id="dateOut" />
                      </div>
                      <div class="field">
                        <label>Date Due</label>
                        <input type="date" id="dueDate" />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <div class="two fields">
                      <div class="field">
                        <label>Building Address</label>
                        <input type="text" id="propertyName" />
                      </div>
                      <div class="field">
                        <label>Unit</label>
                        <input type="text" id="unit" />
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>Contractor</label>
                    <input type="text" id="contractor" />
                  </Form.Field>

                  <Form.Field>
                    <label>Notes</label>
                    <input style={{ minHeight: "5em" }} id="notes" />
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
                        <label>Building Address</label>
                        <input type="text" id="propertyName" />
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
                        <input type="text" id="firstName" />
                      </div>
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
                    <div class="four fields">
                      <div class="field">
                        <br />
                        <br />
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
                        <br />
                        <br />
                        <Checkbox
                          radio
                          label="To Keep"
                          name="checkboxRadioGroup"
                          value="keep"
                          checked={this.state.value === "keep"}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="field">
                        <br />
                        <br />
                        <Checkbox
                          radio
                          label="Purchase"
                          name="checkboxRadioGroup"
                          value="purchase"
                          checked={this.state.value === "purchase"}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="field">
                        <label>Deposit</label>
                        <Input labelPosition="right" type="text" id="deposit">
                          <Label basic>$</Label>
                          <input />
                          <Label>.00</Label>
                        </Input>
                      </div>
                    </div>
                  </Form.Field>

                  <Form.Field>
                    <label>Left At Reception By</label>
                    <input type="text" id="opStaff" />
                  </Form.Field>

                  <Form.Field>
                    <label>Due Date:</label>
                    <input type="date" id="dueDate" />
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
  return (
    <div>
      <ReactToPrint
        trigger={() => <Button color="teal">Print Slip</Button>}
        content={() => slipRef.current}
      />
      <FobSlip style={{ marginLeft: "10px" }} ref={slipRef} />
    </div>
  );
};

export default PrintSlip;
