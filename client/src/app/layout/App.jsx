import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import RecordDashboard from '../../features/record/RecordDashboard/RecordDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import RecordForm from '../../features/record/RecordForm/RecordForm';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import HomePage from '../../features/home/HomePage';
import addProperty from '../../features/property/addProperty';
import CreateReport from '../../features/createReport/CreateReport';
import Register from '../../features/register/Register';
import Testing from '../../features/testing/Testing';
import ReportList from '../../features/report/ReportList';
import addKey from '../../features/key/addKey';

const KeyRecordDashBoard = (props) => {
  return (
    <RecordDashboard columnsType="keys" {...props} />
  )
}

const PropertyRecordDashBoard = (props) => {
  return (
    <RecordDashboard columnsType="properties" {...props} />
  )
}

const PeopleRecordDashboard = (props) => {
  return (
    <RecordDashboard columnsType="people" {...props} />
  )
}

class App extends Component {

  
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/records" render={KeyRecordDashBoard} />
                  <Route path="/properties" render={PropertyRecordDashBoard} />
                  <Route path="/people" render={PeopleRecordDashboard} />
                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/createRecord" component={RecordForm} />
                  <Route path="/property" component={addProperty} />
                  <Route path="/createReport" component={CreateReport} />
                  <Route path="/register" component={Register} />
                  <Route path="/testing" component={Testing} />
                  <Route path="/report" component={ReportList} />
                  <Route path="/key" component={addKey} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
