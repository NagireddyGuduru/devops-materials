/* 
 * This module is to handle the users router
 * 
 * @type Router
 */

var express = require('express');
var _ = require('lodash');
var CryptoJS = require("crypto-js");
var connectionConfig = require('../../customModules/common/connectionConfig.js');
var logger = new (require('../../utilityModule/logger/logger.js'));
var router = express.Router();
var environment = connectionConfig;
var client = environment.getcassandraDBConnectionReady();
var config = require('config');
var logMessage = require('../../utilityModule/common/commonFunctions.js');

var resStatus = config.HTTP_Status;
var logLevel = config.logLevel;
var operationType = config.operationType;
/**
 * To get list of users
 * 
 */
router.get('/', function(req, res) {
    var query = "SELECT userid,createddate,designation,fullname,orgids,locked FROM users";
    logger.log(logLevel.info, 'User Get Method.');
    client.execute(query, function(err, result) {
        if (err) {
            logMessage.failedMessage(res, operationType.get, "User", "Error fetching users");
            res.end();
        } else {
            logMessage.successMessage(res, operationType.get, "User", result.rows);
        }
    });
});

/**
 * To get user by userid
 * 
 */
router.get('/:userid', function(req, res) {

    var userid = req.params.userid;
    var query = "SELECT userid,createddate,designation,fullname,orgids,locked FROM users WHERE userid='" + userid + "'";
    logger.log(logLevel.info, 'User Get Method.');
    client.execute(query, function(err, result) {
        if (err) {
            logMessage.failedMessage(res, operationType.get, "User", "Error fetching user");
            res.end();
        } else {
            logMessage.successMessage(res, operationType.get, "User", result.rows);
        }
    });
});

/**
 * To authenticate a user by user name
 * 
 * password passed in header as hash
 */
router.post('/:userid/authenticate', function(req, res) {
    var userid = req.params.userid;
    var appid = req.headers['x-appid'];

    var appkey = _.find(config.appKeys, {'appid': appid});
    
    var bytes  = CryptoJS.AES.decrypt(req.body.password, 'secret key 123');
    var password = bytes.toString(CryptoJS.enc.Utf8);

    var query = "SELECT userid,createddate,designation,fullname,orgids,locked FROM users WHERE userid='" + userid + "'";
    logger.log(logLevel.info, 'User Post authenticate Method');
    client.execute(query, function(err, result) {
        if (err) {
            logMessage.failedMessage(res, operationType.post, "ERR: User-authenticate", "Invalid User");
        } else {
            if (result.rows.length) {
                var user = result.rows[0];                          
                if (user.userid === userid) {
                    console.log("user", result.rows[0]);
                    result.rows[0]['token'] = req.headers['x-token'];
                    result.rows[0]['timestamp'] = req.headers['x-timestamp'];
                    logMessage.successMessage(res, operationType.post, "User-authenticate", result.rows);
                } else {
                    logMessage.failedMessage(res, operationType.post, "User-authenticate", "Invalid User");
                }
            } else {
                logMessage.failedMessage(res, operationType.post, "User-authenticate", "Invalid User");
            }
        }
    });
});

/**
 * This route inserts users data into database
 * 
 * @argument json
 */
router.post('/', function(req, res) {
    logger.log(logLevel.info, 'POST User operation Started!');
    if (req.body && req.body.length > 0) {
        var insertCount = 0, failedCount = 0, totalCount = req.body.length;
        for (var i = 0; i < req.body.length; i++) {

            var password = req.body[i].userid + "" + req.body[i].password;
            req.body[i].password = new Buffer(password || '').toString('base64');

            var dataStr = JSON.stringify(req.body[i]);
            var query = "INSERT INTO users JSON '" + dataStr + "'";

            client.execute(query, function(err, result) {
                if (err) {
                    failedCount += 1;
                    handleCompletionStatus(insertCount, failedCount, totalCount, res);
                } else {
                    insertCount += 1;
                    handleCompletionStatus(insertCount, failedCount, totalCount, res);
                }
            });
        }
    } else {
        logMessage.badInputMessage(res, operationType.post, "User", "Bad input parameter!");
        res.end();
    }
});

/**
 * This api updates one user
 * 
 * @argument json
 */
router.put('/', function(req, res) {
    logger.log(logLevel.info, 'Put User operation Started!');
    if (req.body && req.body.length > 0 && req.query.userid) {
        var user = req.body[0];
        var userid = req.query.userid;
        var insertCount = 0, failedCount = 0, totalCount = 1;
        var query = "UPDATE users SET ";

        var queryParams = [];

        if (user.fullname) {
            queryParams.push("fullname='" + user.fullname + "'");
        }

        if (user.password) {
            var password = userid + "" + user.password;
            var newpassword = new Buffer(password || '').toString('base64');
            // query += ", password='" + newpassword + "'";
            queryParams.push("password='" + newpassword + "'");
        }
        if (user.designation) {
            // query += ", designation = '" + user.designation + "'";
            queryParams.push("designation = '" + user.designation + "'");
        }
        if (user.locked) {
            // query += ", locked = '" + user.locked + "'";
            queryParams.push("locked = '" + user.locked + "'");
        }
        if (user.orgids) {
            // query += ", orgids = fromJson('" + JSON.stringify(user.orgids) + "')"
            queryParams.push("orgids = fromJson('" + JSON.stringify(user.orgids) + "')");
        }
        if (queryParams.length > 0) {
            query += queryParams.join(",") + " Where userid = '" + userid + "'";
            client.execute(query, function(err, result) {
                if (err) {
                    failedCount += 1;
                    handleCompletionStatus(insertCount, failedCount, totalCount, res);
                } else {
                    insertCount += 1;
                    handleCompletionStatus(insertCount, failedCount, totalCount, res);
                }
            });
        } else {
            logger.log(logLevel.error, 'POST User :: Bad input parameter!');
        }

        // client.execute(query, function(err, result) {
        //     if (err) {
        //         failedCount += 1;
        //         handleCompletionStatus(insertCount, failedCount, totalCount, res);
        //     } else {
        //         insertCount += 1;
        //         handleCompletionStatus(insertCount, failedCount, totalCount, res);
        //     }
        // });
    } else {
        logger.log(logLevel.error, 'POST User :: Bad input parameter!');
        res.status(resStatus.code_400.code).send({
            "message": resStatus.code_400.message,
            statusCode: resStatus.code_400.code
        });
        res.end();
    }
});

/**
 * function to handle response
 * 
 * @param {*} insertCount 
 * @param {*} failedCount 
 * @param {*} totalCount 
 * @param {*} res 
 */

function handleCompletionStatus(insertCount, failedCount, totalCount, res) {

    var count = (insertCount + failedCount);
    if (totalCount === count) {
        var resParams = {
            "statusCode": '',
            "message": "",
            "totalRecord": totalCount,
            "insertedRecords": insertCount,
            "failedRecords": failedCount
        }
        if (failedCount == totalCount) {
            logger.log(logLevel.info, "Post User Record/s insertions failed! ::  TotalRecord:" + totalCount + " InsertCount: " + insertCount + " FailedCount:" + failedCount);
            resParams.statusCode = resStatus.code_400.code;
            resParams.message = "Record/s Insertion failed!";
        } else {
            logger.log(logLevel.info, "Post User Record/s have been added successfully! ::  TotalRecord:" + totalCount + " InsertCount: " + insertCount + " FailedCount:" + failedCount);
            resParams.message = "Record/s have been added successfully!";
            resParams.statusCode = resStatus.code_200.code;
        }
        res.status(resParams.statusCode).send(resParams);
        res.end();
    }

}

/**
 * 
 * @type @exp;router
 */
module.exports = router;
