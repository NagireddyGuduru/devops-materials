'use strict';
/* 
 * This module is exporting the metrics Services 
 * 
 * 
 * 
 * @type Service
 */
var request = require('request');
var config = require('config');
var moment = require('moment');
var environment = require('../customModules/common/connectionConfig.js');
var logger = new (require('../utilityModule/logger/logger.js'));
var client = environment.getcassandraDBConnectionReady();
var resStaus = config.HTTP_Status;
var logLevel = config.logLevel;
var DB = config.database;
var kairosDB_Datapoints = DB.kairosREST_API.DB_HOST + DB.kairosREST_API.DB_PORT + DB.kairosREST_API.DB_DATAPOINTS;
var kairosDB_Datapoints_Query = DB.kairosREST_API.DB_HOST + DB.kairosREST_API.DB_PORT + DB.kairosREST_API.DB_DATAPOINTS_QUERY;
var kairosDB_Datapoints_Delete  = DB.kairosREST_API.DB_HOST + DB.kairosREST_API.DB_PORT + DB.kairosREST_API.DB_DATAPOINTS_DELETE;
var configData = config;
/**
 * 
 * @type type
 */
var metricsServices = {
    getMetricsData: getMetricsData,
    getProductsData: getProductData,
    pushDataToKairosDB: pushDataToKairosDB,
    postDataQueryToKairosDB: postDataQueryToKairosDB,
    getOrgData: getOrgData,
    formatMetricsData: formatMetricsData,
	kdQueryExecutor: kdQueryExecutor,
	kdDeleteQueryExecutor: kdDeleteQueryExecutor
}
/**
 * Function to return metrics data
 * @param {type} metricname
 * @returns {undefined}
 */
function getMetricsData(orgIds, metricname, successCallback, failureCallback) {

    var metricApi = configData[metricname];

    //successCallback(metricApi);
    if (metricApi) {
        postDataQueryToKairosDB(orgIds, metricApi, successCallback, failureCallback);
    } else {
        failureCallback('Metrics Not Found!');
    }
//  

// console.log(metricApi);

}

/**
 * Function to get Products
 * @param {type} query
 * @param {type} successCallback
 * @param {type} failureCallback
 * @returns {undefined}
 */
function getProductData(query, successCallback, failureCallback) {
//console.log(query);
    client.execute(query, function(err, result) {
        if (err) {
            logger.log(logLevel.error, "Get Products Failed: ", JSON.stringify(err));
            failureCallback([]);
        } else {
            logger.log(logLevel.info, "Get Products Success : " + JSON.stringify(result.rows));
            successCallback(result.rows);
        }
    });
}

function getMetricsFormatedData(resultSet) {
    var queries = JSON.parse(result.body).queries;
    var responseData = [];
}

/**
 * Function to Push Data to KairosDB
 * @param {type} result
 * @param {type} successCallback
 * @param {type} failureCallback
 * @returns {undefined}
 */
function postDataQueryToKairosDB(orgIds, query, successCallback, failureCallback) {
    
    var data = query;
    data.metrics[0].tags.orgid = (orgIds);
    try {
        data = JSON.stringify(data);
    } catch (e) {
        throw e;
    }
    var options = {
        url: kairosDB_Datapoints_Query + "?query=" + data,
        form: data,
        headers: {
            'content-type': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    };
    request.get(options, function(err, res, body) {
        if (err) {
            logger.log(logLevel.error, "Services => postDataQueryToKairosDB :: Kairos DB Query Failed! : " + JSON.stringify(err));
            failureCallback(err);
            return;
        } else if (res.statusCode == 200 || res.statusCode == 204) {
            logger.log(logLevel.info, "Services => postDataQueryToKairosDB :: Kairos DB Query Success!");
            successCallback(JSON.parse(body));
            return;
        } else {
            logger.log(logLevel.error, "Services => postDataQueryToKairosDB :: Kairos DB Query Failed!");
            failureCallback({});
            return;
        }
    });
}
/**
 * Function to Push Data to KairosDB
 * @param {type} result
 * @param {type} successCallback
 * @param {type} failureCallback
 * @returns {undefined}
 */
function pushDataToKairosDB(result, successCallback, failureCallback) {
    var data = result;
    try {
        data = JSON.stringify(data);
        // data = [{"tags": {"organization": "ABC", "product": "Open Bank", "workitem": "STORY", "itemname": "Complete", "stage": "Requirement", "stageSequence": 1, "metric": "startdate"}, "name": "workitems", "datapoints": [[1487937600000, 1487937600000]]}, {"tags": {"organization": "ABC", "product": "Open Bank", "workitem": "STORY", "itemname": "Complete", "stage": "Requirement", "stageSequence": 1, "metric": "startdate"}, "name": "workitems", "datapoints": [[1487937600000, 1487937600000]]}];
        //data = JSON.stringify(data);
    } catch (e) {
        throw e;
    }
    var options = {
        url: kairosDB_Datapoints,
        form: data,
        headers: {
            'content-type': 'application/json',
            'Accept-Charset': 'utf-8'
        }
    };
    request.post(options, function(err, res, body) {
        if (err) {
            logger.log(logLevel.error, "Services => pushDataToKairosDB :: Kairos DB Insertion Failed! : " + JSON.stringify(err));
            failureCallback(err);
            return;
        } else if (res.statusCode == 200 || res.statusCode == 204) {
            logger.log(logLevel.info, "Services => pushDataToKairosDB :: Kairos DB Insertion Success!" + " " + res.statusCode + " " + JSON.stringify(options));
            successCallback();
            return;
        } else {
            logger.log(logLevel.error, "Services => pushDataToKairosDB :: Kairos DB Insertion Failed!");
            failureCallback({});
            return;
        }
    });
}

function formatMetricsData(metricName, result, callback) {
    var queries = result.queries;
    
    var responseData = [];
    queries.forEach(function(q) {
        q.results.forEach(function(qr) {
            var len = qr.values.length;
            if (len) {
                var t = {};
                var group = qr.group_by[1].group;
                t.productname = group.productname;
                t.productid = group.productid;
                t.org = group.orgname;
                t.org = group.orgid;
                var values = qr.values.map(function(mv) {
                    var v = {};
                    v.date = moment(mv[0]).format("YYYY-MM-DD HH:mm:ss");
                    v.value = mv[1];
                    return v;
                });
                var totalCumu = 0;
                var startIndex = (len > 4) ? len - 4 : 0;
                for (var i = startIndex; i < len; i++) {
                    totalCumu += values[i].value;
                }

                t.current = Math.round(values[len - 1].value);
                t.metrics = metricName;
                t.average = Math.round(totalCumu / (len - startIndex));
                responseData.push(t);
            }

        });
        
        callback(responseData);
    });
}


 	// IQ geenric query Excutor. Should be moved to utility
	function kdQueryExecutor(kdQry,callback) 
	{
	
	
	logger.log('info',"Executing query - " + JSON.stringify(kdQry) );
        var options = {
            url: kairosDB_Datapoints_Query,
            form: JSON.stringify(kdQry),
            headers: {
                'content-type': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        request.post(options, function(err, res, body) {
            if (err) {
				logger.log('error',"The error - ", err, body );
                callback(null,body);
				
				 //return {};
            } else if (res.statusCode == 200) {
				logger.log('info',"Query execution complete. Record Count - " + JSON.parse(body).queries[0].sample_size);
				 //return body;
                callback(null, body);
            } else {
				logger.log('info',"Empty result - " + body + " - " + res.statusCode);
               // return {};
				callback(null,body);
            }
        });
	}
	
		// IQ geenric Delete Excutor. Should be moved to utility
	function kdDeleteQueryExecutor(kdQry,callback) 
	{
	
	
	logger.log('info',"Executing Delete - " + JSON.stringify(kdQry) );
        var options = {
            url: kairosDB_Datapoints_Delete,
            form: JSON.stringify(kdQry),
            headers: {
                'content-type': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        request.post(options, function(err, res, body) {
            if (err) {
				logger.log('info',"The error " + err );
				logger.log('info',"The body " + body );
                callback(null,body);
				
				logger.log('info',"UQery - Error" );
				 //return {};
            } else if (res.statusCode == 200) {
				logger.log('info',"the body" +  JSON.parse(body).queries[0].sample_size );
				 //return body;
                callback(null, body);
            } else {
				logger.log('info',"Empty result - " + body + " - " + res.statusCode);
               // return {};
				callback(null,body);
            }
        });
	}
	

function getOrgData() {

}

module.exports = metricsServices;




