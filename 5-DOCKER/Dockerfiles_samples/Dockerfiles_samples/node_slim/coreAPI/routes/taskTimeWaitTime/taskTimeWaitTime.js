/* 
 * This module is to handle the taskTimeWaitTime request
 * 
 * 
 * 
 * @type Router
 */

'use strict';
//------------------------------------------------------------------------------
//----------------  Include Files Node Modules  ---------------------------
//------------------------------------------------------------------------------
var express = require('express');
var router = express.Router();
var config = require('config');
//------------------------------------------------------------------------------
//----------------  Include Files External Modules  ---------------------------
//------------------------------------------------------------------------------



var logger = new (require('../../utilityModule/logger/logger.js'));

var taskTimeWaitTime = require("../../services/taskTimeWaitTime/taskTimeWaitTimeService.js");
taskTimeWaitTime = new taskTimeWaitTime();

var resStatus = config.HTTP_Status;
var logLevel = config.logLevel;


router.post('/', function(req, res) {
    
    logger.log(logLevel.info, "Get taskTimeLeadTime :: UserId: ");
    console.log(req.body);

    logger.log(logLevel.info, "Get leadTime :: UserId: ");
    taskTimeWaitTime.generateTaskWaitTime(req.body, function(result) {
        logger.log(logLevel.info, "Get leadTime Success:: UserId: " + " Result: " + JSON.stringify(result));
        res.send(result);
    }, function(err) {
        logger.log(logLevel.info, "Get taskTimeLeadTime Failed:: UserId: " + " " + err);
        res.status(500).send(err);
    });


});






module.exports = router;



