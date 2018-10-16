/**
 * Dev Configuration
 */
'use strict';

// Dev specific configuration
var constants = {
    staticMessages: {
        dataBase: {
            connectionFailed: "DB Connection Failed!",
            conectionSuccess: "DB Connection Success!",
            shutDownMsg: "DB is not running!",
            startUpMsg: "DB is running!"
        },
        // operations constants
        operations: {
            getSuccess: "Successfully fetched data!",
            getFailed: "Error fetching data!",
            postSuccess: "Posted <data> successfully!",
            postFailed: "Error posting <data>!",
            putSuccess: "Updated <data> successfully!",
            putFailed: "Error updating <data>!"
        }
    }
};

module.exports = constants;
