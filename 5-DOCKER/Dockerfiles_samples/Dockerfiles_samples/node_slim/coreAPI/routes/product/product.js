/* 
 * This module is to get the product 
 * @type Router
 */

var express = require('express');
var router = express.Router();

var daataModel = require("../../models/organizationsModel.js");
var connectionConfig = require('../../customModules/common/connectionConfig.js');
var config = require('config');

var environment = connectionConfig;
var logger = new (require('../../utilityModule/logger/logger.js'));
var dataProducts = require('../../services/products/products.js'); 

var client = environment.getcassandraDBConnectionReady();
var resStatus = config.HTTP_Status;
var logLevel = config.logLevel;



/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
router.get('/', function(req, res) {
   logger.log('info', ' Products : GET Method Started!');
   dataProducts.getRecords(client, function(err,result){
        if (err) {
            logger.log('error', ' Products : GET Method Failed ', JSON.stringify(err));
            res.status(resStatus.code_500.code).send({
                    "message": resStatus.code_500.message,
                    statusCode: resStatus.code_500.code
            });
        } else{
            var data = result.rows || [];
            logger.log('info', ' Products : GET Method Success! ', JSON.stringify(data));
            res.status(resStatus.code_200.code).send(data);
        }
    });
   
 });

router.get('/:productid', function(req, res) {
    logger.log('info', ' Products(productid) : GET Method Started!');
    if (req.params.productid) {
         dataProducts.getRecord(req.params.productid,client, function(err,result){
            if (err) {
                logger.log('error', ' Products(productid) : GET Method Failed ', JSON.stringify(err));
                res.status(resStatus.code_500.code).send({
                    "message": resStatus.code_500.message,
                    statusCode: resStatus.code_500.code
                });
                res.end();
            } else {
                var data = result.rows||[];
                logger.log('info', ' Products(productid) : GET Method Success! ', JSON.stringify(data));
                res.status(resStatus.code_200.code).send(data);
            }
        });
    } else {
            logger.log('error', ' Products (productid) : GET Method Failed ', 'Bad input parameter');
            res.status(resStatus.code_400.code).send({
                        "message": resStatus.code_400.message,
                        statusCode: resStatus.code_400.code
            });
    }
    
});

router.post('/', function(req, res) {
    logger.log('info', ' Products : POST Method Started!');
 	if (req.body && req.body.length > 0) {
        dataProducts.setRecords(req.body,client,function(err,result){
            if (err) {
                logger.log('error', ' Products : POST Method Failed ', JSON.stringify(err));
                res.status(resStatus.code_500.code).send({
                    "message": resStatus.code_500.message,
                    statusCode: resStatus.code_500.code
                });
                res.end();
            } else{                
                 res.status(resStatus.code_200.code).send(result);
            }
         });     
        
	} else{
		logger.log('error', ' Products : POST Method Failed ', 'Bad input parameter');
        res.status(resStatus.code_400.code).send({
                        "message": resStatus.code_400.message,
                        statusCode: resStatus.code_400.code
        });
        res.end();
	}
});

/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
router.put('/', function(req, res) {
    logger.log('info', 'POST Product operation Started!');
	if (req.body && req.body.length > 0) {
		var insertCount = 0, failedCount = 0, totalCount = req.body.length;
    	for (var i = 0; i < req.body.length; i++) {
        	if (req.body[i].productid) {
				var query = "UPDATE devopsdb.products  SET productname =  '" + req.body[i].productname + "' , pipelineid =  '" + req.body[i].pipelineid + "' WHERE productid = '" + req.body[i].productid +"';";
        	    client.execute(query, function(err, result) {
                     if (err) {
	                        failedCount += 1;
	                        handleOrgPostOperationCompletionStatus(insertCount, failedCount, totalCount, res);
	                        logger.log('Failed :: Failed to Add ' + ' failedCount:' + failedCount);
	                    } else {
	                    	insertCount += 1;
	                        handleOrgPostOperationCompletionStatus(insertCount, failedCount, totalCount, res);
	                        logger.log('Success :: Added to DB ' + ' InsertCount:' + insertCount);
	                    }
                });
            }
        }
    } else {
        res.status(400).send({
            "message": 'bad input parameter',
            statusCode: 400
        });
        res.end();
    }
});

function handleOrgPostOperationCompletionStatus(insertCount, failedCount, totalCount, res) {

    if (totalCount === insertCount + failedCount) {

        logger.log('info', "Post Product Records has been added successfully! ::  TotalRecord:" + totalCount + " InsertCount: " + insertCount + " FailedCount:" + failedCount);
        
        res.status(200).send({
            "statusCode": 200,
            "message": "Records has been added successfully!",
            "totalRecord": totalCount,
            "insertedRecords": insertCount,
            "failedRecords": failedCount
        });
        res.end();
    }
}

module.exports = router;