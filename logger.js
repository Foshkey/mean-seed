let fs = require('fs');
let winston = require('winston');
winston.emitErrs = true;

const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

let logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      name: 'info-file',
      level: 'info',
      filename: `./${logDir}/info-logs.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      colorize: false
    }),
    new winston.transports.File({
      name: 'error-file',
      level: 'error',
      filename: `./${logDir}/error-logs.log`,
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