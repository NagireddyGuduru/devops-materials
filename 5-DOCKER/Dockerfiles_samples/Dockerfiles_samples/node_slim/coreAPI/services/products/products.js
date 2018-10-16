/* 
 * This module is to manage CURD operation for products.
 * @type Module
 */

var logger = new (require('../../utilityModule/logger/logger.js'));
var dataPipeline = require('../pipeline/pipeline.js'); 
var dataOrganizations = require('../organizations/organizations.js');
var _ = require('lodash');


function getProductsData() {   
    var query1 = "SELECT orgid,orgname,productid,productname,pipelineid,stages FROM products;";
    var query2 = "SELECT orgid,orgname,productid,productname,pipelineid,stages FROM products WHERE productid='";
    var query3 = "INSERT INTO devopsdb.products (orgid,orgname,productid,productname,pipelineid,stages) VALUES ('";
                
     return {
        getRecords: getRecords,
        getRecord: getRecord,
        getRecordIndex:getRecordIndex,
        setRecords: setRecords,
        setRecord: setRecord
     };

    function getRecords(client,callbackFn) {
        var results;
        logger.log('info', 'getRecords - CQLQuery: ' + query1);
        client.execute(query1, function(err, result) {
            callbackFn(err, result);            
        });
    }

    function getRecordIndex(client,callbackFn) {
        logger.log('info', 'getRecordIndex -: ' + query1);
        client.execute(query1, function(err, result) {
            callbackFn(err, result);            
        });
    }

     function getRecordIndex(productid,data){
         for(i=0;i<data.length;i++){
            if(data[i].productid && data[i].productid === productid){
                 return i;;
            }
        }
        return -1;
    }

    function getRecord(colvalue,client,callbackFn) {
        var query = query2 + colvalue + "'";
        logger.log('info', 'getRecord - CQLQuery: ' + query);
        client.execute(query, function(err, result) {
            callbackFn(err, result);            
        });
    }

    function setRecords(data,client,callbackFn) {
        var organizations,orgname;
        var me = this;

        logger.log('info', 'setRecords ');
        dataOrganizations.getRecords(client, function(err,result){
            if (err) {
                logger.log('error', 'setRecords : Get Organizations Rec Failed:',err); 
                callbackFn(err,null);
             } else {
                    organizations = result.rows;
                    logger.log('info', 'setRecords : Get Organizations Rec Success with org data - ',JSON.stringify(organizations));
                   
                    dataPipeline.getRecords(client,function(err,result){
                        if (err) {
                             logger.log('error', 'setRecords : Get Pipelines Rec Failed:',err);
                             callbackFn(err,null);                             
                        } else{
                            pipelines = result.rows;  
                            processProductData(data,me,organizations,pipelines,client,callbackFn);                                                     
                        } 
                    });

                    
                    
             }

        });            
    }

    function processProductData(data,me,organizations,pipelines,client,callbackFn){
        var insertCount = 0, failedCount = 0, totalCount =0;
        for (var i = 0; i < data.length; i++) {
                        logger.log('info', 'processProductData data ' , JSON.stringify(data[i]));
                        me.setRecord(data[i],organizations,pipelines,client, function(err,result){
                                if (err) {
                                    failedCount += 1;
                                } else{
                                    insertCount += 1;
                                } 
                                totalCount= insertCount + failedCount; 
                                if (totalCount == data.length) {
                                    var msg= {
                                        "statusCode": 200,
                                        "message": "Records has been added successfully!",
                                        "totalRecord": data.length,
                                        "insertedRecords": insertCount,
                                        "failedRecords": failedCount
                                    };
                                    callbackFn(null,msg);
                                };                       
                            });                        
        }
    }
    
    function setRecord(data,organizations,pipelines,client,callbackFn) {
        var orgid,orgname,pipelineid,stages,stagesStr,isValidOrg,isValidStages,isValidProduct;

        isValidOrg=false,
        isValidStages=false;
        isValidProduct=false;
        stages=[];

        logger.log("info", "setRecord", "data.pipelineid",  data.pipelineid , "data.productname", data.productname);

        if(!data.productid || !data.productname){
             isValidProduct=false;
        }else{
            isValidProduct=true;
        }

        if(!data.orgid){
            isValidOrg=false;
            orgname="";
            orgid="";
        } else{
            orgid=data.orgid;
            orgname = dataOrganizations.getOrgName(orgid,organizations);
            if (orgname !="") {
                isValidOrg=true;
            }   
        }

        if (!data.pipelineid) {
            pipelineid="";
            isValidStages=false;
            stagesStr="[]";
        } else{
            pipelineid= data.pipelineid;
            stages = dataPipeline.getStageRecords(pipelineid,pipelines);
            logger.log("stages",stages.length, "stages" , stages);
            if (stages.length>0) {
                isValidStages=true;
                var lastItemIndex = stages.length-1;
                 stagesStr = "[";
                    for(var i=0;i<stages.length;i++){
                        stagesStr = stagesStr + "{stageid:'"+ stages[i].stageid +"', stageseq:" + stages[i].stageseq + ", stagename:'" + stages[i].stagename + "', stagetype:'" + stages[i].stagename + "'}";
                        if (i<lastItemIndex) {
                            stagesStr = stagesStr + ",";
                        };                
                    }
                    stagesStr = stagesStr + "]";
            };
        }

        logger.log("info"," setRecord isValidOrg ", isValidOrg , " isValidStages",isValidStages,"isValidProduct",isValidProduct);

        if(isValidOrg && isValidStages && isValidProduct){
            var query = query3  + orgid + "','" + orgname + "','" + data.productid + "','" + data.productname + "','" + pipelineid + "'," + stagesStr + ");";
            logger.log('info', 'setRecord - CQLQuery: ' + query);
            client.execute(query, function(err, result) {
                callbackFn(err, result);            
            });    
        } else{
            callbackFn(true, null);
        }
        
    }
}

module.exports = new getProductsData();