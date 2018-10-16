/* 
 To set the console errors in a separate file
 */
var logger = require('logger.js');

var messageLogger = {
    successLog: function(settings) {
        settings = (settings || {});
        this.logType = (settings.logType || "info");
        this.message = (settings.logType || "info");
    }
}

module.exports = messageLogger;
