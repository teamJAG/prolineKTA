import React from "react";
import { Form, Divider, Header, Grid, Table, Segment } from "semantic-ui-react";

const CheckKeyIn = props => {
  return (
    <div style={{ textAlign: "center" }}>
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Header textAlign="center">Key Information</Header>
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
                  <Table.Cell>Property Number</Table.Cell>
                  <Table.Cell>{props.keyRecord.propertyNumber}</Table.Cell>
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
            <Header textAlign="center">Transaction Info</Header>
            <Segment>
              <Table definition>
                <Table.Header>
                  <Table.Row />
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Checked Out</Table.Cell>
                    <Table.Cell>{props.transaction.checkedOut}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>By</Table.Cell>
                    <Table.Cell>
                      {props.transaction.firstName} {props.transaction.lastName}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Company</Table.Cell>
                    <Table.Cell>{props.transaction.company}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Due Date</Table.Cell>
                    <Table.Cell>{props.transaction.dueDate}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Deposit</Table.Cell>
                    <Table.Cell>{props.transaction.deposit}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Fees</Table.Cell>
                    <Table.Cell>{props.transaction.fees}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Payment Type</Table.Cell>
                    <Table.Cell>{props.transaction.depositType}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Notes</Table.Cell>
                    <Table.Cell>{props.transaction.notes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div style={{ display: "inline-block", paddingTop: "2%" }}>
        <Segment compact floated="right" textAlign="center">
          <Form onSubmit={props.checkin}>
            <Header>Check Key Back In</Header>
            <Divider />
            <Form.Button color="purple" content="Submit" />
          </Form>
        </Segment>
      </div>
    </div>
  );
};

export default CheckKeyIn;
