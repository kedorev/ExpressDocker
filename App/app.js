var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var router = express.Router();

var index = require('./routes/index');
var users = require('./routes/users');
var list = require('./routes/liste');
var privateSection = require('./routes/privateSection');

var app = express();

//static file
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(serveStatic(path.join(__dirname, 'db')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.set('twig options', {
    strict_variables: false
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('*', (req,res,next) => {
    const minMin = 49;
    const minMax = 59;
    const minCurrent = new Date().getMinutes();
    if(minCurrent >= minMin && minCurrent <= minMax)
    {
        var err = new Error('Server busy');
        err.status = 509;
        next(err);
    }
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/list', list);
app.use('/private', privateSection);



// catch 404 and forward to error handler
app.use('*',function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
    console.log('erreor');
  res.status(err.status || 500);
  res.render('error');


});

module.exports = app;
