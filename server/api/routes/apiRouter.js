const express = require('express');
const router = express.Router();
const passport = require('passport');

//may use local auth strategy instead
LdapStrategy = require('passport-ldapauth');

const keysAPI = require('../controllers/keysApi');
const historyAPI = require('../controllers/historyApi');
const propertyAPI = require('../controllers/propertyApi');

//may be refactored
const usersAPI = require('../controllers/usersApi');

const OPTS = {
    server: {
        url: 'ldap://localhost:389',
        bindDN: 'cn=root',
        bindCredentials: 'secret',
        searchBase: 'ou=passport-ldapauth',
        searchFilter: '(uid={{username}}'
    }
};

router
.route("/property")
.get(propertyAPI.listProperty)
.put(propertyAPI.updateProperty)
.post(propertyAPI.createProperty)
.delete(propertyAPI.deleteProperty);

router
.route("/keys")
.get()
.put(keysAPI.toggleKeyStatus)
.post(keysAPI.listKeys)
// .delete();

// router
// .route("/users")
// .get()
// .put()
// .post()
// .delete();

// router
// .route("/history")
// .get()
// .post()
// .delete();

module.exports = router;