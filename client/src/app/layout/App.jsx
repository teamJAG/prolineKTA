import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch, Redirect } from "react-router-dom";
import RecordDashboard from "../../features/record/RecordDashboard";
import ReportDashboard from "../../features/report/ReportDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import HomePage from "../../features/home/HomePage";
import AddProperty from "../../features/property/AddProperty";
import EditContractor from "../../features/user/EditContractor";
import AddContractor from "../../features/user/AddContractor";
import AddKey from "../../features/key/AddKey";
import Testing from "../../features/testing/Testing";
import ScanKey from "../../features/key/ScanKey";
import EditKey from "../../features/key/EditKey";
import EditProperty from "../../features/property/EditProperty";
import PrintCohoSlip from "../../features/slips/CohoSlip";
import PrintElevatorSlip from "../../features/slips/ElevatorSlip";
import PrintFobSlip from "../../features/slips/FobSlip";
import PrintGuestSlip from "../../features/slips/GuestSlip";
import PrintPurchaseSlip from "../../features/slips/PurchaseSlip";
import PrintRentalSlip from "../../features/slips/RentalSlip";
import PrintTradeSlip from "../../features/slips/TradeSlip";
import PrintGenericSlip from "../../features/slips/GenericSlip";

import { fetchLogin } from "../fetch/fetches";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      privLevel: 0,
      redirect: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.hydrateStateWithStorage = this.hydrateStateWithStorage.bind(this);
  }

  componentDidMount() {
    this.hydrateStateWithStorage();
  }

  hydrateStateWithStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({
            [key]: value
          });
        } catch (err) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  KeyRecordDashBoard = props => {
    return (
      <RecordDashboard
        tableType="keys"
        privLevel={this.state.privLevel}
        {...props}
      />
    );
  };

  PropertyRecordDashBoard = props => {
    return (
      <RecordDashboard
        tableType="properties"
        privLevel={this.state.privLevel}
        {...props}
      />
    );
  };

  PeopleRecordDashboard = props => {
    return (
      <RecordDashboard
        tableType="people"
        privLevel={this.state.privLevel}
        {...props}
      />
    );
  };

  KeyReportDashboard = props => {
    return <ReportDashboard tableType="keys" {...props} />;
  };

  BuildingReportDashboard = props => {
    return <ReportDashboard tableType="properties" {...props} />;
  };

  PrivateRoute({ render: Component, authorized, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          authorized === true ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }

  handleLogin(e) {
    const request = {
      username: e.target.username.value,
      password: e.target.password.value
    };
    fetchLogin(request, res => {
      console.log(res);
      localStorage.setItem("authorized", "true");
      localStorage.setItem("privLevel", JSON.stringify(res.priv_level));
      localStorage.setItem("firstName", JSON.stringify(res.first_name));
      localStorage.setItem("lastName", JSON.stringify(res.last_name));
      localStorage.setItem("redirect", "true");
      this.setState({
        authorized: true,
        privLevel: res.priv_level,
        redirect: true
      });
    });
  }

  HomePageLogin = props => {
    if (this.state.redirect) {
      return <Redirect to="keys" />;
    }
    return <HomePage login={this.handleLogin} {...props} />;
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={this.HomePageLogin} />
        </Switch>
        <this.PrivateRoute
          authorized={this.state.authorized}
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                  <Route path="/keys" render={this.KeyRecordDashBoard} />
                  <Route
                    path="/properties"
                    render={this.PropertyRecordDashBoard}
                  />
                  <Route path="/people" render={this.PeopleRecordDashboard} />
                  <Route path="/createcontractor" component={AddContractor} />
                  <Route path="/editcontractor" component={EditContractor} />
                  <Route path="/keyreports" render={this.KeyReportDashboard} />
                  <Route
                    path="/buildingreports"
                    render={this.BuildingReportDashboard}
                  />
                  <Route path="/createkey" component={AddKey} />
                  <Route path="/createproperty" component={AddProperty} />
                  <Route path="/scankey" component={ScanKey} />
                  <Route path="/editkey" component={EditKey} />
                  <Route path="/editproperty" component={EditProperty} />
                  <Route path="/testing" component={Testing} />
                  <Route path="/coho" component={PrintCohoSlip} />
                  <Route path="/elevator" component={PrintElevatorSlip} />
                  <Route path="/fob" component={PrintFobSlip} />
                  <Route path="/guest" component={PrintGuestSlip} />
                  <Route path="/purchase" component={PrintPurchaseSlip} />
                  <Route path="/rental" component={PrintRentalSlip} />
                  <Route path="/trade" component={PrintTradeSlip} />
                  <Route path="/generic" component={PrintGenericSlip} />
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
