'use strict';

var winston = require('winston');
require('./index');

var transport = new winston.transports.DailyRotateFile({
  name: 'jsonlogger',
  filename: './log',
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  timestamp: false,
  level: process.env.ENV === 'development' ? 'debug' : 'info'
});

var transport1 = new winston.transports.DailyRotateFile({
  filename: 'logs/-json.log',
  name: 'jsonlogger',
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  level: process.env.ENV === 'development' ? 'debug' : 'info'
});

var transport2 = new winston.transports.DailyRotateFile({
  filename: 'logs/-pretty.log',
  name: 'prettylogger',
  datePattern: 'yyyy-MM-dd.',
  json: false,
  prepend: true,
  level: process.env.ENV === 'development' ? 'debug' : 'info'
});

var logger = new (winston.Logger)({
  transports: [
    transport, transport1, transport2
  ]
});

logger.info('Hello World!');
