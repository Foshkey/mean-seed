let winston = require('winston');
winston.emitErrs = true;

let logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'info-file',
      level: 'info',
      filename: './logs/info-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      colorize: false
    }),
    new winston.transports.File({
      name: 'error-file',
      level: 'error',
      filename: './logs/error-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      formatter: log => `${winston.config.colorize(log.level)} ${log.message}`
    })
  ],
  exitOnError: false
});

logger.morganStream = {
  write: (message, encoding) => {
    let log = JSON.parse(message);
    logger.info(`${log.method} ${log.url} ${log.status} ${log.responseTime} ms`, log);
  }
};

module.exports = logger;