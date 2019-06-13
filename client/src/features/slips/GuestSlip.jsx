import React from "react";
import { Grid, Segment, Radio, Checkbox, Label, Input, Button, Form, Divider, Header } from "semantic-ui-react";
import ReactToPrint from "react-to-print";


class GuestSlip extends React.Component {
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
            <Segment>
              <Form>

                <Header textAlign="center">Guest Room</Header>
                <Divider />

                <Form.Field>
                  <div class="two fields">
                    <div class="field">
                      <label>Date Out</label>
                      <input type="date" id="dateOut"></input>
                    </div>
                    <div class="field">
                      <label>Date Due</label>
                      <input type="date" id="dueDate"></input>
                    </div>
                  </div>
                </Form.Field>

                <Form.Field>
                  <label>Building</label>
                  <input type="text" id="propertyName"></input>
                </Form.Field>

                <Form.Field>
                  <div class="two fields">
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
                  <div class="three fields">
                    <div class="field">
                      <label>Deposit</label>
                      <Input labelPosition='right' type="text" id="deposit">
                        <Label basic>$</Label>
                        <input />
                        <Label>.00</Label>
                      </Input>
                    </div>
                    <div class="field">
                      <br/><label>Paid By:</label>
                      <Checkbox radio label='Cash' name='checkboxRadioGroup' value='cash' checked={this.state.value === 'cash'} onChange={this.handleChange}/>
                      </div>
                      <div class="field">
                      <br/><br/>
                      <Checkbox radio label='Cheque' name='checkboxRadioGroup' value='cheque' checked={this.state.value === 'cheque'} onChange={this.handleChange}/>          
                    </div>
                  </div>
                </Form.Field>

                <Divider />
                <Header textAlign="center">Please return to: 
                <br/>PROLINE MANAGEMENT LTD. 
                  <br/>201 - 20 Burnside Road West, Victoria BC V9A 1B3
                  <Divider horizontal><i class="cut icon"></i></Divider>
                </Header>
                <Divider />

                <Form.Field>
                  <div class="two fields">
                    <div class="field">
                      <label>Building</label>
                      <input type="text" id="propertyName"></input>
                    </div>
                    <div class="field">
                      <label>Unit</label>
                      <input type="text" id="unit"></input>
                    </div>
                  </div>
                </Form.Field>

                <Form.Field>
                  <div class="two fields">
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
                  <label>Signature</label>
                  <input style={{minHeight:"5em"}} disabled></input>
                </Form.Field>

                <Form.Field>
                  <label>Phone Number</label>
                  <input type="text" id="phone"></input>
                </Form.Field>

                <Form.Field>
                  <div class="three fields">
                    <div class="field">
                      <label>Deposit</label>
                      <Input labelPosition='right' type="text" id="deposit">
                        <Label basic>$</Label>
                        <input />
                        <Label>.00</Label>
                      </Input>
                    </div>
                    <div class="field">
                      <br/>
                      <label>Paid By:</label>
                      <Checkbox radio label='Cash' name='checkboxRadioGroup' value='cash' checked={this.state.value === 'cash'} onChange={this.handleChange}/>
                      </div>
                      <div class="field">
                        <br/><br/>
                      <Checkbox radio label='Cheque' name='checkboxRadioGroup' value='cheque' checked={this.state.value === 'cheque'} onChange={this.handleChange}/>
                    </div>
                </div>
                </Form.Field>

                <Form.Field>
                  <div class="two fields">
                    <div class="field">
                     <label>Date Out</label>
                      <input type="date" id="outDate"></input>
                    </div>
                    <div class="field">
                      <label>Due Date</label>
                      <input type="date" id="dueDate"></input>
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
        <GuestSlip style={{ marginLeft: "10px" }} ref={slipRef} />
    </div>
  );
};


export default PrintSlip;