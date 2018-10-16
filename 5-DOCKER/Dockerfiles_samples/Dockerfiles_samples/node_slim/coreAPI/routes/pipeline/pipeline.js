/* 
 * This module is to handle the pipelines router
 * 
 * @type Router
 */

var express = require('express');
var config = require('config');

var connectionConfig = require('../../customModules/common/connectionConfig.js');
var router = express.Router();
var environment = connectionConfig;
var client = environment.getcassandraDBConnectionReady();
var logger = new (require('../../utilityModule/logger/logger.js'));
var logMessage = require('../../utilityModule/common/commonFunctions.js');


var logLevel = config.logLevel;
var resStatus = config.HTTP_Status;
var operationType = config.operationType;
/**
 * To get list of pipelines
 * 
 */
router.get('/', function(req, res) {
    var query = "SELECT * FROM pipelines";
    logger.log('info', 'Pipeline Get Method - CQLQuery: ' + query);
    client.execute(query, function(err, result) {
        if (err) {
            logMessage.failedMessage(res, operationType.get, "Pipeline", "Error fetching pipeline");
            res.end();
        } else {
            logMessage.successMessage(res, operationType.get, "Pipeline", result.rows);
        }
    });
});

/**
 * This route inserts pipeline data into database
 * 
 * @argument json
 */
router.post('/', function(req, res) {
    logger.log(logLevel.info, 'POST Pipeline operation Started!');
    if (req.body && req.body.length > 0) {
        var insertCount = 0, failedCount = 0, totalCount = req.body.length;
        for (var i = 0; i < req.body.length; i++) {
            var dataStr = JSON.stringify(req.body[i]);
            var query = "INSERT INTO pipelines JSON '" + dataStr + "'";
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
        logMessage.badInputMessage(res, operationType.post, "Pipeline", "Bad input parameter!");
        // logger.log(logLevel.error, 'POST Pipeline :: Bad input parameter!');
        // res.status(resStatus.code_400.code).send({
        //     "message": resStatus.code_400.message,
        //     statusCode: resStatus.code_400.code
        // });
        res.end();
    }
});

/**
 * This api updates pipelines
 * 
 * @argument json
 */
router.put('/', function(req, res) {
    logger.log(logLevel.info, 'Put Pipeline operation Started!');
    if (req.body && req.body.length > 0) {
        var insertCount = 0, failedCount = 0, totalCount = req.body.length;
        for (var i = 0; i < totalCount; i++) {
            var pipeline = req.body[i];
            var pipelineid = pipeline.pipelineid;
            var stages = JSON.stringify(pipeline.stages);
            var query = "UPDATE pipelines SET stages = fromJson('" + stages + "') Where pipelineid = '" + pipelineid + "'";
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
        logger.log(logLevel.error, 'Put Pipeline :: Bad input parameter!');
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
            logger.log(logLevel.info, "Post Pipeline Record/s insertions failed! ::  TotalRecord:" + totalCount + " InsertCount: " + insertCount + " FailedCount:" + failedCount);
            resParams.statusCode = resStatus.code_400.code;
            resParams.message = "Record/s Insertion failed!";
        } else {
            logger.log(logLevel.info, "Post Pipeline Record/s have been added successfully! ::  TotalRecord:" + totalCount + " InsertCount: " + insertCount + " FailedCount:" + failedCount);
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
