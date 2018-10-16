/* 
 To set the console errors in a separate file
 */

var winston = require('winston');
require('winston-daily-rotate-file');
var logger = null;
function loggerConfig() {
    //
// Create a new winston logger instance with two tranports: Console, and File
//
//
//    var logger = new (winston.Logger)({
//        transports: [
//            new (winston.transports.Console)(),
//            new (winston.transports.File)({filename: 'APIlogs.log'})
//        ]
//    });
//    logger.configure({
//        level: 'verbose',
//        transports: [
//            new (require('winston-daily-rotate-file'))(opts)
//        ]
//    });

    if (logger !== null) {
        return logger;
    }

    var transport = new winston.transports.DailyRotateFile({
        filename: './logs/DevOpsLogs.log',
        datePattern: '.yyyy-MM-dd',
        prepend: true

    });

    logger = new (winston.Logger)({
        transports: [
            transport,
            new (winston.transports.Console)({colorize: true})
        ]
    });
    //Example : 
    //logger.log('info', 'This is an information message.');
    //logger.log('error', 'This is an information message.');

    return logger;
}

module.exports = loggerConfig;
