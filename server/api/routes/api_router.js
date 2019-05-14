const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');

//may use local auth strategy instead
LdapStrategy = require('passport-ldapauth');

const printerAPI = require('../controllers/printer');
const scannerAPI = require('../controllers/scanner');

//may be refactored
const usersAPI = require('../controllers/users');

const OPTS = {
    server: {
        url: 'ldap://localhost:389',
        bindDN: 'cn=root',
        bindCredentials: 'secret',
        searchBase: 'ou=passport-ldapauth',
        searchFilter: '(uid={{username}}'
    }
};