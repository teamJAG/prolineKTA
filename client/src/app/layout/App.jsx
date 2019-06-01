import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import RecordDashboard from '../../features/record/RecordDashboard/RecordDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import RecordForm from '../../features/record/RecordForm/RecordForm';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import HomePage from '../../features/home/HomePage';
import InventoryPage from '../../features/inventory/InventoryPage';
import addProperty from '../../features/property/addProperty';
import CreateReport from '../../features/createReport/CreateReport';
import Register from '../../features/register/Register';
import Testing from '../../features/testing/Testing';
import ReportList from '../../features/report/ReportList';

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
                  <Route path="/records" component={RecordDashboard} />
                  <Route path="/inventory" component={InventoryPage} />
                  <Route path="/people" component={PeopleDashboard} />
                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/createRecord" component={RecordForm} />
                  <Route path="/property" component={addProperty} />
                  <Route path="/createReport" component={CreateReport} />
                  <Route path="/register" component={Register} />
                  <Route path="/testing" component={Testing} />
                  <Route path="/report" component={ReportList} />
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
