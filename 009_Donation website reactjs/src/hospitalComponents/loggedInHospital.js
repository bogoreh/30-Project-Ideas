import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import HospitalProfile from "./hospitalProfile";

class loggedInHospital extends React.Component {
  state = {
    donations: [],
    hospitalFullName: "",
    hospitalEmail: "",
    hospitalCity: "",
    hospitalPassword: ""
  };

  componentDidMount() {
    let donations = [];
    axios.get("http://localhost:8000/donations").then(res => {
      donations = res.data;
      this.setState({ donations: donations });
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitUpdateHospital = e => {
    e.preventDefault();
    let hospitalFullName = this.state.hospitalFullName;
    let hospitalEmail = this.state.hospitalEmail;
    let hospitalCity = this.state.hospitalCity;
    let hospitalPassword = this.state.hospitalPassword;
    let em = HospitalProfile.getEm();

    var postString =
      "http://localhost:8000/hospitals/" +
      em +
      "?email=" +
      hospitalEmail +
      "&name=" +
      hospitalFullName +
      "&city=" +
      hospitalCity +
      "&password=" +
      hospitalPassword;
    axios.post(postString, {}).then(result => {
      this.componentDidMount();
    });
    this.cancel();
  };

  donorClicked(e) {
    let email = e.target.parentElement.childNodes[4].innerText;
    let type = e.target.parentElement.childNodes[1].innerText;
    let id = e.target.parentElement.childNodes[0].innerText;
    window.location.href =
      `mailto:` +
      email +
      `?subject=Donation Request&body=
    Hello, thanks for offering the donation with an ID ` +
      id +
      ` from the type ` +
      type +
      `.
        We are ` +
      this.state.hospitalFullName +
      ` and we would like to ...`;
  }
  editAcct(e) {
    let body1 = document.getElementById("body3");
    let body2 = document.getElementById("body4");
    body1.style = "display:none";
    body2.style = "display:block";
    let emil = HospitalProfile.getEmil();

    let getString = "http://localhost:8000/hospitals/" + emil;
    axios.get(getString).then(res => {
      const hospitalInfo = res.data;
      // this.setState({ donations: donations });
      this.setState({
        hospitalFullName: hospitalInfo.name,
        hospitalEmail: hospitalInfo.email,
        hospitalCity: hospitalInfo.city,
        hospitalPassword: hospitalInfo.password
      });
    });
  }

  search(e) {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query

    let e2 = document.getElementById("sel1");
    let columnIndex = e2.options[e2.selectedIndex].value;
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[columnIndex];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  sortTable(n, e) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");

      /* Loop through all table rows (except the
        first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
            one from current row and one from the next: */

        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
        if (dir === "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  logout(e) {
    HospitalProfile.signout();
    this.props.history.push("/hospitalRegister");
  }

  cancel(e) {
    let body1 = document.getElementById("body3");
    let body2 = document.getElementById("body4");
    body1.style = "display:block";
    body2.style = "display:none";
  }

  delete(e) {
    let cancelBtn = document.getElementById("cancelBtn");
    let confirmBtn = document.getElementById("confirmBtn");
    let deleteBtn = document.getElementById("deleteBtn");

    cancelBtn.style = "display:block";
    confirmBtn.style = "display:block";
    deleteBtn.style = "display:none";
  }

  cancelDelete(e) {
    let cancelBtn = document.getElementById("cancelBtn");
    let confirmBtn = document.getElementById("confirmBtn");
    let deleteBtn = document.getElementById("deleteBtn");

    cancelBtn.style = "display:none";
    confirmBtn.style = "display:none";
    deleteBtn.style = "display:block";
  }

  confirmDelete(e) {
    let email = this.state.hospitalEmail;
    var postString = "http://localhost:8000/hospitals/" + email;

    axios.delete(postString, {}).then(result => {
      this.componentDidMount();
    });
    this.logout();
  }

  render() {
    return (
      <div>
        <div id="body3">
          <header>Hospitals Site</header>
          <div id="fullBox3">
            <h2>Welcome!</h2>
            <div id="divideBtns">
              <input
                type="button"
                value="Edit my account"
                className="btn btn-outline-dark btn-block form-control halfBtn"
                onClick={this.editAcct.bind(this)}
              />
              <input
                type="button"
                value="Logout"
                className="btn btn-outline-dark btn-block form-control halfBtn"
                onClick={this.logout.bind(this)}
              />
            </div>

            <h6>Click on a donation to send an email to the donor:</h6>
            <div id="searchBox">
              <input
                type="text"
                id="myInput"
                className="form-control"
                onKeyUp={this.search.bind(this)}
                placeholder="Search.."
              />
              <div id="options" className="form-group">
                <select className="form-control" id="sel1">
                  <option value="0">ID</option>
                  <option value="1">Type</option>
                  <option value="2">Notes</option>
                  <option value="3">Gender</option>
                  <option value="4">Email</option>
                  <option value="5">Age</option>
                  <option value="6">City</option>
                </select>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table id="myTable" className="table">
                <thead className="thead-dark">
                  <tr>
                    <th onClick={() => this.sortTable(0)} scope="col">
                      ID
                    </th>
                    <th onClick={() => this.sortTable(1)} scope="col">
                      Type
                    </th>
                    <th onClick={() => this.sortTable(2)} scope="col">
                      Notes
                    </th>
                    <th onClick={() => this.sortTable(3)} scope="col">
                      Gender
                    </th>
                    <th onClick={() => this.sortTable(4)} scope="col">
                      Email
                    </th>
                    <th onClick={() => this.sortTable(5)} scope="col">
                      Age
                    </th>
                    <th onClick={() => this.sortTable(6)} scope="col">
                      City
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.donations.map(donation => (
                    <tr
                      onClick={this.donorClicked.bind(this)}
                      key={donation.id}
                    >
                      <td>
                        <b>{donation.id}</b>
                      </td>
                      <td>{donation.type}</td>
                      <td>{donation.notes}</td>
                      <td>{donation.gender}</td>
                      <td>{donation.email}</td>
                      <td>{donation.age}</td>
                      <td>{donation.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div id="body4">
          <header>Hospitals Site</header>
          <div id="regBox2">
            <h5>Edit My Account:</h5>
            <form
              className="form-signin"
              onSubmit={this.onSubmitUpdateHospital}
              id="hideform"
            >
              <div className="input-group">
                <input
                  type="text"
                  name="hospitalFullName"
                  value={this.state.hospitalFullName}
                  className="form-control"
                  placeholder="Hospital Full Name"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="hospitalEmail"
                  value={this.state.hospitalEmail}
                  className="form-control"
                  placeholder="Admin Email"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="hospitalCity"
                  value={this.state.hospitalCity}
                  className="form-control"
                  placeholder="City"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  name="hospitalPassword"
                  value={this.state.hospitalPassword}
                  className="form-control"
                  placeholder="Password"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="submit"
                  value="Confirm"
                  className="btn btn-lg btn-light btn-block form-control"
                  name="add"
                />
              </div>
              <div className="input-group">
                <input
                  type="button"
                  value="Cancel"
                  className="btn btn-lg btn-light btn-block form-control"
                  name="cancel"
                  onClick={this.cancel.bind(this)}
                />
              </div>
              <input
                type="button"
                value="Delete The Account"
                id="deleteBtn"
                className="btn btn-lg btn-danger btn-block form-control"
                onClick={this.delete.bind(this)}
              />
              <div id="divideBtns">
                <input
                  type="button"
                  value="Delete"
                  id="confirmBtn"
                  className="btn btn-lg btn-danger btn-block form-control halfBtn"
                  onClick={this.confirmDelete.bind(this)}
                />
                <input
                  type="button"
                  value="Cancel"
                  id="cancelBtn"
                  className="btn btn-lg btn-light btn-block form-control halfBtn"
                  onClick={this.cancelDelete.bind(this)}
                />{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(loggedInHospital);
