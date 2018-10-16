/* 
 * This module is to manage Organizations requests
 * 
 * 
 * 
 * @type Router
 */

//------------------------------------------------------------------------------
//----------------  Include Files Node Modules  ---------------------------
//------------------------------------------------------------------------------
var express = require('express');
var router = express.Router();
var config = require('config');
//------------------------------------------------------------------------------
//----------------  Include Files External Modules  ---------------------------
//------------------------------------------------------------------------------

var environment = require('../../customModules/common/connectionConfig.js');
var logger = new (require('../../utilityModule/logger/logger.js'));
var logMessage = require('../../utilityModule/common/commonFunctions.js');

var client = environment.getcassandraDBConnectionReady();

var resStatus = config.HTTP_Status;
var logLevel = config.logLevel;
var routeNames = config.routeNames;
var operationType = config.operationType;

/**
 * Get Request : To get the Organizations result set
 * @param {type} req
 * @param {type} res
 * @return {Object} response
 */
router.get('/', function(req, res) {
    // TODO: for a user

    var query = config.dbSelectQueries.getOrgs;
    //logger.log(logLevel.info, 'Organization Get Method - CQLQuery: ' + query);
    logMessage.logStep(res, logLevel.info, operationType.get, routeNames.org, '');
    client.execute(query, function(err, result) {
        if (err) {
            logger.log(logLevel.error, "Get Organization Failed: ", JSON.stringify(err));
            res.status(resStatus.code_500.code).send(
              {
                  "message": resStatus.code_500.message,
                  statusCode: resStatus.code_500.code
              });
            res.end();
        } else {
            logMessage.successMessage(res, operationType.get, routeNames.org, result.rows);
            //logger.log(logLevel.info, "Get Organization Success : " + JSON.stringify(result.rows));
            //console.log(result.rows);
            //res.status(resStatus.code_200.code).send(result.rows);
        }
    });
});

/**
 * Get Request : To get the Organization details based by OrgId
 */
router.get('/:orgid', function(req, res) {
    if (req.params.orgid) {
        var query = "SELECT * from organizations WHERE orgid='" + req.params.orgid + "' ";
        logger.log(logLevel.info, 'Organization Getby OrgId  - CQLQuery: ' + query);
        client.execute(query, function(err, result) {
            if (err) {
                logger.log(logLevel.error, "GET Organization/:orgid Failed: ", err);
                res.status(resStatus.code_500.code).send(
                  {
                      "message": resStatus.code_500.message,
                      statusCode: resStatus.code_500.code
                  });
                res.end();
            } else {
                logger.log(logLevel.info, "Get Organization/:orgid Success : " + JSON.stringify(result.rows));
                res.status(resStatus.code_200.code).send(result.rows);
            }
        });

    } else {
        logger.log(logLevel.error, "GET Organization/:orgid Failed: ", 'Bad input parameter');
        res.status(resStatus.code_400.code).send({
            "message": resStatus.code_400.message,
            statusCode: resStatus.code_400.code
        });
    }
});


/**
 * POST Method for Organizations
 * @param {object} req 
 * @param {object} res 
 * @return {Object} response
 */
router.post('/', function(req, res) {
    logger.log(logLevel.info, 'POST Organization operation Started!');
    if (req.body && req.body.length > 0) {
        var insertCount = 0, failedCount = 0, totalCount = req.body.length;
        for (var i = 0; i < req.body.length; i++) {
            if (req.body[i].orgid && req.body[i].orgname) {
                var query = "INSERT INTO organizations (orgid, orgname) VALUES ('" + req.body[i].orgid + "','" + req.body[i].orgname + "')";
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
                failedCount += 1;
                handleCompletionStatus(insertCount, failedCount, totalCount, res);
            }
        }
    } else {
        logger.log(logLevel.error, 'POST Organization :: Bad input parameter!');
        res.status(resStatus.code_400.code).send({
            "message": resStatus.code_400.message,
            statusCode: resStatus.code_400.code
        });
        res.end();
    }
});
/**
 * PUT Method : To Update the Organization Details 
 * @param {Object} res
 * @param {type} req
 * @return {type} response Obect
 */
router.put('/', function(req, res) {
    logger.log(logLevel.info, 'Put Organization operation Started!');
    if (req.body && req.body.length > 0) {
        var insertCount = 0, failedCount = 0, totalCount = req.body.length;
        for (var i = 0; i < req.body.length; i++) {
            if (req.body[i].orgid) {
                var query = "UPDATE organizations SET orgname='" + req.body[i].orgname + "' WHERE orgid='" + req.body[i].orgid + "' ";
                client.execute(query, function(err, result, i) {
                    if (err) {
                        failedCount += 1;
                        handleCompletionStatus(insertCount, failedCount, totalCount, res);
                    } else {
                        insertCount += 1;
                        handleCompletionStatus(insertCount, failedCount, totalCount, res);
                    }
                });
            } else {
                failedCount += 1;
                handleCompletionStatus(insertCount, failedCount, totalCount, res);
            }
        }

    } else {
        logger.log(logLevel.error, 'Put Organization :: Bad input parameter!');
        res.status(resStatus.code_400.code).send({
            "message": resStatus.code_400.message,
            statusCode: resStatus.code_400.code
        });
        res.end();
    }

});

/**
 * 
 * @param {type} insertCount
 * @param {type} failedCount
 * @param {type} totalCount
 * @param {type} res
 * @returns {undefined}
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
            logger.log(logLevel.info, "Post Organizations Record/s insertions failed! ::  TotalRecord:" + totalCount + " InsertCount: " + insertCount + " FailedCount:" + failedCount);
            resParams.statusCode = resStatus.code_400.code;
            resParams.message = "Record/s Insertion failed!";
        } else {
            logger.log(logLevel.info, "Post Organizations Record/s have been added successfully! ::  TotalRecord:" + totalCount + " InsertCount: " + insertCount + " FailedCount:" + failedCount);
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
