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
    url: "ldap://localhost:389",
    bindDN: "cn=root",
    bindCredentials: "secret",
    searchBase: "ou=passport-ldapauth",
    searchFilter: "(uid={{username}}"
  }
};

router
  .route("/search")
  .post(recordsAPI.getSearchOptions);

router
  .route("/propertyrecord")
  .post(propertyAPI.createProperty)
  .put(propertyAPI.updateProperty);

router
  .route("/keystatus")
  .post(keysAPI.getKeyStatus)
  .put(keysAPI.switchKeyStatus);

router
  .route("/keycheck")
  .post(keysAPI.checkKeyOut)
  .put(keysAPI.checkKeyIn);

router
  .route("/keyrecord")
  .post(keysAPI.createKey)
  .put(keysAPI.updateKey);

router
  .route("/reports")
  .get(reportsAPI.generateReport)
  .post(reportsAPI.getReport);

router
  .route("/records")
  .post(recordsAPI.listRecords);

router
  .route("/contractors")
  .post(usersAPI.createContractor)
  .put(usersAPI.updateContractor);

module.exports = router;
