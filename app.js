var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//session
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var callRouter = require('./routes/call');
var app = express();

//session api
app.use(session({
  secret: 'CRS', // Change this to a strong, random string
  resave: false,
  saveUninitialized: true,
}));
app.post('/submit_userlogin', (req, res) => {
  // Authenticate the user and get their user data
  var user =  pool.query("select ID, uname,phone from usertbl where  ID=? and password=?", [req.body.ID,  req.body.password], function (error, result) {

  if (user) {
    console.log(error)
      // Store user data in the session
      req.session.userId = user.ID;
      req.session.username = user.uname;
      req.session.userphone = user.phone;
      res.redirect('/booking'); // Redirect to the user's dashboard or home page
  } else {
    console.log(error)
      res.send('Invalid username or password');
  }
})
})

app.get('/home', (req, res) => {
  if (req.session.user) {
    console.log(error)
      // User is logged in, you can access their data
      const userId = req.session.user;

      // Render the dashboard or home page with the user's data
      res.render('home', { user });
  } else {
    console.log(error)
      // User is not logged in, redirect to the login page
      res.redirect('/registration');
  }
});

app.get('/booking', (req, res) => {
  if (req.session.userId) {
    console.log(error)
      // User is logged in; autofill the booking form
      res.render('booking', {
          cname: req.session.username,
          mob: req.session.userphone,
      });
  } else {
    console.log(error)
      // User is not logged in, redirect to the login page
      res.redirect('/registration');
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/call', callRouter);
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
