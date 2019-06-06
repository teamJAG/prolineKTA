const express = require('express');
const router = express.Router();
const passport = require('passport');

//may use local auth strategy instead
LdapStrategy = require('passport-ldapauth');

const keysAPI = require('../controllers/keysApi');
const historyAPI = require('../controllers/historyApi');
const propertyAPI = require('../controllers/propertyApi');
const recordsAPI = require('../controllers/recordsApi');

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
.put(propertyAPI.updateProperty)
.post(propertyAPI.createProperty);

router
.route("/keys")
.post(keysAPI.createKey)
.put(keysAPI.toggleKeyStatus);

router
.route("/records")
.post(recordsAPI.listRecords);

router
.route("/");

module.exports = router;