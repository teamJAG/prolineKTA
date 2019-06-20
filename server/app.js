require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');
var apiRouter = require('./api/routes/apiRouter');
var ldapStrategy = require('passport-ldapauth');

// var getLDAPConfiguration = function (req, callback) {
//   process.nextTick(function () {
//     var opts = {
//       server: {
//         url: ldapurl,
//         bindDn: `uid=${req.body.username},${dn}`,
//         bindCredentials: `${req.body.password}`,
//         searchBase: dn,
//         searchFilter: `uid=${req.body.username}`,
//         reconnect: true
//       }
//     };
//     callback(null, opts);
//   });
// };

// passport.use(new LdapStrategy(getLDAPConfiguration,
//   function (user, done) {
//     winston.info("LDAP user ", user.displayName, "is logged in.")
//     return done(null, user);
//   }))

// passport.serializeUser(function (user, done) {
//   done(null, user.uid)
// })
// passport.deserializeUser(function (id, done) {
//   User.findOne({ uid: id }).exec()
//     .then(user => {
//       if (!user) {
//         done(new Error(`Cannot find user with uid=${id}`))
//       } else {
//         done(null, user)
//       }
//     })
// })

const OPTS = {
  server: {
    url: "ldap://192.168.1.3:389",
    bindDN: "cn=<admin username>",
    bindCredentials: "<admin password>",
    searchBase: "ou=passport-ldapauth",
    searchFilter: "(uid={{username}}"
  }
};

var app = express();
passport.use(new ldapStrategy(OPTS));
app.use(passport.initialize());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error : err.status});
});

module.exports = app;
