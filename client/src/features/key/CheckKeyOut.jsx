import React from "react";
import {
  Grid,
  Segment,
  Table,
  Form,
  Divider,
  Header,
  Input
} from "semantic-ui-react";
import AutoComplete from "./AutoComplete";

const CheckKeyOut = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     firstName: '',
  //     lastName: '',
  //     company: '',
  //     deposit: null,
  //     depositType: null,
  //     fees: null,
  //     notes: null,
  //     sale: false
  //   }
  // }

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    paddingTop: "10%"
  };

  return (
    <div style={{ containerStyle }}>
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Table definition>
                <Table.Header>
                  <Table.Row />
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Address</Table.Cell>
                    <Table.Cell>{props.keyRecord.address}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>City</Table.Cell>
                    <Table.Cell>{props.keyRecord.city}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Property Name</Table.Cell>
                    <Table.Cell>{props.keyRecord.propertyName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Property Type</Table.Cell>
                    <Table.Cell>{props.keyRecord.propertyType}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Key Type</Table.Cell>
                    <Table.Cell>{props.keyRecord.keyType}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Storage Location</Table.Cell>
                    <Table.Cell>
                      {props.keyRecord.keyStorageLocation}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Office Location</Table.Cell>
                    <Table.Cell>{props.keyRecord.keyOfficeLocation}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Deposit</Table.Cell>
                    <Table.Cell>{props.keyRecord.deposit}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Form onSubmit={props.checkout}>
                <Header textAlign="center">Check Out Pending Key</Header>
                <Divider />
                <Form.Field>
                  <label>First Name</label>
                  <input id="firstName" />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input id="lastName"  />
                </Form.Field>
                <Form.Field>
                  <label>Company</label>
                  <AutoComplete
                    table="contractor_tab"
                    id="company"
                    as={Input}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Deposit</label>
                  <input id="deposit" />
                </Form.Field>
                <Form.Field>
                  <label>Deposit Type</label>
                  <input id="depositType" />
                </Form.Field>
                <Form.Field>
                  <label>Fees</label>
                  <input id="fees" />
                </Form.Field>
                <Form.Field>
                  <label>Notes</label>
                  <input id="notes" />
                </Form.Field>
                <Form.Group>
                  <Form.Button content="Submit" />
                  <Form.Field
                    label="This is a sale"
                    inline={true}
                    control="input"
                    id="sale"
                    type="checkbox"
                  />
                </Form.Group>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default CheckKeyOut;
