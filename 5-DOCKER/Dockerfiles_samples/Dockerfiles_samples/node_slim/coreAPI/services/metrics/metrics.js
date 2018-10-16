/* 
 * This module is to manage Metric  operation .
 * @type Module
 */
var request = require('request');
var config = require('config');
var rootService = require("../services.js");

var resStaus = config.HTTP_Status;
var logLevel = config.logLevel;
var logger = new (require('../../utilityModule/logger/logger.js'));
var configData = config;
var _ = require('lodash');
var Decimal  = require('js-big-decimal');

function getMetricData() {   

    return {
        getData: getData,
    };

    function getData(orgId,metricName,successCallback, failureCallback) {
		var metricsQuery = {
		  "metrics": [
			{
			  "tags": {},
			  "name": "",
			  "group_by": [
				{
				  "name": "tag",
				  "tags": [
					"productid",
					 "orgid"
				  ]
				}
			  ],
			  "aggregators": [
				{
				  "name": "sum",
				  "align_sampling": false,
				  "sampling": {
					"value": "2",
					"unit": "weeks"
				  },
				  "align_start_time": false
				},
				{
				  "name": "avg",
				  "align_sampling": false,
				  "sampling": {
					"value": "",
					"unit": "weeks"
				  },
				  "align_start_time": false
				}
			  ]
			}
		  ],
		  "cache_time": 0,
		  "start_relative": {
			"value": "",
			"unit": ""
		  },
		  "end_relative": {
			"value": "",
			"unit": ""
		  }
		}
	
            var result={},
            curr=0, 
            avg=0;

            metricsQuery.metrics[0].name = metricName;
            metricsQuery.metrics[0].group_by[0].tags[0].orgid = orgId;

            var firstAggName;
			
			//logger.log("info","IQ the findindex - ", metricName, (metricName ==  "technicaldebt"  || metricName ==  "onholditems"));
			
 			if(metricName == "storypoints" || metricName == "deploymenttotaltime" ) {
				firstAggName = "avg";
			} else if (metricName ==  "technicaldebt"  || metricName ==  "onholditems" || metricName =="openitems") {
				firstAggName =  "max";
			} else { 
				firstAggName =  "sum";
			}
			
			metricsQuery.metrics[0].aggregators[0].name = firstAggName;
			metricsQuery.metrics[0].aggregators[1].sampling.value = "2";
			
			metricsQuery.start_relative.value = "2"
			metricsQuery.start_relative.unit = "weeks"
			
			metricsQuery.end_relative.value = "1"
			metricsQuery.end_relative.unit = "seconds"
			
			logger.log("info","The first query: ",JSON.stringify(metricsQuery,null,2));

			rootService.postDataQueryToKairosDB(orgId,metricsQuery,function(data){
            var current= getFormatedVal(data);
             
			//Rest of the sprint
			metricsQuery.metrics[0].aggregators[1].sampling.value = "8";
			
			metricsQuery.start_relative.value = "8"
			metricsQuery.start_relative.unit = "weeks"

			metricsQuery.end_relative.value = "2"
			metricsQuery.end_relative.unit = "weeks"

			logger.log("info","The second query: ",JSON.stringify(metricsQuery,null,2));

            rootService.postDataQueryToKairosDB(orgId,metricsQuery,function(data){
                 var average= getFormatedVal(data);
                 var result ={}, results=[];
                 
                 for(var i=0;i<current.length;i++){
                    result = {};
                    result.metrics= metricName;
					
					logger.log("info","The values are - ",current[i].current);
					
					var curr1 = new Decimal(current[i].current);
					var avg1 = 	new Decimal (average[i].current);
								
					curr1 = Decimal.divide(curr1.getValue(), 1, 2);
					avg1 = Decimal.divide(avg1.getValue(), 1, 2);
					
					logger.log("info","The values are - ",current[i].current, curr1, parseFloat(curr1))
                    result.current = parseFloat(curr1);
                    result.average = parseFloat(avg1);

					if(current[i].current > 0) {
						result.productname = current[i].productname;
						result.productid = current[i].productid;
						result.orgname = current[i].orgname;
						result.org = current[i].orgid;
					
						var diff = curr1 - avg1;
						var diffperc = ((diff/avg1)*100);
						
						diff = Decimal.divide(diff, 1, 2);
						diffperc = Decimal.divide(diffperc, 1, 2);
						
						result.diff = parseFloat(diff);
						result.diffperc = parseFloat(diffperc);
						
					} else if (average[i].current > 0) {
						result.productname = average[i].productname;
						result.productid = average[i].productid;
						result.orgname = average[i].orgname;
						result.org = average[i].orgid;
						var diff = new Decimal(curr1.sub(avg1), 2);
						result.diff = parseFloat(diff);
						result.diffperc = parseFloat(100);
					}					
                    results.push(result);
                 }

                 successCallback(results);
             },failureCallback);

         },failureCallback);     
    }

    function getFormatedVal(data){

        var queries = data.queries;
        var results=[];
        var responseData = [];
		
		if(queries[0].sample_size > 0) {

			queries.forEach(function(q) {
			q.results.forEach(function(qr) {
				var t = {};
				var group = qr.tags;
				t.productname = group.productname[0];
				t.productid = group.productid[0];
				t.orgname = group.orgname[0];
				t.orgid = group.orgid[0];
				t.current= qr.values[0][1];
				results.push(t); 				   
				});        
			});
		} else {
			var t = {};
			t.current= 0;
			results.push(t); 
		}

        return results;
    }
}

module.exports = new getMetricData();