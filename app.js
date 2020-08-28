var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var open = require('open');
var CASAuthentication = require('node-cas-authentication');
//var dashboard = require('startbootstrap-sb-admin');
var cas = new CASAuthentication({
    cas_url     : 'https://hadtech-cas.tk/cas',
    service_url : 'https://node-cas.herokuapp.com'
}); 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/login', loginRouter);
// catch 404 and forward to error handler

//var app1 = require('express')();
var session = require('express-session');
var CASAuthentication = require('node-cas-authentication');
//const app = require('../app');
app.use( session({
    secret            : 'super secret key',
    resave            : false,
    saveUninitialized : true
}));
var cas = new CASAuthentication({
    cas_url     : 'https://hadtech-cas.tk/cas',
    service_url : 'https://node-cas.herokuapp.com'
}); 
app.get('/login', cas.bounce, function ( req, res ) {
    res.open( 'http://urltodirect.to', function (err) {
        if ( err ) throw err;    
      });
});
 
// Unauthenticated clients will receive a 401 Unauthorized response instead of
// the JSON data.
app.get('/api', cas.block, function ( req, res ) {
    res.json( { success: true } );
});
 
// An example of accessing the CAS user session variable. This could be used to
// retrieve your own local user records based on authenticated CAS username.
app.get('/api/user', cas.block, function ( req, res ) {
    res.json( { cas_user: req.session[ cas.session_name ] } );
});
 
// Unauthenticated clients will be redirected to the CAS login and then to the
// provided "redirectTo" query parameter once authenticated.
app.get('/authenticate', cas.bounce_redirect );
 
// This route will de-authenticate the client with the Express server and then
// redirect the client to the CAS logout page.
app.get('/logout', cas.logout );
//var app = require('express')();

// Set up an Express session, which is required for CASAuthentication.

 
// Create a new instance of CASAuthentication.
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
  res.render('error');
});
 
// Unauthenticated clients will be redirected to the CAS login and then back to
// this route once authenticated.

module.exports = app;
