/* eslint-disable */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoDBStore = require('connect-mongodb-session')(session);
var seedDbUser = require('./seedDbUser');
var seedDb = require('./seedDb');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
//
var env = require('./config');
var app = express();

// Mongoose start
let connect_main = '';
let connect_session = '';
if (env.NODE_ENV !== 'production') {
  connect_main = `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
  connect_session = `mongodb://${env.DB_HOST}:${env.DB_PORT}/connect_mongodb_session`;
}

// Connect
mongoose.connect(connect_main, { useNewUrlParser: true });

// Fix mongoose upgrade warnings
mongoose.set('useFindAndModify', false);

var db = mongoose.connection;
db.on('error', function(){
  console.log('# MongoDB - connection error: ');
});

db.on('connected', function(){
  if (env.NODE_ENV !== 'production') {
    console.log(`# MongoDB - connected to: ${env.DB_NAME}`);
  }
  if (env.SEED_DB === 'true') {
    seedDbUser({name: env.USERNAME, password: env.PASSWORD});
    seedDb();
  }
});

var store = new MongoDBStore({
  uri: connect_session,
  collection: 'mySessions'
});

store.on('connected', function() {
  store.client;
});

// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

app.use(session({
  secret: env.COOKIE_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2 days
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
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
  res.render('error');
});

module.exports = app;
