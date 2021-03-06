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

class FobSlip extends React.Component {
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
                  <Header textAlign="center">Purchase Form</Header>
                  <Divider />

                  <Form.Field>
                    <label>Building</label>
                    <input type="text" id="propertyName" defaultValue={this.props.autofill.propertyName} />
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
                    <label>Purchase Description</label>
                    <input style={{ minHeight: "5em" }} id="notes" />
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
                    <label>Amount</label>
                    <Input labelPosition="right" type="text" id="deposit" defaultValue={this.props.autofill.deposit} >
                      <Label basic>$</Label>
                      <input />
                      <Label>.00</Label>
                    </Input>
                  </Form.Field>

                  <Form.Field>
                    <label>Date Out:</label>
                    <input type="date" id="outDate" defaultValue={date} />
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

const PrintPurchaseSlip = () => {
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
      <FobSlip ref={slipRef} />
    </div>
  );
};

export default PrintPurchaseSlip;
