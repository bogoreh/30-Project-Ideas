import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import "./style/app.css";

import DonorProfile from "./donorComponents/donorProfile";
import donorRegister from "./donorComponents/donorRegister";
import loggedInDonor from "./donorComponents/loggedInDonor";

import HospitalProfile from "./hospitalComponents/hospitalProfile";
import hospitalRegister from "./hospitalComponents/hospitalRegister";
import loggedInHospital from "./hospitalComponents/loggedInHospital";

const DonorPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      DonorProfile.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const HospitalPrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      HospitalProfile.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/hospitalRegister" />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={donorRegister} />
            <DonorPrivateRoute
              path="/loggedInDonor"
              component={loggedInDonor}
            />

            <Route path="/hospitalRegister" component={hospitalRegister} />
            <HospitalPrivateRoute
              path="/loggedInHospital"
              component={loggedInHospital}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
