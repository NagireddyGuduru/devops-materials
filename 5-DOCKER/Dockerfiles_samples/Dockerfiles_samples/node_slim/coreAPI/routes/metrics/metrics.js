/* 
 * This module is to handle the metrics request
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
var metricsModel = require("../../models/metricsModel.js");
var rootService = require("../../services/services.js");
var metricsService = require("../../services/metrics/metrics.js");
var client = environment.getcassandraDBConnectionReady();
var metricsServiceModule = {getMetricsData: getMetricsData};
var resStatus = config.HTTP_Status;
var logLevel = config.logLevel;
var moment = require("moment");


router.get('/', function(req, res) {
    logger.log(logLevel.info, "Get Product Data!");
    res.status(200).send();
});

/**
 * 
 * @param {type} req
 * @param {type} res
 */
router.get('/:metricname', function(req, res, next) {
    //Todo : require ordid for metrics  calculation
    var metricname = req.params.metricname;

    if (metricname.length > 1) {
        if (metricname == 'leadtime' || metricname == 'taskwaittime') {
            next('route');
        } else {
            var orgId = req.headers['x-orgid'] ? req.headers['x-orgid'].split(',') : [];

            // console.log(orgId);
            metricsService.getData(orgId,metricname,function(result){
                logger.log(logLevel.info, 'Get Metrics/:metricname  Success :: OrgId: ' + orgId + ' Userid:  ' + JSON.stringify(result));
                res.status(resStatus.code_200.code).send(result);
            },function(error){
                logger.log(logLevel.error, 'Get api/v1/metrics/:metricname Failed :: Userid: Bad input parameter!');
                res.status(resStatus.code_400.code).send({
                    "message": error,
                    statusCode: resStatus.code_400.code
                });
            });

           /* rootService.getMetricsData(orgId, metricname, function(result) {

                logger.log(logLevel.info, 'Get Metrics/:metricname  Success :: OrgId: ' + orgId + ' Userid:  ' + JSON.stringify(result));
                rootService.formatMetricsData(metricname, result, function(metricResult) {
                    res.status(resStatus.code_200.code).send(metricResult);
                });
            }, function(error) {
                logger.log(logLevel.error, 'Get api/v1/metrics/:metricname Failed :: Userid: Bad input parameter!');
                res.status(resStatus.code_400.code).send({
                    "message": error,
                    statusCode: resStatus.code_400.code
                });
            });*/
        }

    } else {
        logger.log(logLevel.error, 'POST Organization :: Bad input parameter!');
        res.status(resStatus.code_400.code).send({
            "message": resStatus.code_400.message,
            statusCode: resStatus.code_400.code
        });
    }
});

/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
router.post('/', function(req, res) {
    logger.log(logLevel.info, "Post Metrics Data!");
   /* var data = JSON.parse(req.body);
    console.log("body ", req.body);
    console.log("req.body.length ", req.body.length);
    console.log("data.length ", data.length);*/
    if (req.body && req.body.length > 0) {
        getProductsData(function(params) {
            var products = params.productsData, metricsData = [];
            if (products.length) {
                
                for (var i = 0; i < req.body.length; i++) {
                    try {
                        var prodId = req.body[i].hasOwnProperty('productid') ? req.body[i].productid : null;
                        var metrics = req.body[i].hasOwnProperty('metrics') ? req.body[i].metrics : null;
                        var productData = _.find(params.productsData, {'productid': prodId});
                        if (prodId && metrics && productData) {

                            //_.merge(metricsData, constructJSONStructure(productData, metrics));
                           
                            metricsData = constructJSONStructure(productData, metrics,metricsData);
                            //console.log(metricsData);
                        }
                    } catch (e) {
                        throw e;
                    }
                }
                
                if (metricsData.length > 0) {
                    logger.log(logLevel.info, 'POST Metrics ::  Products Found!');
                    sendDataToDB(metricsData, req, res);
                } else {
                    logger.log(logLevel.error, 'POST Metrics :: No Metrics Added!');
                    res.status(resStatus.code_200.code).send({
                        "message": "No Metrics added!",
                        statusCode: resStatus.code_200.code
                    });
                    res.end();
                }
            } else {
                logger.log(logLevel.error, 'POST Metrics :: No Products Found!');
                res.status(resStatus.code_400.code).send({
                    "message": resStatus.code_400.message,
                    statusCode: resStatus.code_400.code
                });
                res.end();
            }
        }, function(err) {
            logger.log(logLevel.error, "No Products found : ", JSON.stringify(err));
            res.status(resStatus.code_400.code).send({
                "message": "No Products found",
                statusCode: resStatus.code_400.code
            });
            res.end();
        });
    } else {
        logger.log(logLevel.error, 'POST Metrics :: Bad input parameter!');
        res.status(resStatus.code_400.code).send({
            "message": resStatus.code_400.message,
            statusCode: resStatus.code_400.code
        });
        res.end();
    }
});


function getMetricsData(metricname) {
    return [];
}

function constructJSONStructure(productObj, metrics,metricsData) {

    logger.log("info", "constructJSONStructure metrics", JSON.stringify(metrics));

    var resultSet = [];

    _.forEach(metrics, function(value, key) {
        logger.log("info", "constructJSONStructure value", JSON.stringify(value), " Key" , key);
        var data = {};
        var datapointResults=[];
        data.name = key;
        if (key === 'deploymentsuccess' || key === 'deploymentfailure') {
            // data.status = (key === 'deploymentsuccess' || key === 'deploymentfailure') ? "SUCCESS" : "FAILURE"
        }
        //data.status = (key === 'deploymentsuccess' || key === 'deploymentfailure') ? "SUCCESS" : "FAILURE"
        _.forEach(value,function(datapointVal,datapointKey){  
           var convertedTime =  moment(datapointVal[0]).valueOf(); 
           var result=[];          
            
            result.push(convertedTime);
            result.push(datapointVal[1]);
            datapointResults.push(result);
        })
        data.datapoints = datapointResults;
        data.tags = {orgid: productObj.orgid,
            orgname: productObj.orgid,
            productid: productObj.productid,
            productname: productObj.productname
        };
        console.log("Time Stamp convertedTime metricsData" , JSON.stringify(data));
        metricsData.push(data);
    });

    return metricsData;
}

/**
 * 
 * @param {type} successCallback
 * @param {type} failureCallback
 * @returns {undefined}
 */
function getProductsData(successCallback, failureCallback) {
    var query = "SELECT * from products";
    var param = {
        orgData: [],
        productsData: []
    }
    rootService.getProductsData(query, function(result) {
        if (result.length > 0) {
            param.productsData = result;
            successCallback(param);
            // getOrgniationsData(param, successCallback, failureCallback);
        }
    }, function(error) {
        failureCallback(error);
    });

}

/**
 * 
 * @param {type} param
 * @param {type} successCallback
 * @param {type} failureCallback
 * @returns {undefined}
 */
function getOrgniationsData(param, successCallback, failureCallback) {
    var query = "SELECT * from organizations";
    rootService.getOrgData(query, function(result) {
        if (result.length > 0) {
            param.orgData = result;
            logger.log(logLevel.error, "Metrics => getOrgniationsData :: Failure Callback! : " + JSON.stringify(error));
            successCallback(param);
        }
    }, function(error) {
        logger.log(logLevel.error, "Metrics => getOrgniationsData :: Failure Callback! : " + JSON.stringify(error));
        failureCallback(param);
    });
}

function sendDataToDB(data, req, res) {
    rootService.pushDataToKairosDB(data, function() {

        logger.log(logLevel.info, "Metrics => sendDataToDB :: Success Callback! : ");
        res.send(data);
    }, function(err) {
        logger.log(logLevel.error, "Metrics => sendDataToDB :: Failure Callback! : " + JSON.stringify(err));
        res.status(400).send(err);
    });
}



module.exports = router;



