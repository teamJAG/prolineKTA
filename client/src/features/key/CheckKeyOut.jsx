import React from "react";
import { Grid, Segment, Table, Form, Divider, Header } from "semantic-ui-react";

const CheckKeyOut = props => {
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
                    <Table.Row>
                      <Table.Cell>Deposit</Table.Cell>
                      <Table.Cell>{props.keyRecord.deposit}</Table.Cell>
                    </Table.Row>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Form onSubmit={props.checkout}>
                <Header>Check Out Pending Key</Header>
                <Divider />
                <Form.Button content="Submit" />
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default CheckKeyOut;
