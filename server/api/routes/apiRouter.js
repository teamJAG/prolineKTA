const express = require("express");
const router = express.Router();
const passport = require("passport");

//may use local auth strategy instead
LdapStrategy = require("passport-ldapauth");

const keysAPI = require("../controllers/keysApi");
const historyAPI = require("../controllers/historyApi");
const propertyAPI = require("../controllers/propertyApi");
const recordsAPI = require("../controllers/recordsApi");

//may be refactored
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
  .route("/fullreport")
  .get(historyAPI.generateReport);

router
  .route("/records")
  .post(recordsAPI.listRecords);

router
  .route("/contractorrecord")
  .post(usersAPI.createContractor)
  .put(usersAPI.updateContractor);

module.exports = router;
