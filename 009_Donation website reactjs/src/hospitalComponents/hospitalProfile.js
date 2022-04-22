import axios from "axios";

let HospitalProfile = (function () {
  function setEm(name) {
    let getString = "http://localhost:8000/hospitals/" + name;
    axios.get(getString).then(res => {
      localStorage.setItem("emHospital", res.data.id);
      localStorage.setItem("emilHospital", name);
    });
  }

  function getEm() {
    return localStorage.getItem("emHospital");
  }

  function getEmil() {
    return localStorage.getItem("emilHospital");
  }

  function authenticate() {
    localStorage.setItem("authenticateHospital", "true");
  }

  function signout() {
    localStorage.setItem("authenticateHospital", "false");
  }

  function isAuthenticated() {
    return "true" === localStorage.getItem("authenticateHospital");
  }

  return {
    getEm: getEm,
    setEm: setEm,
    getEmil: getEmil,
    authenticate: authenticate,
    signout: signout,
    isAuthenticated: isAuthenticated
  };
})();

export default HospitalProfile;
