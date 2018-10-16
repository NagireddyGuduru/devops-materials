
var dataPipeline = require('../../services/pipeline/pipeline.js');

function dataConverter() {
    return {
          createWorkItems:createWorkItems        
     };

    function createWorkItems(data,stages,projectName) {

        var results =[], 
             workitems = [], 
             result={}, 
             workitem ={};

        var issues = data.issues;
        var stageid,stagename;

        result  = {"productid": "","workitems": []};

 
        for(var i=0;i<issues.length;i++){
         // console.log("issues",issues[i].fields.status.name);
          stagename = issues[i].fields.status.name || "";
          stageRecords = dataPipeline.getStageRecordID(stagename,stages);

          //console.log("createWorkItems stagename", stagename, " stageRecords",  stageRecords)

               workitem = { 
                    "id": issues[i].key,
                    "desc": issues[i].key,
                    "stageid": stageRecords.stageid, 
                    "startdate": issues[i].fields.created,
                    "enddate": issues[i].fields.updated,
                    "type": "STORY",
                    "status": "COMPLETE"
                };
                workitems.push(workitem);
        }        

        
        result.productid = projectName;
        result.workitems = workitems;
        results.push(result);

        //console.log("createWorkItems results",JSON.stringify(results));
        return results;
    }     
}

module.exports = new dataConverter();