import React from "react";
import { Grid, Segment, Radio, Checkbox, Label, Input, Button, Form, Divider, Header } from "semantic-ui-react";
import ReactToPrint from "react-to-print";




class TradeSlip extends React.Component {
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
                <Header textAlign="center">Trade Keys</Header>
                <Divider />

                <Form.Field>
                  <label>Building</label>
                  <input type="text" id="propertyName"></input>
                </Form.Field>

                <Form.Field>
                  <label>Company</label>
                  <input type="text" id="company"></input>
                </Form.Field>

                <Form.Field>
                  <div class="two fields">
                  <div class="field"><label>Date Booked</label>
                  <input type="date" id="bookedOut"></input>
                  </div>
                  <div class="field"><label>Due Date</label>
                  <input type="date" id="dueDate"></input></div></div>
                </Form.Field>

                <Divider />
                <Header textAlign="center">Please return to: 
                <br/>PROLINE MANAGEMENT LTD. 
                  <br/>201 - 20 Burnside Road West, Victoria BC V9A 1B3
                  <Divider horizontal><i class="cut icon"></i></Divider>
                </Header>
                <Divider />

                <Form.Field>
                  <label>Building</label>
                  <input type="text" id="propertyName"></input>
                </Form.Field>

                <Form.Field>
                  <label>Set</label>
                  <input id="setNumber"></input>
                </Form.Field>

                <Form.Field>
                  <label>Description</label>
                  <input type="number" id="description"></input>
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
                  <label>Company</label>
                  <input type="text" id="company"></input>
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
                  <div class="two fields">
                    <div class="field">
                    <Checkbox radio label='To Return' name='checkboxRadioGroup' value='return' checked={this.state.value === 'return'} onChange={this.handleChange}/>
                    </div>
                    <div class="field">
                    <Checkbox radio label='To Keep (No Charge)' name='checkboxRadioGroup' value='keep' checked={this.state.value === 'keep'} onChange={this.handleChange}/>
                    </div>
                    </div>
                </Form.Field>

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
        <TradeSlip style={{ marginLeft: "10px" }} ref={slipRef} />
    </div>
  );
};


export default PrintSlip;
