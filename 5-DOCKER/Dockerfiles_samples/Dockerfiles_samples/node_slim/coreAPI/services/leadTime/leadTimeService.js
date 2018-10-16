
function leadTimeModule() {

//------------------------------------------------------------------------------
//----------------  Include Files  External Modules  ---------------------------
//------------------------------------------------------------------------------
    var request = require('request');
    var Sync = require('sync');
    var config = require('config');
    var moment = require('moment');
    var environment = require('../../customModules/common/connectionConfig.js');
    var logger = new (require('../../utilityModule/logger/logger.js'));
    var dataProducts = require('../../services/products/products.js'); 
    var comServ = require('../../services/services.js'); 
    var client = environment.getcassandraDBConnectionReady();
    var resStaus = config.HTTP_Status;
    var logLevel = config.logLevel;
    var DB = config.database;
    var kairosDB_Datapoints = DB.kairosREST_API.DB_HOST + DB.kairosREST_API.DB_PORT + DB.kairosREST_API.DB_DATAPOINTS;
    var kairosDB_Datapoints_Query = DB.kairosREST_API.DB_HOST + DB.kairosREST_API.DB_PORT + DB.kairosREST_API.DB_DATAPOINTS_QUERY;
    var configData = config;
    var orgIds = [];
    var _ = require('lodash');
	//var Decimal = require('js-decimal').Decimal;
	var Decimal  = require('js-big-decimal');


    //------------------------------------------------------------------------------
    //-------------------------- EXPOSED APIs  NAME --------------------------------
    //------------------------------------------------------------------------------

    return{
        generateLeadTime: calculateLeadTime,
		getLeadTimeQuery: getLeadTimeQuery
		
    };

    /*
     * 
     * @param {type} callbackSuccess
     * @param {type} callbackFail
     * @returns {undefined}
     */
    function calculateLeadTime(orgid, callbackSuccess, callbackFail) {
        orgIds = orgid;
		
        var products,
            productArray = [], 
            asyncTasks = [],
            sprintCount = 4;

        dataProducts.getRecords(client, function(err,result) {
            if (err) {
                callbackFail(err);
            } 
            else{

                var records=result.rows || [];
                products = _.sortBy(records, 'productid');
 
                productArray = filterProducts(orgid,products); 
 
                Sync(function() {
                 
                    for (var i = 0; i < productArray.length; i++) {
						logger.log('info', "Processing product - ", productArray[i].productid);
						
						var currentLeadTime = getLeadTimeforSprint.sync(null,productArray[i],2,0);
						productArray[i].currentLeadTime = parseFloat(currentLeadTime);

						var previousLeadTime = getLeadTimeforSprint.sync(null,productArray[i],8,2);
						productArray[i].averageLeadTime = parseFloat(previousLeadTime);

						var curr = parseFloat(currentLeadTime);
						var avg = parseFloat(previousLeadTime);
						var diff = curr - avg;
						var diffperc = ((diff/avg)*100);
						
						diff = Decimal.divide(diff, 1, 2);
						diffperc = Decimal.divide(diffperc, 1, 2);
						
						productArray[i].diff = parseFloat(diff);
						productArray[i].diffperc = parseFloat(diffperc);

                    }					
                    callbackSuccess(productArray);
                });
                
            } 
        });        
    }
	
	
	/*
     * 
     * @param {type} productArray
     * @param {type} startWeek
     * @param {type} endWeek
     * @returns {number} Lead Time
     */
    function getLeadTimeforSprint(productArray,startWeek,endWeek,callback) {
		var avgEnddt = 0;
		var avgStartDt = 0;
		var storyid = [];
		var tProdArr = [];
		
		var dataStages = productArray.stages;
		var stages = _.maxBy(dataStages, 'stageseq');
		var stageName = stages.stagename || ""; 

		tProdArr.push(productArray.productid);
		
		var kdQry = getLeadTimeQuery("enddate",tProdArr, [], stageName, startWeek,endWeek);
		var dataEd = comServ.kdQueryExecutor.sync(null,kdQry);
		var endDtResult = JSON.parse(dataEd);
		
		 //if (endDtResult.hasOwnProperty('queries') && endDtResult.queries.length > 0 && endDtResult.queries[0].results.length > 0) {
		 if (endDtResult.queries[0].sample_size > 0 ) {
			avgEnddt = endDtResult.queries[0].results[0].values[0][1]
			storyid = endDtResult.queries[0].results[0].tags.storyid;
		 } else {
			logger.log("error","No stories completed in the sprint.");
			callback(null,0);
			return 0;
		 }
		 
		stages = _.minBy(dataStages, 'stageseq');
		stageName = stages.stagename || ""; 
		
		var kdQry1 = getLeadTimeQuery("startdate",tProdArr, storyid, stageName, 999,0);
		
		var dataSt = comServ.kdQueryExecutor.sync(null,kdQry1);
		
		var startDtResult = JSON.parse(dataSt);

		if (startDtResult.queries[0].sample_size > 0) {
			 
			logger.log('info', "Start date query well - for Prod " + tProdArr);
			avgStartdt = startDtResult.queries[0].results[0].values[0][1]
		} else {
			logger.log("error","Start phase not found for the sprint.");
			callback(null,0);
			return 0;
		}
		 
		logger.log('info', " -- Average End Date is " + avgEnddt);
		logger.log('info', " -- Average Start  Date is " + avgStartdt);
		 
		var ed = new Decimal(avgEnddt);
		var st = new Decimal(avgStartdt);
		
		var result =  new Decimal(ed.subtract(st).getValue());

		var quotient = Decimal.divide(result.getValue(), 86400000, 2);
		logger.log('info', " The lead time : ",quotient );
		callback(null, quotient);
	}

    /*
     * 
     *  @param {type} orgid
     *  @param {type} products
      * @returns {products}
     */
    function filterProducts(orgids,products) {
	
        var results=[];
        for(var i=0;i<orgids.length;i++){
            orgids[i];
            for(var j=0;j<products.length;j++){
                 if(orgids[i] === products[j].orgid){
                    products[j].currentLeadTime = 0;                
                    products[j].averageLeadTime = 0;                
					results.push(products[j]);    
                }
            }
        }        
        return results;              
    }


     /**
     * Function to Generate Kario DB query for getting average start/end date for a given time period/
	 * if end period is 0 then by default "till today" (1 second) is assumed.
     * @param {metricsType} // start or end
     * @param {productid} // array of product id
     * @param {stagesequence} 
     * @param {startWeek} 
	 * @param {endWeek} //if 0 then default to 1 seconds
     * @returns [data]
     */

    function getLeadTimeQuery(metricsType,productId, storyId, stageNm, startWeek,endWeek){
	logger.log('info',"getLeadTimeQuery called");
        var kdQry = {};
        //logger.log('info',"IQ All parameter - " + metricsType + " - "  +  stageSeq + " - " + startWeek + " - " + endWeek);

		var endUnit = "weeks"; //default value
		if (endWeek == 0) {
			endWeek = 1;
			endUnit = "seconds"
		}
		
		 kdQry = {
			  "metrics": [
				{
				  "tags": {
					"metric": [
					  metricsType
					],
					"stage": [
					  stageNm
					],
					"productid":productId,
					"storyid": storyId
				  },
				  "name": "workitems",
			   "group_by": [
					{
					  "name": "tag",
					  "tags": [
						"productid"
					  ]
					}
				  ],
				  "aggregators": [
					{
					  "name": "avg",
					  "align_sampling": false,
					  "sampling": {
						"value": startWeek,
						"unit": "weeks"
					  },
					  "align_start_time": false
					}
				  ]
				}
			  ],
			  "cache_time": 0,
			  "start_relative": {
				"value": startWeek,
				"unit": "weeks"
			  },
			  "end_relative": {
				"value": endWeek,
				"unit": endUnit
				}
			}
			
			logger.log('info',"Lead time Query - " + JSON.stringify(kdQry,null,2));

        return kdQry;
    }


}

//------------------------------------------------------------------------------
//---------------------- Export GenerateExcel  Module -------------
//------------------------------------------------------------------------------

module.exports = leadTimeModule;