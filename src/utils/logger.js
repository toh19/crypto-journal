const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'crypto-journal' },
  transports: [
    // Write all logs with level `error` and below to `error.log`
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Write all logs with level `info` and below to `combined.log`
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

// If we're not in production, log to the `console` with the format:
// `${info.level}: ${info.timestamp}: ${info.message} JSON.stringify({ ...rest })`
if (process.env.NODE_ENV !== 'prod') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = logger;
