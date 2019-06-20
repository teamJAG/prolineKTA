const express = require("express");
const router = express.Router();
const passport = require("passport");

const keysAPI = require("../controllers/keysApi");
const reportsAPI = require("../controllers/reportsApi");
const propertyAPI = require("../controllers/propertyApi");
const recordsAPI = require("../controllers/recordsApi");
const usersAPI = require("../controllers/usersApi");

//Login LDAP authentication
router
  .route("/login")
  .post(passport.authenticate('ldapauth', {session: false}), function(req, res) {
    res.send({status: 'ok'})
  });

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
