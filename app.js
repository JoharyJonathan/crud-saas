var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var bodyparser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var authRouter = require('./routes/auth');
var productsRouter = require('./routes/products');
var rolesRouter = require('./routes/roles');

var app = express();

// .env
dotenv.config();

// Override method
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

// DB Middleware
const db = require('./middleware/dbMiddleware');

app.use(db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Global middleware
const attachUser = require('./middleware/attachUser');

app.use(attachUser);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/roles', rolesRouter);

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