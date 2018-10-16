/**
 * Common functions
 * 
 */

var logger = new (require('../logger/logger.js'));
var config = require('config');
var resStatus = config.HTTP_Status;
var logLevel = config.logLevel;

var logMessage = {
    /**
     * message for succeeded operation
     * 
     * @param res response
     * @param operationType GET | POST | PUT
     * @param module name of module calling this
     * @param message text
     */
    successMessage: function(res, operationType, module, data) {
        if (data.length == 0) {
            res.status(resStatus.code_600.code).send({
                "message": module + " > " + resStatus.code_600.message,
                statusCode: resStatus.code_600.code
            });
            logger.log(logLevel.error, operationType + " " + module + " Failed!");
        } else {
            logger.log(logLevel.info, operationType + " " + module + " succeeded! " + "UserId: " + " " + ' Data: ' + JSON.stringify(data));
            res.status(resStatus.code_200.code).send(data);
        }
    },
    /**
     * message for failed operation
     * 
     * @param res response
     * @param operationType GET | POST | PUT
     * @param module name of module calling this
     * @param message text
     */
    failedMessage: function(res, operationType, module, message) {
        logger.log(logLevel.info, operationType + " " + module + " succeeded! " + "UserId: " + " " + ' Data: ' + JSON.stringify(message));
        res.status(resStatus.code_500.code).send(
          {
              "message": resStatus.code_500.message + ' > ' + message,
              statusCode: resStatus.code_500.code
          });
    },
    /**
     * message for bad input parameter
     * 
     * @param res response
     * @param operationType GET | POST | PUT
     * @param module name of module calling this
     * @param message text
     */
    badInputMessage: function(res, operationType, module, message) {
        logger.log(logLevel.error, operationType + " " + module + " > " + message);
        res.status(resStatus.code_400.code).send({
            "message": resStatus.code_400.message,
            statusCode: resStatus.code_400.code
        });
    },
    /**
     * 
     * @param {type} res
     * @param {type} fnName
     * @param {type} module
     * @param {type} message
     * @returns {undefined}
     */
    logStep: function(res, logType, fnName, module, message) {
        logger.log(logType, fnName + " " + module + " > " + message);
    },
    /**
     * 
     * @param {type} res
     * @param {type} fnName
     * @param {type} module
     * @param {type} message
     * @returns {undefined}
     */
    logFailedStep: function(res, fnName, module, message) {
        logger.log(logLevel.error, fnName + " " + module + " > " + message);
    }
}

module.exports = logMessage;