var logger = new (require('../../utilityModule/logger/logger.js'));

function getPipelineData() {
    var query1 = "SELECT pipelineid, stages from pipelines";
    var query2 = "SELECT stages from pipelines where pipelineid ='";
    var _ = require('lodash');
    
    return {
        getRecords: getRecords,
        getStageRecords:getStageRecords,
        getStageRecord:getStageRecord,
        getMinMaxStageSeq:getMinMaxStageSeq,
        getStageRecordID:getStageRecordID
     };

    function getRecords(client,callbackFn) {
        logger.log('info', 'getPipelineData - CQLQuery: ' + query1);
        client.execute(query1, function(err, result) {
            callbackFn(err, result);            
        });
    }  

    function getMinMaxStageSeq(req, res, client,pipelineid,onErrorCallbackFn,onSucessCallbackFn){
        var query = query2 + pipelineid + "';"
        client.execute(query, function(err, result) {
            if(err){
                onErrorCallbackFn(res,err);
            }
            else{
                //logger.log("info","result", JSON.stringify(result.rows[0]));
                var data = [];
                var stageResult = {"min":"","max":""};
                if(result.rows[0]){
                    data = result.rows[0].stages || [];
                    if(data){
                        stageResult = {"min":_.minBy(data, 'stageseq'),"max":_.maxBy(data, 'stageseq')};
                    }
                }
                 onSucessCallbackFn(stageResult);                
            }
            
        });
    }

    function getStageRecords(pipelineid,data){
        var result=[];
        logger.log('info', 'getStageRecords : pipelineid ' , pipelineid, " data ",JSON.stringify(data)); 
         
        for(var i=0;i<data.length;i++){
            logger.log("info", "getStageRecords : pipelineid", pipelineid , "data[i].pipelineid", data[i].pipelineid);
            if(pipelineid === data[i].pipelineid){
                result = data[i].stages || [];
                logger.log("info", "getStageRecords : result", result);
                return result;
            }            
        }
        return result;
    }  
    
    function getStageRecord(stageid,data){
        var result=[];
         for(var i=0;i<data.length;i++){
             if(stageid === data[i].stageid){
                result = data[i] || [];
                logger.log("info", "getStageRecord : result", result);
                return result;
            }            
        }
        return result;
    } 

    function getStageRecordID(stageName,data){
        var result=[];
         for(var i=0;i<data.length;i++){
             if(stageName === data[i].stagename){
                result = data[i] || [];
                logger.log("info", "getStageRecord : result", result);
                return result;
            }            
        }
        return result;
    }
}

module.exports = new getPipelineData();