const express = require('express');
const router = express.Router();
const passport = require('passport');

//may use local auth strategy instead
LdapStrategy = require('passport-ldapauth');

const keysAPI = require('../controllers/keysApi');

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
.get
.put
.post
.delete

.route("/keys")
.get
.put(keysAPI.checkKey)
.post
.delete

route.route("/users")
.get
.put
.post
.delete

route.route("/history")
.get
.post
.delete