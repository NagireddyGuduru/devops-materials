/* 
 * This module is to handle workitems Api requests 
 * 
 * @type Router
 */

// Import Node modules
var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require("moment");


//Import custome Node modules
var dataModel = require("../../models/organizationsModel.js");
var config = require('config');
var environment = require('../../customModules/common/connectionConfig.js');
var logger = new (require('../../utilityModule/logger/logger.js'));


var client = environment.getcassandraDBConnectionReady();
var resStatus = config.HTTP_Status;
var logLevel = config.logLevel;
var rootService = require("../../services/services.js");
var dataPipeline = require('../../services/pipeline/pipeline.js'); 
var dataOrganizations = require('../../services/organizations/organizations.js');
var dataProducts = require('../../services/products/products.js'); 
var pad = require('node-string-pad');


/**
 * get work items for client id
 * @param {type} param1
 * @param {type} param2
 */
router.get('/', function(req, res) {
    var data =[];
    res.status(resStatus.code_200.code).send(data);
});

router.get('/client/:clientid', function(req, res) {

    if (req.params.clientid) {
         res.status(resStatus.code_200.code).send(dataModel.workitemData_clientid);
    } else {
        res.status(resStatus.code_400.code).send({
                    "message": resStatus.code_400.message,
                    statusCode: resStatus.code_400.code
        });
    }
});

/**
 * By passing client id, status and timeframe information, you can retrieve workitems since (current-2) sprints ordered by status and date
 */
router.get('/client/:clientid/status/:status', function(req, res) {

    if (req.params.clientid && req.params.status) {
        res.status(200).send(dataModel.workitemData_clientid_status);
    } else {
        res.status(resStatus.code_400.code).send({
                    "message": resStatus.code_400.message,
                    statusCode: resStatus.code_400.code
        });
    }
});


/**
 * get work items for client id
 * By passing client id, product id, status and timeframe information, you can retrieve workitems since (current-2) sprints ordered by status and date
 */
router.get('/client/:clientid/product/:prodid/status/:status', function(req, res) {

    if (req.params.clientid && req.params.prodid && req.params.status) {
        res.status(200).send(dataModel.workitemData_clientid__prodid_status);
    } else {
        res.status(resStatus.code_400.code).send({
                    "message": resStatus.code_400.message,
                    statusCode: resStatus.code_400.code
        });
    }
 
});

router.post('/product', function(req, res) {
    res.send('POST handler for organizations route.');
});


/*
* Workitems POST Starts here
*/
router.post('/', function(req, res) {
    logger.log('info', 'Workitems : POST operation Started!');
    logger.log('info', 'Workitems : Req: ' + req); 
    if (req.body && req.body.length > 0) {
        var organizations,pipelines,products;

         logger.log('info', 'Workitems : Get Products Rec:'); 
         dataProducts.getRecords(client, function(err,result){
            if (err) {
                logger.log('error', ' Workitems : Products GET Method Failed ', JSON.stringify(err));
                res.status(resStatus.code_500.code).send({
                        "message": resStatus.code_500.message,
                        statusCode: resStatus.code_500.code
                });
            } else{
                products=result.rows || [];
                processWorkItems(req.body,products,req,res); 
            }
        });
    }
    else{
        logger.log('error', 'POST Workitems Failed :: Bad input parameter!');        
        res.status(resStatus.code_400.code).send({
                    "message": resStatus.code_400.message,
                    statusCode: resStatus.code_400.code
        });
        res.end();
     }
});

function processWorkItems(data,products,req,res){
    var formdata =[],orgname="",productRecIndex,product;
    var results= [];
    
    logger.log('info', 'Workitems : processWorkItems');
    
    for (var i = 0; i < data.length; i++) {
         if(data[i]){
            productRecIndex = dataProducts.getRecordIndex(data[i].productid,products);
            if(productRecIndex>=0){
               product = products[productRecIndex] || []; 
               formdata=[];
               formdata = getWorkitemData(data[i],product,req,res);
            } else{
                var message = "Invaild productid "  + data[i].productid ;
                product =[];
                logger.log("error", "Workitems product is invaild", product , "in products ", products);

                res.status(resStatus.code_400.code).send({
                    "message": message,
                    statusCode: resStatus.code_400.code
                });
                res.end();
                return;
            }
            
            for (var j=0;j<formdata.length;j++){
                results.push(formdata[j]); 
            }                           
        }      
        else{
                logger.log("error", "Workitems orgName is invaild", orgname);
                res.status(resStatus.code_400.code).send({
                    "message": resStatus.code_400.message,
                    statusCode: resStatus.code_400.code
                });
                res.end();
                return;
        }
    }

    logger.log('info', 'Workitems : sendDataToDB with form data!', JSON.stringify(results));
    sendDataToDB(results,req,res);
 }

function sendDataToDB(data, req, res) {
    rootService.pushDataToKairosDB(data, function() {
        logger.log(logLevel.info, "Workitems => sendDataToDB :: Success Callback! : ");
        res.status(resStatus.code_200.code).send(data);                 
    }, function(err) {
        logger.log(logLevel.error, "Workitems => sendDataToDB :: Failure Callback! : " + JSON.stringify(err));
        res.status(resStatus.code_400.code).send({
            "message": resStatus.code_400.message,
            statusCode: resStatus.code_400.code
        });
    });
}

function getWorkitemData(data,product,req,res){
    var result={}, tag1={}, tag2={}, tags=[] ,results = [];
    var startdate,enddate;
    var stages,stageRecords = {};

    for(i=0;i<data.workitems.length;i++){
        stageRecords = {};
        if(!data.workitems[i].stageid){
            res.status(resStatus.code_400.code).send({
            "message": resStatus.code_400.message,
            statusCode: resStatus.code_400.code
        });

        } else{
            stages = product.stages || [];
            stageRecords = dataPipeline.getStageRecord(data.workitems[i].stageid,stages);

            result={};         
            tag1={};
            //tag1.organization = product.orgname || "";
            tag1.orgid = product.orgid || "";
            //tag1.product = product.productname || "";
            tag1.productid = product.productid || "";
            tag1.storyid=data.workitems[i].id;
            tag1.workitem = data.workitems[i].type;
            tag1.itemname = data.workitems[i].status;
            tag1.stage = stageRecords.stagename || "";
			var ss = "";
			ss = "" + stageRecords.stageseq;
            tag1.stageSequence = pad(ss, 3, 'LEFT', '0') || "";
            tag1.metric = "startdate";
            
            result.tags=tag1;
            result.name = "workitems",
            startdate = moment(data.workitems[i].startdate).valueOf();  
            result.datapoints = [];      
            result.datapoints.push([startdate, startdate]);        
            results.push(result);

            result={};
            tag2={};
           // tag2.organization = product.orgname || "";
            tag2.orgid = product.orgid || "";
            //tag2.product = product.productname || "";
            tag2.productid = product.productid || "";
            tag2.storyid=data.workitems[i].id;
            tag2.workitem = data.workitems[i].type;
            tag2.itemname = data.workitems[i].status;
            tag2.stage = stageRecords.stagename || "";
			var ss1 = "" 
			ss1 = "" + stageRecords.stageseq;
            tag2.stageSequence = pad(ss1, 3, 'LEFT', '0') || "";
			
            tag2.metric = "startdate"; // IQ is this required
            tag2.metric = "enddate";
            result.tags = tag2;
            result.name = "workitems",
            enddate = moment(data.workitems[i].enddate).valueOf();  
            result.datapoints = [];      
            result.datapoints.push([enddate, enddate]); 
            results.push(result);    
        }
          
     }
     return results;
}

module.exports = router;
