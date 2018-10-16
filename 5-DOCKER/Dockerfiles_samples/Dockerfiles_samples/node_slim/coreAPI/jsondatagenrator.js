var moment = require("moment");
var logger = require('./utilityModule/logger/logger.js');
logger = new logger();
var nodeExcelToJson = require("node-excel-to-json");
var jsonfile = require('jsonfile');
var xlsx2json = require('xlsx2json');
var _ = require('lodash');
var dataFile = "data/testdata-nodejs-v8.xlsx";

var fileWorkItems = 'data/testdata-workitems-v8.json';
var fileMetrics = 'data/testdata-metrics-v8.json';

function processWorkItems(jsonArray){
     var result = '',
         firstDataRow =0, 
         lastDataRow =41,
         results = [], 
         workItems = [], 
         phases = [], 
         phase = {}, 
         storypoints = [], 
         deploymentsuccess = [], 
         deploymentfailure = [], 
         deploymenttotaltime = [], 
         locchange = [], 
         openitems = [], 
         onholditems = [], 
         technicaldebt = [];       

    logger.log("info", "Process workItems");

    var workitemSchema = {"productid": "", "workitems": []};

    for (var i = 0; i < 1; i++) {
            result = {};
            for (var j = 0; j < 42; j++) {
                productid = jsonArray[2][j].A;

                if (!_.find(results, {"productid": productid})) {
                    var product = _.cloneDeep(workitemSchema);
                    product.productid = productid;
                    results.push(product);
                }
                var index = _.findIndex(results, {"productid": productid});
                if (index !== -1) {

                    phase = {};
                    startdate = new Date(jsonArray[2][j].E);
                    startdatestr = moment(startdate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    enddate = new Date(jsonArray[2][j].F);
                    enddatestr = moment(enddate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    phase = {"id": jsonArray[2][j].B, "desc": jsonArray[2][j].B, "stageid": jsonArray[2][j].D, "startdate": startdatestr, "enddate": enddatestr, "type": "STORY", "status": "COMPLETE"};
                    results[index].workitems.push(phase);

                    phase = {};
                    startdate = new Date(jsonArray[2][j].J);
                    startdatestr = moment(startdate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    enddate = new Date(jsonArray[2][j].K);
                    enddatestr = moment(enddate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    phase = {"id": jsonArray[2][j].B, "desc": jsonArray[2][j].B, "stageid": jsonArray[2][j].I, "startdate": startdatestr, "enddate": enddatestr, "type": "STORY", "status": "COMPLETE"};
                    results[index].workitems.push(phase);

                    phase = {};
                    startdate = new Date(jsonArray[2][j].O);
                    startdatestr = moment(startdate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    enddate = new Date(jsonArray[2][j].P);
                    enddatestr = moment(enddate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    phase = {"id": jsonArray[2][j].B, "desc": jsonArray[2][j].B, "stageid": jsonArray[2][j].N, "startdate": startdatestr, "enddate": enddatestr, "type": "STORY", "status": "COMPLETE"};
                    results[index].workitems.push(phase);

                    phase = {};
                    startdate = new Date(jsonArray[2][j].T);
                    startdatestr = moment(startdate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    enddate = new Date(jsonArray[2][j].U);
                    enddatestr = moment(enddate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    phase = {"id": jsonArray[2][j].B, "desc": jsonArray[2][j].B, "stageid": jsonArray[2][j].S, "startdate": startdatestr, "enddate": enddatestr, "type": "STORY", "status": "COMPLETE"};
                    results[index].workitems.push(phase);

                    phase = {};
                    startdate = new Date(jsonArray[2][j].Y);
                    startdatestr = moment(startdate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    enddate = new Date(jsonArray[2][j].Z);
                    enddatestr = moment(enddate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    phase = {"id": jsonArray[2][j].B, "desc": jsonArray[2][j].B, "stageid": jsonArray[2][j].X, "startdate": startdatestr, "enddate": enddatestr, "type": "STORY", "status": "COMPLETE"};
                    results[index].workitems.push(phase);

                    phase = {};
                    startdate = new Date(jsonArray[2][j].AD);
                    startdatestr = moment(startdate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    enddate = new Date(jsonArray[2][j].AE);
                    enddatestr = moment(enddate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    phase = {"id": jsonArray[2][j].B, "desc": jsonArray[2][j].B, "stageid": jsonArray[2][j].AC, "startdate": startdatestr, "enddate": enddatestr, "type": "STORY", "status": "COMPLETE"};
                    results[index].workitems.push(phase);

                    phase = {};
                    startdate = new Date(jsonArray[2][j].AI);
                    startdatestr = moment(startdate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    enddate = new Date(jsonArray[2][j].AJ);
                    enddatestr = moment(enddate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    phase = {"id": jsonArray[2][j].B, "desc": jsonArray[2][j].B, "stageid": jsonArray[2][j].AH, "startdate": startdatestr, "enddate": enddatestr, "type": "STORY", "status": "COMPLETE"};

                    results[index].workitems.push(phase);
                    phase = {};
                    startdate = new Date(jsonArray[2][j].AN);
                    startdatestr = moment(startdate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    enddate = new Date(jsonArray[2][j].AO);
                    enddatestr = moment(enddate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    phase = {"id": jsonArray[2][j].B, "desc": jsonArray[2][j].B, "stageid": jsonArray[2][j].AM, "startdate": startdatestr, "enddate": enddatestr, "type": "STORY", "status": "COMPLETE"};

                    results[index].workitems.push(phase);
                    phase = {};
                    startdate = new Date(jsonArray[2][j].AS);
                    startdatestr = moment(startdate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    enddate = new Date(jsonArray[2][j].AT);
                    enddatestr = moment(enddate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    phase = {"id": jsonArray[2][j].B, "desc": jsonArray[2][j].B, "stageid": jsonArray[2][j].AR, "startdate": startdatestr, "enddate": enddatestr, "type": "STORY", "status": "COMPLETE"};
                    results[index].workitems.push(phase);

                    phase = {};
                    startdate = new Date(jsonArray[2][j].AX);
                    startdatestr = moment(startdate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    enddate = new Date(jsonArray[2][j].AY);
                    enddatestr = moment(enddate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    phase = {"id": jsonArray[2][j].B, "desc": jsonArray[2][j].B, "stageid": jsonArray[2][j].AW, "startdate": startdatestr, "enddate": enddatestr, "type": "STORY", "status": "COMPLETE"};


                    results[index].workitems.push(phase);

                }
            }
        }

    return results;
}

function processMetrics(jsonArray){
    var  result = '', 
         results = [], 
         workItems = [], 
         phases = [], 
         phase = {}, 
         storypoints = [], 
         deploymentsuccess = [], 
         deploymentfailure = [], 
         deploymenttotaltime = [], 
         locchange = [], 
         openitems = [], 
         onholditems = [], 
         technicaldebt = [];  

        logger.log("info", "Process Metrics");
        preProd = jsonArray[4][1].A || "";
 
        currProd = preProd;
        storypoints = [];
        deploymentsuccess = [];
        deploymentfailure = [];
        deploymenttotaltime = [];
        locchange = [];
        openitems = [];
        technicaldebt = [];
        onholditems = [];
        var productSchema = {"productid": "", 'metrics': {"storypoints": storypoints, "deploymentsuccess": deploymentsuccess, "deploymentfailure": deploymentfailure, "deploymenttotaltime": deploymenttotaltime, "locchange": locchange, "openitems": openitems, "onholditems": onholditems, "technicaldebt": technicaldebt}};

        for (var k = 1; k < 2; k++) {

            for (var j = 0; j < 42; j++) {

                var level2Data = jsonArray[4][j];
                var productid = level2Data.A;

                 if (!_.find(results, {"productid": productid})) {
                    var product = _.cloneDeep(productSchema);
                    product.productid = productid;
                    results.push(product);
                }

                var index = _.findIndex(results, {"productid": productid});
                if (index !== -1) {
                    var resultData = [], resultDate, resultPoints;

                    //Storypoints - Velocity from Excel 
                    resultDate = moment(new Date(level2Data.D)).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    resultPoints = level2Data.E;
                    resultData.push(resultDate);
                    resultData.push(resultPoints);
                    results[index].metrics.storypoints.push(resultData);

                    //deploymentsuccess - Date_Deployment/ sprint
                    resultData = [], resultDate, resultPoints;
                    resultDate = moment(new Date(level2Data.F)).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    resultPoints = level2Data.G;
                    resultData.push(resultDate);
                    resultData.push(resultPoints);
                    results[index].metrics.deploymentsuccess.push(resultData);

                    //locchange - Date_LoC changed/ sprint
                    resultData = [], resultDate, resultPoints;
                    resultDate = moment(new Date(level2Data.H)).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    resultPoints = level2Data.I;
                    resultData.push(resultDate);
                    resultData.push(resultPoints);
                    results[index].metrics.locchange.push(resultData);

                    //deploymentfailure - Date_Failed Deployment / sprint
                    resultData = [], resultDate, resultPoints;
                    resultDate = moment(new Date(level2Data.J)).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    resultPoints = level2Data.K;
                    resultData.push(resultDate);
                    resultData.push(resultPoints);
                    results[index].metrics.deploymentfailure.push(resultData);

                    //deploymenttotaltime - Date_Failed Deployment / sprint
                    resultData = [], resultDate, resultPoints;
                    resultDate = moment(new Date(level2Data.J)).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    resultPoints = level2Data.S;
                    resultPoints = (resultPoints == '') ? "0" : resultPoints;
                    resultData.push(resultDate);
                    resultData.push(resultPoints);
                    results[index].metrics.deploymenttotaltime.push(resultData);

                    //openitems - Date_Ticket Volume
                    resultData = [], resultDate, resultPoints;
                    resultDate = moment(new Date(level2Data.L)).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    resultPoints = level2Data.M;
                    resultData.push(resultDate);
                    resultData.push(resultPoints);
                    results[index].metrics.openitems.push(resultData);

                    //onholditems - Date_# of items on Hold
                    resultData = [], resultDate, resultPoints;
                    resultDate = moment(new Date(level2Data.P)).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    resultPoints = level2Data.Q;
                    resultData.push(resultDate);
                    resultData.push(resultPoints);
                    results[index].metrics.onholditems.push(resultData);


                    //technicaldebt - Date_Technical Debt (TD)
                    resultData = [], resultDate, resultPoints;
                    resultDate = moment(new Date(level2Data.N)).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    resultPoints = level2Data.O;
                    resultData.push(resultDate);
                    resultData.push(resultPoints);
                    results[index].metrics.technicaldebt.push(resultData);



                }




            }
             //console.log(JSON.stringify(results));


        }


        return results;
}

function writeJSONFile(targetFile,dataType,results){

    jsonfile.writeFile(targetFile, results, {spaces: 2}, function(err) {
            if (err) {
                logger.log("error",  dataType, "JSON is not created ", " :", err);
            }
            else {
                logger.log("info", dataType, "JSON is created at location", targetFile);
            }

        });

}


function jsonDataGenrator() {
    logger.log("info", "jsonDataGenrator");
    var startdate, enddate, startdatestr, enddatestr;
    var preProd, currProd;
    var results=[];

    xlsx2json(dataFile, {dataStartingRow: 2}).then(function(jsonArray) {        
        
        results = processWorkItems(jsonArray);
        
        writeJSONFile(fileWorkItems,"Workitems", results);        

        results = processMetrics(jsonArray);

        writeJSONFile(fileMetrics,"Metrics", results);       

    });

}

module.exports = jsonDataGenrator;

jsonDataGenrator();