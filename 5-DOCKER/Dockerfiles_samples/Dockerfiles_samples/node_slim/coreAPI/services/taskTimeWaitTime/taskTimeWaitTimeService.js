
function taskWaitTimeModule() {

//------------------------------------------------------------------------------
//----------------  Include Files  External Modules  ---------------------------
//------------------------------------------------------------------------------
    var request = require('request');
    var Sync = require('sync');
    var config = require('config');
    var Decimal  = require('js-big-decimal');
    var _ = require('lodash');

    var environment = require('../../customModules/common/connectionConfig.js');
    var client = environment.getcassandraDBConnectionReady();
    var logger = new (require('../../utilityModule/logger/logger.js'));
	var comServ = require('../../services/services.js'); 
	var dataProducts = require('../../services/products/products.js'); 
    var leadTime = require('../../services/leadTime/leadTimeService.js'); 
    leadTime = new leadTime();


    var resStaus = config.HTTP_Status;
    var logLevel = config.logLevel;
    var DB = config.database;
    var kairosDB_Datapoints_Query = DB.kairosREST_API.DB_HOST + DB.kairosREST_API.DB_PORT + DB.kairosREST_API.DB_DATAPOINTS_QUERY;
    var kairosDB_Datapoints_Tags = DB.kairosREST_API.DB_HOST + DB.kairosREST_API.DB_PORT + DB.kairosREST_API.DB_DATAPOINTS_TAGS;
    var configData = config;

    //------------------------------------------------------------------------------
    //-------------------------- EXPOSED APIs  NAME --------------------------------
    //------------------------------------------------------------------------------

    return{
        generateTaskWaitTime: calculateTaskTime
    };

    /**
     * 
     * @param {type} callbackSuccess
     * @param {type} callbackFail
     * @returns {undefined}
     */
    function calculateTaskTime(params, callbackSuccess, callbackFail) {

		
		// get all stories for the given product which has ended in the last 2 weeks
		// get all stories for the given product which has ended in the last 2 - 8 weeks
		// save as query which will calculate average end and start time for a given products and sequence for the above calculated stories
		// for stires from step 1 , do diff query on the save as query
		// do the same for the rest of the week stories
		
		logger.log("info","calculateTaskTime called. The param - ", params.orgid, params.productid);
		
        if (!validateParams(params)) {
            callbackFail("Missing Productid or OrgId field");
        }
		
		var orgIds = params.orgid;
		var productId = params.productid;

        var products,
            productArray = [], 
            asyncTasks = [],
            sprintCount = 4;

		dataProducts.getRecord(productId,client, function(err,result) {
	       if (err) {
				logger.log("error", " Failed getting the product: ", productId);
                callbackFail(err);
            } 
            else{

                // calculation done by nodejs
                 getStageL3Data_V1(result,products,callbackSuccess);
                // TODO : Suppose to done by kariosdb. Temp solution to enable the manual calculation by nodejs 
                // calculation done by kariosdb, which takes time to load L3 page
                // getStageL3Data(result,products,callbackSuccess);
            } 
        }); 

        function getStageL3Data_V1(result,products,callbackSuccess){

            products=result.rows || [];
            
            var stages = _.maxBy(products[0].stages  , 'stageseq');
            var stageName = stages.stagename || ""; 

            Sync(function() {

                var kdQryCurr = leadTime.getLeadTimeQuery("enddate",products[0].productid, [], stageName, 2,0);
                var dataCurr = comServ.kdQueryExecutor.sync(null,kdQryCurr);

                var kdQryRest = leadTime.getLeadTimeQuery("enddate",products[0].productid, [], stageName, 8,2);
                var dataRest = comServ.kdQueryExecutor.sync(null,kdQryRest);
                    
                dataCurr = JSON.parse(dataCurr);
                dataRest = JSON.parse(dataRest);
                    
                var storyCurr = dataCurr.queries[0].results[0].tags.storyid
                var storyRest = dataRest.queries[0].results[0].tags.storyid
                var storyAll = storyCurr.concat(storyRest);
                    
                productArray.push(productId);       

                var currFlag = new Date().getTime().toString();
                var kdQryStageL3 = getStageQueryV2(productArray,storyAll, '',currFlag ); // can be used to get current and previous also
                var dataStageL3 = comServ.kdQueryExecutor.sync(null,kdQryStageL3 );

                var data = JSON.parse(dataStageL3);
                var results = data.queries[0].results;

                var responseObj=[];
  
                for(i=0;i<results.length;i++){

                var stageNameFrmL3Data,
                    stageSequenceFrmL3Data,
                    endTimeFrmL3Data,
                    startTimeFrmL3Data,
                    tasktimeFrmL3Data,
                    waittimeFrmL3Data,
                    prevIndex,
                    endTimePrev;
                    
                    stageNameFrmL3Data = results[i].tags.stage[0];
                   
                    endTimeFrmL3Data = results[i].values[0][1];
                    i=i+1;

                    startTimeFrmL3Data = results[i].values[0][1];
                    tasktimeFrmL3Data = endTimeFrmL3Data - startTimeFrmL3Data;

                    if(i==1){
                        waittimeFrmL3Data = 0; 
                    } else {
                        prevIndex =  i - 3;
                        endTimePrev = results[prevIndex].values[0][1];
                        waittimeFrmL3Data = startTimeFrmL3Data - endTimePrev;
                    }

                    var tt = new Decimal(tasktimeFrmL3Data);
                    var wt = new Decimal(waittimeFrmL3Data);
                        
                        tt = Decimal.divide(tt.getValue(), 86400000, 2);
                        wt = Decimal.divide(wt.getValue(), 86400000, 2);

                    responseObj.push({
                            "phase": stageNameFrmL3Data,
                            "waittime": parseFloat(wt),
                            "tasktime": parseFloat(tt)
                     });
                }
                
                callbackSuccess(responseObj);

            });
        }

        function getStageL3Data(result,products,callbackSuccess){

                products=result.rows || [];
                var dataStages = products.stages;
                var stages = _.maxBy(products[0].stages  , 'stageseq');
                var stageName = stages.stagename || ""; 

                 Sync(function() {
                    //IQ ermove this as per requirement. Two calls are not required as L3 does not have comparision.
                    var kdQryCurr = leadTime.getLeadTimeQuery("enddate",products[0].productid, [], stageName, 2,0);
                    var dataCurr = comServ.kdQueryExecutor.sync(null,kdQryCurr);

                    var kdQryRest = leadTime.getLeadTimeQuery("enddate",products[0].productid, [], stageName, 8,2);
                    var dataRest = comServ.kdQueryExecutor.sync(null,kdQryRest);
                    
                    dataCurr = JSON.parse(dataCurr);
                    dataRest = JSON.parse(dataRest);
                    
                    var storyCurr = dataCurr.queries[0].results[0].tags.storyid
                    var storyRest = dataRest.queries[0].results[0].tags.storyid
                    var storyAll = storyCurr.concat(storyRest);
                    
                    productArray.push(productId);       

                    var currFlag = new Date().getTime().toString();
                    var kdQryStageL3 = getStageQuery(productArray,storyAll, '',currFlag ); // can be used to get current and previous also
                    var dataStageL3 = comServ.kdQueryExecutor.sync(null,kdQryStageL3 );
                    
                    var kdQryL3 = {
                              "metrics": [
                                {
                                  "tags":   { "currFlag":[currFlag]},
                                  "name": "stageL3", 
                                  "aggregators": [
                                    {
                                      "name": "diff"
                                    }
                                  ]
                                }
                              ],
                              "cache_time": 0,
                              "start_relative": {
                                "value": "999",
                                "unit": "weeks"
                              }
                            }
                                                        
                    
                    var dataL3 = comServ.kdQueryExecutor.sync(null,kdQryL3);
                    dataL3 = JSON.parse(dataL3);
                    
                    var responseObj = [];
                    var theValues = dataL3.queries[0].results[0].values;
                    var stagesSeq = products[0].stages;
                    
                    var sortSeq = stagesSeq.sort(function(a, b) {
                        return a.stageseq - b.stageseq
                        })
                    
                    theValues.push(0);
                    for (var i = 0; i < sortSeq.length; i++) {
                        var cnt = i*2;
                        
                        var tt = new Decimal(theValues[cnt][1]);
                        var wt = new Decimal(theValues[cnt+1][1]);
                        
                        tt = Decimal.divide(tt.getValue(), 86400000, 2);
                        wt = Decimal.divide(wt.getValue(), 86400000, 2);
                        
                        responseObj.push({
                            "phase": sortSeq[i].stagename,
                            "waittime": parseFloat(wt),
                            "tasktime": parseFloat(tt)
                        });
                    }
                    callbackSuccess(responseObj);
                }); 
        }
    }
	
	
	function getStageQuery(productId, storyId,range,currFlag)
	{
	logger.log('info',"getStageQuery called");
        var kdQry = {};

		var tagName; 
			
			if (range == '') {
			tagName =  
				{"currFlag":currFlag}
			} else  {
				tagName =  
					{"range":range, "currFlag":currFlag}
			}
		
		 kdQry = {
			  "metrics": [
				{
				  "tags": {"productid":productId,
					"storyid": storyId},
				  "name": "workitems",
				  "group_by": [
					{
					  "name": "tag",
					  "tags": [
						"productid",
						"stageSequence",
						"stage",
						"metric"
					  ]
					}
				  ],
				  "aggregators": [      	
					{
					  "name": "avg",
					  "align_sampling": false,
					  "sampling": {
						"value": "999",
						"unit": "weeks"
					  },
					  "align_start_time": false
					}, { "name": "save_as", "metric_name": "stageL3", "tags": tagName, "ttl":"0"}
					
				  ]
				}
			  ],
			  "cache_time": 0,
			  "start_relative": {
				"value": "999",
				"unit": "weeks"
			  }
			}
			
			logger.log('info',"Stage Query - " + JSON.stringify(kdQry,null,2));

        return kdQry;
    }

    function getStageQueryV2(productId, storyId,range,currFlag)
    {
        logger.log('info',"getStageQuery called");
        var kdQry = {};

        var tagName; 
            
            if (range == '') {
            tagName =  
                {"currFlag":currFlag}
            } else  {
                tagName =  
                    {"range":range, "currFlag":currFlag}
            }
        
         kdQry = {
              "metrics": [
                {
                  "tags": {"productid":productId,
                    "storyid": storyId},
                  "name": "workitems",
                  "group_by": [
                    {
                      "name": "tag",
                      "tags": [
                        "productid",
                        "stageSequence",
                        "stage",
                        "metric"
                      ]
                    }
                  ],
                  "aggregators": [          
                    {
                      "name": "avg",
                      "align_sampling": false,
                      "sampling": {
                        "value": "999",
                        "unit": "weeks"
                      },
                      "align_start_time": false
                    }
                    
                  ]
                }
              ],
              "cache_time": 0,
              "start_relative": {
                "value": "999",
                "unit": "weeks"
              }
            }
            
            logger.log('info',"Stage Query - " + JSON.stringify(kdQry,null,2));

        return kdQry;
    }

    /**
     * 
     * @param {type} params
     * @returns {Boolean}
     */
    function validateParams(params) {
        if (params === null || params === undefined || params === "" || params === {}) {
            return false;
        }


        if (params.hasOwnProperty('productid') && params.hasOwnProperty('orgid')) {
            return true;
        } else {
            return false;
        }

    }

}

//------------------------------------------------------------------------------
//---------------------- Export GenerateExcel  Module -------------
//------------------------------------------------------------------------------

module.exports = taskWaitTimeModule;