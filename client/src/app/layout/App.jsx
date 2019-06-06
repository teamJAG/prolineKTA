import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import RecordDashboard from '../../features/record/RecordDashboard/RecordDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import HomePage from '../../features/home/HomePage';
import addProperty from '../../features/property/addProperty';
import CreateReport from '../../features/createReport/CreateReport';
import Register from '../../features/register/Register';
import Testing from '../../features/testing/Testing';
import ReportList from '../../features/report/ReportList';
import addKey from '../../features/key/addKey';
import ScanKey from '../../features/key/ScanKey';

const KeyRecordDashBoard = (props) => {
  return (
    <RecordDashboard tableType="keys" {...props} />
  )
}

const PropertyRecordDashBoard = (props) => {
  return (
    <RecordDashboard tableType="properties" {...props} />
  )
}

const PeopleRecordDashboard = (props) => {
  return (
    <RecordDashboard tableType="people" {...props} />
  )
}

const ReportDashboard = (props) => {
  return (
    <ReportList tableType="reports" {...props} />
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
                  <Route path="/reports" component={ReportDashboard} />
                  <Route path="/createkey" component={addKey} />
                  <Route path="/createproperty" component={addProperty} />
                  <Route path="/scankey" component={ScanKey} />

                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/testing" component={Testing} />
                  <Route path="/register" component={Register} />
                  <Route path="/report" render={CreateReport} />

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
