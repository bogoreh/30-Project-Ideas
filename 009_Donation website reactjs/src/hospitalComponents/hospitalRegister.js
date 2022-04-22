import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HospitalProfile from "./hospitalProfile";

class hospitalRegister extends React.Component {
  state = {
    name: "",
    email: "",
    city: "",
    password: "",

    loginEmail: "",
    loginPassword: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, email, city, password } = this.state;

    var postString =
      "http://localhost:8000/hospitals?email=" +
      email +
      "&name=" +
      name +
      "&city=" +
      city +
      "&password=" +
      password;
    axios.post(postString, {}).then(result => {
      if (result.data) {
        this.setState({ loginEmail: email, loginPassword: password });
        this.onLogin(e);
      } else {
        let hospitalRegisterAlert = document.getElementById(
          "hospitalRegisterAlert"
        );
        hospitalRegisterAlert.style = "display:block";
      }
    });
  };

  onLogin = e => {
    e.preventDefault();
    const { loginEmail, loginPassword } = this.state;

    var postString =
      "http://localhost:8000/hospitalspass/" +
      loginEmail +
      "?password=" +
      loginPassword;
    axios.get(postString, {}).then(result => {
      if (result.data) {
        HospitalProfile.setEm(loginEmail);
        HospitalProfile.authenticate();
        this.props.history.push("/loggedInHospital");
      } else {
        let hospitalLoginAlert = document.getElementById("hospitalLoginAlert");
        hospitalLoginAlert.style = "display:block";
      }
    });
  };

  render() {
    const {
      name,
      email,
      city,
      password,
      loginEmail,
      loginPassword
    } = this.state;
    return (
      <div>
        <header>Hospitals Site</header>
        <div id="fullBox">
          <div id="about">
            <div id="HosLogTitle">
              <h5>Hospitals Login:</h5>
            </div>
            <Link to="/" className={"text-danger"}>
              A donor?
            </Link>
            <div
              className="alert alert-warning"
              id="hospitalLoginAlert"
              role="alert"
            >
              Email and password doesn't match!
            </div>
            <form className="form-signin" onSubmit={this.onLogin}>
              <div className="input-group">
                <input
                  type="text"
                  name="loginEmail"
                  value={loginEmail}
                  className="form-control"
                  placeholder="Email"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="loginPassword"
                  value={loginPassword}
                  className="form-control"
                  placeholder="Password"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-lg btn-outline-light btn-block form-control"
                  name="add"
                />
              </div>
            </form>
          </div>
          <div id="regBox">
            <div
              className="alert alert-warning"
              id="hospitalRegisterAlert"
              role="alert"
            >
              The Email is already registered!
            </div>
            <h5>Hospitals Registration:</h5>
            <form className="form-signin" onSubmit={this.onSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  value={name}
                  className="form-control"
                  placeholder="Hospital Full Name"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="email"
                  value={email}
                  className="form-control"
                  placeholder="Admin Email"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="city"
                  value={city}
                  className="form-control"
                  placeholder="City"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control"
                  placeholder="Password"
                  onChange={this.onChange}
                  required
                />
              </div>
              All fields are required
              <div className="input-group">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-lg btn-outline-dark btn-block form-control"
                  name="add"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default hospitalRegister;
