var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
//日志
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//获取用户从浏览器上的请求信息

var router = require('./routes/index');
// var users = require('./routes/users');
// var comment = require('./routes/comment');

//session
var session = require('express-session');
var app = express();

// view engine setup 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//约束前端给后端返回的数据
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'recomend 128 bytes random string',
  cookie:{maxAge:20*60*1000},
  resave:true,
  saveUninitialized:true
}))

 app.use('/', router);
// app.use('/users', users);
// app.use('/comment',comment);
//session 设置

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
