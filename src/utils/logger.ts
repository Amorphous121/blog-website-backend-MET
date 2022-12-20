import fs from 'fs';
import path from 'path';
import Winston from 'winston';
import WinstonDaily from 'winston-daily-rotate-file';

import CONFIG from 'config';

type logLevel = 'error' | 'info' | 'debug';
const logFormat = Winston.format.printf(
  ({ timestamp, level, message }: { [key: string]: string }) => `${timestamp} ${level} ${message}`
);
const logDirPath = path.join(__dirname, CONFIG.LOG_DIR);

if (!fs.existsSync(logDirPath)) {
  fs.mkdirSync(logDirPath);
}

const getWinstonRotatingFileLogger = (logLevel: logLevel): WinstonDaily =>
  new WinstonDaily({
    filename: '%DATE%.log',
    level: logLevel,
    datePattern: 'YYYY-MM-DD',
    dirname: logDirPath + `/${logLevel}`,
    maxFiles: '30',
    maxSize: '20m',
    json: false,
    handleExceptions: true,
    zippedArchive: true
  });

const getWinstonConsoleLogger = (logLevel: logLevel): Winston.transports.ConsoleTransportInstance =>
  new Winston.transports.Console({
    level: logLevel,
    format: Winston.format.combine(Winston.format.splat(), Winston.format.colorize())
  });

const logger = Winston.createLogger({
  format: Winston.format.combine(
    Winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    Winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    getWinstonConsoleLogger('info'),
    // getWinstonConsoleLogger('error'),
    // getWinstonConsoleLogger('debug'),
    getWinstonRotatingFileLogger('info'),
    getWinstonRotatingFileLogger('error')
  ]
});

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
};

export { logger, stream };
