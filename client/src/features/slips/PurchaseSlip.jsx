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
                  <Header textAlign="center">Purchase Form</Header>
                  <Divider />

                  <Form.Field>
                    <label>Building</label>
                    <input type="text" id="propertyName" />
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
                    <label>Purchase Description</label>
                    <input style={{ minHeight: "5em" }} id="notes" />
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
                    <label>Amount</label>
                    <Input labelPosition="right" type="text" id="deposit">
                      <Label basic>$</Label>
                      <input />
                      <Label>.00</Label>
                    </Input>
                  </Form.Field>

                  <Form.Field>
                    <label>Date Out:</label>
                    <input type="date" id="outDate" />
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
