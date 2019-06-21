const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require('passport-local');
const db = require('../db/connection');

const keysAPI = require("../controllers/keysApi");
const reportsAPI = require("../controllers/reportsApi");
const propertyAPI = require("../controllers/propertyApi");
const recordsAPI = require("../controllers/recordsApi");
const usersAPI = require("../controllers/usersApi");

//Set up passport to authenticate with the local user table in database
passport.use(new LocalStrategy( 
  async function(username, password, done) {
    try {
      const rows = await db.dbQuery(`SELECT * FROM proline.users_tab WHERE username = '${username}'`);
      if (!rows.length) return done(null, false);
      if (rows[0].password !== password) return done(null, false);
      return done(null, rows[0]);
    } catch(err) {
      return done(err);
    }
  }
));

//Set up passport to authenticate using LDAP authentication

//Login using local authentication
router
  .route("/login")
  .post(passport.authenticate('local', {session: false}), usersAPI.login);

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
