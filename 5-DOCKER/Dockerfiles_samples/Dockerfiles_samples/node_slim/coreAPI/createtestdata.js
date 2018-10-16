var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var Sync = require('sync');

var testData = require('./utilityModule/createTestData/createTestData.js');
var logger = require('./utilityModule/logger/logger.js');
logger = new logger();
var resuts=[];
 
var srcFileOptions = {
	"fileName": "data/Analyzer_Testdata_v08.xlsx",
    "org":{
        "sheet":'Org_Data',
        "mapping": {
            "orgid":"A",
            "orgname":"B"
        },
        "output": "data/testdata-org-v8.json"
     },
     "users":{
        "sheet":'Users_Data',
        "mapping": {
            "userid":"A",
            "password":"B",
            "fullname":"C",
            "designation":"D",
            "locked":"E",
            "createddate":"F",
            "expirydate":"G",
            "orgids":"H"
        },
        "output": "data/testdata-users-v8.json"
     },
     "pipelines":{
        "sheet":'Pipelines_Data',
        "mapping": {
            "pipelineid":"A",
            "stageid":"B",
            "stageseq":"C",
            "stagename":"D",
            "stagetype":"E"
        },
        "output": "data/testdata-pipelines-v8.json"
     },
      "products":{
        "sheet":'Products_Data',
        "mapping": {
            "orgid":"A",
            "productid":"B",
            "productname":"C",
            "pipelineid":"D"
         },
        "output": "data/testdata-products-v8.json"
     },
	"metrics": {
		"sheet":'Level2_Data',
		"mapping": {
                "productid" : "A",
                "storypoints" : "E",
                "storypoints_date" : "D",
                "deploymentsuccess":"G",
                "deploymentsuccess_date":"F",
                "deploymentfailure":"K",
                "deploymentfailure_date":"J",
                "deploymenttotaltime":"S",
                "deploymenttotaltime_date":"F",
                "locchange":"I",
                "locchange_date":"H",
                "openitems":"M",
                "openitems_date":"L",
                "onholditems":"Q",
                "onholditems_date":"P",
                "technicaldebt":"O",
                "technicaldebt_date":"N"
        },        
        "output": "data/testdata-metrics-v8.json"
	},
    
    "workItems": {
        "sheet":'Level3_Data',
        "mapping": {
                "productid" : "A",
                "id": "B",
                "desc": "B",
                "stageid_Requirement": "D",
                "startdate_Requirement": "E",
                "enddate_Requirement": "F",
                "stageid_DCUT": "I",
                "startdate_DCUT": "J",
                "enddate_DCUT": "K",
                "stageid_DeployDev": "N",
                "startdate_DeployDev": "O",
                "enddate_DeployDev": "P",
                "stageid_InegrationTest": "S",
                "startdate_InegrationTest": "T",
                "enddate_InegrationTest": "U",
                "stageid_DeployQA": "X",
                "startdate_DeployQA": "Y",
                "enddate_DeployQA": "Z",
                "stageid_FunctionTest": "AC",
                "startdate_FunctionTest": "AD",
                "enddate_FunctionTest": "AE",
                "stageid_DeployNFR": "AH",
                "startdate_DeployNFR": "AI",
                "enddate_DeployNFR": "AJ",
                "stageid_TestNFR": "AM",
                "startdate_TestNFR": "AN",
                "enddate_TestNFR": "AO",
                "stageid_TollGate": "AR",
                "startdate_TollGate": "AS",
                "enddate_TollGate": "AT",
                "stageid_DeployProd": "AW",
                "startdate_DeployProd": "AX",
                "enddate_DeployProd": "AY",
                "type": "BE",
                "status": "BF"
        },        
        "output": "data/testdata-workItems-v8.json"
    }

};

Sync(function() { 
    logger.log("info", "TestData processing is started");
    
    
    testData.getOrganizations(srcFileOptions, function(err,xlstojson,data){
        
        if(!err){
            testData.writeJSONFile(srcFileOptions.org.output,"Organizations",data,function(err,msg){
                if(err){
                    logger.log('error', 'getOrganizations' , msg);
                } else{
                    logger.log('info', 'Organizations TestData generated in file', srcFileOptions.org.output);
                }
            });      
        } else{
            logger.log('error', 'getOrganizations' , xlstojson);
        } 
     });

    
    testData.getUsers(srcFileOptions, function(err,xlstojson,data){
         if(!err){
             testData.writeJSONFile(srcFileOptions.users.output,"Users",data,function(err,msg){
                if(err){
                    logger.log('error', 'getUsers' , msg);
                } else{
                    logger.log('info', 'Users TestData generated in file', srcFileOptions.users.output);
                }
            });      
        } else{
            logger.log('error', 'getUsers' , xlstojson);
        } 
     });

    testData.getPipelines(srcFileOptions, function(err,xlstojson,data){
          if(!err){
             testData.writeJSONFile(srcFileOptions.pipelines.output,"Pipelines",data,function(err,msg){
                if(err){
                    logger.log('error', 'getPipelines' , msg);
                } else{
                    logger.log('info', 'Pipelines TestData generated in file', srcFileOptions.pipelines.output);
                }
            });      
        } else{
            logger.log('error', 'getPipelines' , xlstojson);
        } 
     });

    testData.getProducts(srcFileOptions, function(err,xlstojson,data){
          if(!err){
             testData.writeJSONFile(srcFileOptions.products.output,"Products",data,function(err,msg){
                if(err){
                    logger.log('error', 'getProducts', msg);
                } else{
                    logger.log('info', 'Products TestData generated in file', srcFileOptions.products.output);
                }
            });      
        } else{
            logger.log('error', 'getProducts' , xlstojson);
        } 
     });
     
    testData.getMetrics(srcFileOptions, function(err,xlstojson,data){
          if(!err){
             testData.writeJSONFile(srcFileOptions.metrics.output,"Metrics",data,function(err,msg){
                if(err){
                    logger.log('error', 'getMetrics', msg);
                } else{
                    logger.log('info', 'Metrics TestData generated in file', srcFileOptions.metrics.output);
                }
            });      
        } else{
            logger.log('error', 'getMetrics' , xlstojson);
        } 
     });

    testData.getWorkItems(srcFileOptions, function(err,xlstojson,data){
          if(!err){
             testData.writeJSONFile(srcFileOptions.workItems.output,"WorkItems",data,function(err,msg){
                if(err){
                    logger.log('error', 'getWorkItems', msg);
                } else{
                    logger.log('info', 'WorkItems TestData generated in file', srcFileOptions.workItems.output);
                }
            });      
        } else{
            logger.log('error', 'getWorkItems' , xlstojson);
        } 
     });

});

module.exports = app;