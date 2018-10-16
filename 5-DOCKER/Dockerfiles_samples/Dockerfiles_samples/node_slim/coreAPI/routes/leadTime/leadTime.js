/* 
 * This module is to handle the leadtime request
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

var leadTimeService = require("../../services/leadTime/leadTimeService.js");
leadTimeService = new leadTimeService();

var resStatus = config.HTTP_Status;
var logLevel = config.logLevel;


router.get('/', function(req, res) {
    logger.log(logLevel.info, "Get leadTime :: UserId: ");
    var orgId = req.headers['x-orgid'] ? req.headers['x-orgid'].split(',') : [];
    leadTimeService.generateLeadTime(orgId, function success(result) {

        var data = [];
        for (var i = 0; i < result.length; i++) {
             data.push(
				// IQ commented
              //{"productid": result[i].productid, "productname": result[i].productname, "orgid": result[i].orgid, "orgname": result[i].orgname, "metrics": "leadtime", "current": result[i].leadTime[0][0], "average": getAverageLeadTime(result[i].leadTime)}
              {"productid": result[i].productid, "productname": result[i].productname, "orgid": result[i].orgid, "orgname": result[i].orgname, "metrics": "leadtime", "current": result[i].currentLeadTime, "average": result[i].averageLeadTime, "diff": result[i].diff, "diffperc": result[i].diffperc}
			  
            );
        }
        // console.log("Success Data : ", JSON.stringify(data));
        logger.log(logLevel.info, "Get leadTime Success:: UserId: " + "leadTime: " + JSON.stringify(data));
        res.send(data);
    }, function error(err) {
        logger.log(logLevel.info, "Get leadTime Failed:: UserId: " + "leadTime Error: " + JSON.stringify(err));
        res.status(500).send(err);
    });
});





module.exports = router;



