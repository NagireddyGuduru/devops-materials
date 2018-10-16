/* 
 * This module is to generate json test data.
 * @type Module
 */

var jsonfile = require('jsonfile');
var xlsx2json = require('xlsx2json');
var _ = require('lodash');
var moment = require("moment");
var logger = new (require('../logger/logger.js'));

function getTestData(dataFile,fileWorkItems,fileMetrics,callbackFn) {  

 	var startdate,
      	enddate,
        startdatestr,
        enddatestr,
        preProd, 
        currProd,
        results=[]; 
 
    return {
        getOrganizations:getOrganizations,
        getUsers:getUsers,
        getPipelines:getPipelines,
        getProducts:getProducts,
        getMetrics:getMetrics,
        getWorkItems:getWorkItems,
        writeJSONFile:writeJSONFile
    };

    function parseExcel(fileName,options,callbackFn){

    	xlsx2json(fileName, options).then(function(data) { 
             callbackFn(false,data);            	
        });

    }

    function getTimeStamp(data){
    	var resultDate = moment(new Date(data)).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    	return resultDate;
    }

    function getOrganizations(dataFile,callbackFn){

        var results=[];

        var options = {
            sheet:dataFile.org.sheet,
            dataStartingRow: 2,
            mapping: dataFile.org.mapping
        };

        parseExcel(dataFile.fileName,options, function(err, data){
            if(err){
                callbackFn(err,data);
            } else {
                for(var i=0;i<data.length;i++){
                    if(data[i].orgid!="" && data[i].orgname!=""){
                        results.push(data[i]);    
                    }                    
                }
                callbackFn(err,data,results);               
            }
        }); 
    }

    function getUsers(dataFile,callbackFn){

        var result,results=[];

        var options = {
            sheet:dataFile.users.sheet,
            dataStartingRow: 2,
            mapping: dataFile.users.mapping
        };

        parseExcel(dataFile.fileName,options, function(err, data){
            if(err){
                callbackFn(err,data);
            } else {
                for(var i=0;i<data.length;i++){
                    if(data[i].orgids!="" && data[i].userid!="" && data[i].password!=""){
                        var orgids = data[i].orgids.split(',');
                        data[i].createddate = getTimeStamp(data[i].createddate);
                        data[i].expirydate = getTimeStamp(data[i].expirydate);
                        data[i].orgids= orgids;
                        results.push(data[i]);    
                    }                    
                }
                callbackFn(err,data,results);               
            }
        }); 
    }

    function getPipelines(dataFile,callbackFn){

        var result={},
            results=[];

        var productSchema = {
            "pipelineid": "", 
            "stages": []
        };

        var options = {
            sheet:dataFile.pipelines.sheet,
            dataStartingRow: 2,
            mapping: dataFile.pipelines.mapping
        };

        parseExcel(dataFile.fileName,options, function(err, data){
            if(err){
                callbackFn(err,data);
            } else {
                for(var i=0;i<data.length;i++){
                    var pipelineid = data[i].pipelineid || "";
         
                    if (pipelineid && !_.find(results, {"pipelineid": pipelineid})) {
                            var pipeline = _.cloneDeep(productSchema);
                            pipeline.pipelineid = pipelineid;
                            results.push(pipeline);                                      
                    }

                    var index = _.findIndex(results, {"pipelineid": pipelineid});

                    if (index !== -1) { 
                        var result = {};
                        result.stageid = data[i].stageid;
                        result.stageseq = parseInt(data[i].stageseq);
                        result.stagename = data[i].stagename;
                        result.stagetype = data[i].stagetype;
                                                 
                        results[index].stages.push(result);
                    }

                }
                callbackFn(err,data,results);               
            }
        }); 
    }

     function getProducts(dataFile,callbackFn){

        var result,results=[];

        var options = {
            sheet:dataFile.products.sheet,
            dataStartingRow: 2,
            mapping: dataFile.products.mapping
        };

        parseExcel(dataFile.fileName,options, function(err, data){
            if(err){
                callbackFn(err,data);
            } else {
                for(var i=0;i<data.length;i++){
                    if(data[i].orgid!="" && data[i].productid!="" && data[i].productname!="" && data[i].pipelineid!=""){
                        results.push(data[i]);    
                    }                    
                }
                callbackFn(err,data,results);               
            }
        }); 
    }

    

    function getMetrics(dataFile,callbackFn){

        var result={},
    		results=[];

    	var productSchema = {
    		"productid": "", 
    		"metrics": {
    			"storypoints": [], 
    			"deploymentsuccess": [], 
    			"deploymentfailure": [], 
    			"deploymenttotaltime": [], 
    			"locchange": [], 
    			"openitems": [], 
    			"onholditems": [], 
    			"technicaldebt": []
    		}
    	};
        var options = {
            sheet:dataFile.metrics.sheet,
            dataStartingRow: 2,
            mapping: dataFile.metrics.mapping
        };


		parseExcel(dataFile.fileName,options, function(err, data){
 			if(err){
				callbackFn(err,data);
			} else {
				for(var i=0;i<data.length;i++){
			    	var productid = data[i].productid || "";
		 
		    		if (productid && !_.find(results, {"productid": productid})) {
		                    var product = _.cloneDeep(productSchema);
		                    product.productid = productid;
		                    results.push(product);                    			        
		            }

		            var index = _.findIndex(results, {"productid": productid});
		            
		            if (index !== -1) {
		                    var resultData = [], resultDate, result;

		                    //Storypoints - Velocity from Excel 
		                    resultDate = getTimeStamp(data[i].storypoints_date);
                            resultData.push(resultDate);
                            result = parseInt(data[i].storypoints);
		                    resultData.push(result);
		                    results[index].metrics.storypoints.push(resultData);

		                    //deploymentsuccess - Date_Deployment/ sprint
		                    resultData = [], resultDate;
		                    resultDate = getTimeStamp(data[i].deploymentsuccess_date);
                            resultData.push(resultDate);
                            result = parseInt(data[i].deploymentsuccess);
		                    resultData.push(result);
 		                    results[index].metrics.deploymentsuccess.push(resultData);

		                    //locchange - Date_LoC changed/ sprint
		                    resultData = [], resultDate;
		                    resultDate = getTimeStamp(data[i].locchange_date);
                            resultData.push(resultDate);
                            result = parseInt(data[i].locchange)
		                    resultData.push(result);
                            results[index].metrics.locchange.push(resultData);

		                    //deploymentfailure - Date_Failed Deployment / sprint
		                    resultData = [], resultDate;
		                    resultDate = getTimeStamp(data[i].deploymentfailure_date);
                            resultData.push(resultDate);
                            result = parseInt(data[i].deploymentfailure);
		                    resultData.push(result);
		                    results[index].metrics.deploymentfailure.push(resultData);

		                    //deploymenttotaltime - Date_Failed Deployment / sprint
		                    resultData = [], resultDate;
		                    resultDate = getTimeStamp(data[i].deploymenttotaltime_date);
                            resultData.push(resultDate);
                            result = parseFloat(data[i].deploymenttotaltime);
		                    resultData.push(result);
		                    results[index].metrics.deploymenttotaltime.push(resultData);

		                    //openitems - Date_Ticket Volume
		                    resultData = [], resultDate;
		                   	resultDate = getTimeStamp(data[i].openitems_date);
                            resultData.push(resultDate);
                            result = parseInt(data[i].openitems);
		                    resultData.push(result);
		                    results[index].metrics.openitems.push(resultData);

		                    //onholditems - Date_# of items on Hold
		                    resultData = [], resultDate;
		                    resultDate = getTimeStamp(data[i].onholditems_date);
                            resultData.push(resultDate);
                            result = parseInt(data[i].onholditems);
                            resultData.push(result);
                            results[index].metrics.onholditems.push(resultData);

		                    //technicaldebt - Date_Technical Debt (TD)
		                    resultData = [], resultDate;
		                    resultDate = getTimeStamp(data[i].technicaldebt_date);
                            resultData.push(resultDate);
                            result = parseInt(data[i].technicaldebt);
		                    resultData.push(result);
		                    results[index].metrics.technicaldebt.push(resultData);
		               }
		    	}

                callbackFn(err,data,results); 		    	
			}

		});    	
    	 
 
    }

    function getWorkItems(dataFile,callbackFn){

        var result={},
            results=[];

        var productSchema = {
            "productid": "", 
            "workitems": []
        };

        var options = {
            sheet:dataFile.workItems.sheet,
            dataStartingRow: 2,
            mapping: dataFile.workItems.mapping
        };

        var phase = {},
            startdate,
            enddate;


        parseExcel(dataFile.fileName,options, function(err, data){
            if(err){
                callbackFn(err,data);
            } else{
                for(var i=0;i<data.length;i++){
                    var productid = data[i].productid || "";
                    if (productid && !_.find(results, {"productid": productid})) {
                            var product = _.cloneDeep(productSchema);
                            product.productid = productid;
                            results.push(product);                                      
                    }
                    var index = _.findIndex(results, {"productid": productid});
                    if (index !== -1  && data[i].status === "COMPLETE" ) {
                        var resultData = [], resultDate;

                            startdate = getTimeStamp(data[i].startdate_Requirement);
                            enddate = getTimeStamp(data[i].enddate_Requirement);
                            phase = {
                                "id": data[i].id, 
                                "desc": data[i].desc, 
                                "stageid": data[i].stageid_Requirement, 
                                "startdate": startdate, 
                                "enddate": enddate,
                                "type": data[i].type, 
                                "status": data[i].status
                            };                            
                            results[index].workitems.push(phase);

                            startdate = getTimeStamp(data[i].startdate_DCUT);
                            enddate = getTimeStamp(data[i].enddate_DCUT);
                            phase = {
                                "id": data[i].id, 
                                "desc": data[i].desc, 
                                "stageid": data[i].stageid_DCUT, 
                                "startdate": startdate, 
                                "enddate": enddate,
                                "type": data[i].type, 
                                "status": data[i].status
                            };                            
                            results[index].workitems.push(phase);

                            startdate = getTimeStamp(data[i].startdate_DeployDev);
                            enddate = getTimeStamp(data[i].enddate_DeployDev);
                            phase = {
                                "id": data[i].id, 
                                "desc": data[i].desc, 
                                "stageid": data[i].stageid_DeployDev, 
                                "startdate": startdate, 
                                "enddate": enddate,
                                "type": data[i].type, 
                                "status": data[i].status
                            };                            
                            results[index].workitems.push(phase);

                            startdate = getTimeStamp(data[i].startdate_InegrationTest);
                            enddate = getTimeStamp(data[i].enddate_InegrationTest);
                            phase = {
                                "id": data[i].id, 
                                "desc": data[i].desc, 
                                "stageid": data[i].stageid_InegrationTest, 
                                "startdate": startdate, 
                                "enddate": enddate,
                                "type": data[i].type, 
                                "status": data[i].status
                            };                            
                            results[index].workitems.push(phase);

                            startdate = getTimeStamp(data[i].startdate_DeployQA);
                            enddate = getTimeStamp(data[i].enddate_DeployQA);
                            phase = {
                                "id": data[i].id, 
                                "desc": data[i].desc, 
                                "stageid": data[i].stageid_DeployQA, 
                                "startdate": startdate, 
                                "enddate": enddate,
                                "type": data[i].type, 
                                "status": data[i].status
                            };                            
                            results[index].workitems.push(phase);

                            startdate = getTimeStamp(data[i].startdate_FunctionTest);
                            enddate = getTimeStamp(data[i].enddate_FunctionTest);
                            phase = {
                                "id": data[i].id, 
                                "desc": data[i].desc, 
                                "stageid": data[i].stageid_FunctionTest, 
                                "startdate": startdate, 
                                "enddate": enddate,
                                "type": data[i].type, 
                                "status": data[i].status
                            };                            
                            results[index].workitems.push(phase);

                            startdate = getTimeStamp(data[i].startdate_DeployNFR);
                            enddate = getTimeStamp(data[i].enddate_DeployNFR);
                            phase = {
                                "id": data[i].id, 
                                "desc": data[i].desc, 
                                "stageid": data[i].stageid_DeployNFR, 
                                "startdate": startdate, 
                                "enddate": enddate,
                                "type": data[i].type, 
                                "status": data[i].status
                            };                            
                            results[index].workitems.push(phase);

                            startdate = getTimeStamp(data[i].startdate_TestNFR);
                            enddate = getTimeStamp(data[i].enddate_TestNFR);
                            phase = {
                                "id": data[i].id, 
                                "desc": data[i].desc, 
                                "stageid": data[i].stageid_TestNFR, 
                                "startdate": startdate, 
                                "enddate": enddate,
                                "type": data[i].type, 
                                "status": data[i].status
                            };                            
                            results[index].workitems.push(phase);

                            startdate = getTimeStamp(data[i].startdate_TollGate);
                            enddate = getTimeStamp(data[i].enddate_TollGate);
                            phase = {
                                "id": data[i].id, 
                                "desc": data[i].desc, 
                                "stageid": data[i].stageid_TollGate, 
                                "startdate": startdate, 
                                "enddate": enddate,
                                "type": data[i].type, 
                                "status": data[i].status
                            };                            
                            results[index].workitems.push(phase);

                            startdate = getTimeStamp(data[i].startdate_DeployProd);
                            enddate = getTimeStamp(data[i].enddate_DeployProd);
                            phase = {
                                "id": data[i].id, 
                                "desc": data[i].desc, 
                                "stageid": data[i].stageid_DeployProd, 
                                "startdate": startdate, 
                                "enddate": enddate,
                                "type": data[i].type, 
                                "status": data[i].status
                            };                            
                            results[index].workitems.push(phase);          
               
                     }
                }
                callbackFn(err,data,results); 
            }
        });
    }

    function writeJSONFile(targetFile,dataType,results,callbackFn){

    	jsonfile.writeFile(targetFile, results, {spaces: 2}, function(err) {
             if (err) {
             	var msg = dataType + " JSON is not created :" + err;
                callbackFn(err,msg);
            }
            else {
            	var msg = dataType + " JSON is created at location " + targetFile;
                callbackFn(false,msg);
            }

        });

	}      
}


module.exports = new getTestData();