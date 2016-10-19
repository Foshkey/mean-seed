let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let logger = require('./logger');
let routes = require('./routes/index');

let app = express();

// view engine setup
const viewEngine = 'hbs';
logger.debug(`Using view engine: ${viewEngine}`);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', viewEngine);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
logger.debug('Overriding express logger');
let morganFormat = {
  remoteAddr: ':remote-addr',
  remoteUser: ':remote-user',
  method: ':method',
  url: ':url',
  httpVersion: ':http-version',
  status: ':status',
  resultLength: ':res[content-length]',
  referrer: ':referrer',
  userAgent: ':user-agent',
  responseTime: ':response-time'
};
app.use(morgan(JSON.stringify(morganFormat), { stream: logger.morganStream }));

logger.debug('Setting up bodyParser & cookieParser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// static path
const staticPath = path.join(__dirname, 'public');
logger.debug(`Static path used: ${staticPath}`)
app.use(express.static(staticPath));

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    logger.error(err.message, err);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  logger.error(err.message, err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
