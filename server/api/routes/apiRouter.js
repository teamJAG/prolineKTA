const express = require("express");
const router = express.Router();
const passport = require("passport");

//may use local auth strategy instead
LdapStrategy = require("passport-ldapauth");

const keysAPI = require("../controllers/keysApi");
const reportsAPI = require("../controllers/reportsApi");
const propertyAPI = require("../controllers/propertyApi");
const recordsAPI = require("../controllers/recordsApi");
const usersAPI = require("../controllers/usersApi");

const OPTS = {
  server: {
    url: "ldap://192.168.1.3:389",
    bindDN: "cn=root",
    bindCredentials: "secret",
    searchBase: "ou=passport-ldapauth",
    searchFilter: "(uid={{username}}"
  }
};

//Dynamic search component calls
router
  .route("/search")
  .post(recordsAPI.getSearchOptions);

//Request a key
router
  .route("/keystatus")
  .post(keysAPI.getKeyStatus)
  .put(keysAPI.switchKeyStatus);

//Checkout and Checkin process
router
  .route("/keycheck")
  .post(keysAPI.checkKeyOut)
  .put(keysAPI.checkKeyIn);

//Create and modify keys
router
  .route("/keyrecord")
  .post(keysAPI.createKey)
  .put(keysAPI.updateKey);

//Create and modify properties
router
.route("/propertyrecord")
.post(propertyAPI.createProperty)
.put(propertyAPI.updateProperty);

//Create and modify contractor records
router
  .route("/contractors")
  .post(usersAPI.createContractor)
  .put(usersAPI.updateContractor);

//Generate reports
router
  .route("/reports")
  .get(reportsAPI.generateReport)
  .post(reportsAPI.getReport);

//Get records for the data table
router
  .route("/records")
  .post(recordsAPI.listRecords);

module.exports = router;
