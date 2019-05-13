import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import RecordListAttendee from './RecordListAttendee'

class RecordListItem extends Component {
  render() {
    const {record, deleteRecord} = this.props
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={record.hostPhotoURL} />
              <Item.Content>
                <Item.Header as="a">{record.title}</Item.Header>
                <Item.Description>
                  Hosted by <a>{record.hostedBy}</a>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {record.date}|
            <Icon name="marker" /> {record.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
          {record.attendees && record.attendees.map((attendee) => (
            <RecordListAttendee key={attendee.id} attendee={attendee}/>
          ))}

          </List>
        </Segment>
        <Segment clearing>
        <span>{record.description}</span>
          <Button onClick={deleteRecord(record.id)} as="a" color="red" floated="right" content="Delete" />
          <Button as={Link} to={`/record/${record.id}`} color="teal" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    );
  }
}

export default RecordListItem;
