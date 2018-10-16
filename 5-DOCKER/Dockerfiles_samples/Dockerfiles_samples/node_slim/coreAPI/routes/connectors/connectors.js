/* 
 * This module is to handle the connectors request
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
var _ = require('lodash');
//------------------------------------------------------------------------------
//----------------  Include Files External Modules  ---------------------------
//------------------------------------------------------------------------------

var config = require('config');
var environment = require('../../customModules/common/connectionConfig.js');
var logger = new (require('../../utilityModule/logger/logger.js'));
var client = environment.getcassandraDBConnectionReady();
var resStatus = config.HTTP_Status;
var logLevel = config.logLevel;
var moment = require("moment");
var devopsConnector = require('../../connector/connector.js');


/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
router.post('/', function(req, res) {
    var data;
    logger.log(logLevel.info, "connectors Started!");
    if (req.body && req.body.length > 0) { 
        console.log("body ", req.body);
        var orgid = req.body[0].orgid || null;
        var appName = req.body[0].appName || null;
        if (orgid && appName){
           devopsConnector.jiraConnector(function(msg, data){
                logger.log('info', 'jiraConnector' , msg , data);
                res.status(resStatus.code_200.code).send({
                    "message": msg,
                    statusCode: resStatus.code_200.code
                });
                res.end();
           });
        }
    }
    else{            
        res.status(resStatus.code_400.code).send({
            "message": resStatus.code_400.message,
            statusCode: resStatus.code_400.code
        });
        res.end();
    }
    
});

module.exports = router;