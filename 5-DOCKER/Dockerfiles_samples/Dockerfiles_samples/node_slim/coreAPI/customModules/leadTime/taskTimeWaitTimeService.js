
function taskWaitTimeModule() {

//------------------------------------------------------------------------------
//----------------  Include Files  External Modules  ---------------------------
//------------------------------------------------------------------------------
    var request = require('request');
    var Sync = require('sync');

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
        if (!validateParams(params)) {
            callbackFail("Missing Product or Client field");
        }
        var options = {
            url: 'http://localhost:8080/api/v1/datapoints/query/tags',
            form: JSON.stringify(getAPI_1ProductsDataModel(params)),
            headers: {
                'content-type': 'application/json',
                'Accept-Charset': 'utf-8'

            }
        };

        request.post(options, function(err, res, body) {
            if (err) {
                callbackFail(err);
                return;
            }
            else if (res.statusCode == 200) {
                Sync(function() {
                    var productArray = [], asyncTasks = [], phases = [];
                    var sprintCount = 4;
                    //console.log(body);
                    var phaseseq = formatPhasesAscOrder(JSON.parse(body));
                    //console.log(phaseseq);
                    for (var i = 0; i < phaseseq.length; i++) {
                        phases[i] = getPhasesByPhaseSeq_API2.sync(null, phaseseq[i], params);
                    }
                    //console.log(phases);
                    getTaskWaitTime(params, phaseseq, phases, callbackSuccess, callbackFail);

                });
                // console.log(productArray);

            } else {
                callbackSuccess([]);
            }
        });

    }

    /**
     * 
     * @param {type} params
     * @param {type} phaseseq
     * @param {type} phases
     * @param {type} callbackSuccess
     * @param {type} callbackFail
     * @returns {undefined}
     */
    function getTaskWaitTime(params, phaseseq, phases, callbackSuccess, callbackFail) {
        var result = getAPI_3DataModel.sync(null, params);
        var values = [];
        var count = (phaseseq.length * 2) - 1;
        //console.log("************************* " + count);
        //callbackSuccess(result);
        for (var i = 0; i < count; i++) {
            var workItem = [], isWorkItemAdded = false;
            for (var j = 0; j < result.length; j++) {
                //console.log(result[j].values[i]);
                if (i < result[j].values.length) {
                    workItem.push(result[j].values[i][1]);
                    isWorkItemAdded = true;
                    // console.log("I: "+ i + " J: "+ j+ " "+  result[j].values[i][1]);
                }
                // console.log(result[j].values[i][1]);
            }
            if (isWorkItemAdded == true) {
                values.push(workItem);
                isWorkItemAdded = false;

            }


            //console.log(i);

        }
        //console.log(values);

        var taskWaitTime = averageTaskTimeWaitTimeCalculation(values);
        //console.log(taskWaitTime);
        var responseObj = [];
        for (var i = 0; i < phases.length; i++) {
            responseObj.push({
                "phase": phases[i][0],
                "waittime": (i == 0) ? 0 : taskWaitTime[((i * 2) - 1)] - 1,
                "tasktime": taskWaitTime[i * 2] + 1
            });
        }
        //console.log(responseObj);
        callbackSuccess(responseObj);
    }

    /**
     * 
     * @param {type} valueArray
     * @returns {Array|taskWaitTimeModule.averageTaskTimeWaitTimeCalculation.result}
     */
    function averageTaskTimeWaitTimeCalculation(valueArray) {
        var result = [];
        for (var i = 0; i < valueArray.length; i++) {
            var avgTime = 0;
            for (var j = 0; j < valueArray[i].length; j++) {
                // console.log(valueArray[i][j]);
                avgTime += valueArray[i][j];
            }
            var avg = avgTime / valueArray[i].length;
            var days = Math.floor((avg / 1000) / 86400);

            result.push(days);

        }
        return result;
    }


    /**
     * 
     * @param {type} rawData
     * @returns {Array}
     */
    function formatPhasesAscOrder(rawData) {
        //console.log(rawData.hasOwnProperty('queries') && rawData.queries.length > 0 && rawData.queries[0].hasOwnProperty('results') && rawData.queries[0].results.length > 0);
        var phasesArr = [];
        if (rawData.hasOwnProperty('queries') && rawData.queries.length > 0 && rawData.queries[0].hasOwnProperty('results') && rawData.queries[0].results.length > 0) {
            //console.log(rawData.queries[0].results[0]);
            if (rawData.queries[0].results[0].tags.hasOwnProperty('phaseseq')) {
                var phases = rawData.queries[0].results[0].tags.phaseseq;
                for (var i = 0; i < phases.length; i++) {
                    phasesArr[i] = parseInt(phases[i]);
                }
            }
        }
        if (phasesArr.length == 0) {
            return [];
        }
        return phasesArr.sort(function(a, b) {
            return a - b
        });
    }

    /**
     * 
     * @param {type} phaseSeq
     * @param {type} params
     * @param {type} callback
     * @returns {undefined}
     */
    function getPhasesByPhaseSeq_API2(phaseSeq, params, callback) {
        var data = {
            "metrics": [
                {
                    "tags": {
                        "product": [
                            params.product
                        ],
                        "client": [
                            params.client
                        ],
                        "phaseseq": phaseSeq
                    },
                    "name": "workitems"

                }
            ],
            "cache_time": 0,
            "start_relative": {
                "value": "10",
                "unit": "years"
            }
        };

        var options = {
            url: 'http://localhost:8080/api/v1/datapoints/query/tags',
            form: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        request.post(options, function(err, res, body) {
            if (err) {
                callback(null, {});
            } else if (res.statusCode == 200) {
                var rawData = JSON.parse(body);

                if (rawData.hasOwnProperty('queries') && rawData.queries.length > 0 && rawData.queries[0].hasOwnProperty('results') && rawData.queries[0].results.length > 0) {
                    var phases = rawData.queries[0].results[0].tags.phase;
                    callback(null, phases);
                } else {
                    callback(null, '');
                }
            } else {
                callback(null, {});
            }
        });
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


        if (params.hasOwnProperty('product') && params.hasOwnProperty('client')) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * 
     * @returns {leadTimeModule.getAPI_1ProductsDataModel.data}
     */
    function getAPI_1ProductsDataModel(params) {

        var data = {
            "metrics": [
                {
                    "tags": {
                        "product": [
                            params.product
                        ],
                        "client": [
                            params.client
                        ]
                    },
                    "name": "workitems"

                }
            ],
            "cache_time": 0,
            "start_relative": {
                "value": "10",
                "unit": "years"
            }
        };
        return data;
    }

    /**
     * 
     * @param {type} params
     * @param {type} callback
     * @returns {undefined}
     */
    function getAPI_3DataModel(params, callback) {

        var data = {
            "metrics": [
                {
                    "tags": {
                        "product": [
                            params.product
                        ],
                        "client": [
                            params.client
                        ]
                    },
                    "name": "workitems",
                    "group_by": [
                        {
                            "name": "tag",
                            "tags": [
                                "workitem",
                                "itemname"
                            ]
                        }
                    ],
                    "aggregators": [
                        {
                            "name": "diff"
                        }
                    ]
                }
            ],
            "cache_time": 0,
            "start_relative": {
                "value": "10",
                "unit": "years"
            }
        };

        var options = {
            url: 'http://localhost:8080/api/v1/datapoints/query',
            form: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };
        request.post(options, function(err, res, body) {
            if (err) {
                callback(null, {});
            }
            else if (res.statusCode == 200) {
                var rawData = JSON.parse(body);
                if (rawData.hasOwnProperty('queries') && rawData.queries.length > 0 && rawData.queries[0].hasOwnProperty('results') && rawData.queries[0].results.length > 0) {
                    callback(null, rawData.queries[0].results);
                }

            } else {
                callback(null, {});
            }
        });


    }



}

//------------------------------------------------------------------------------
//---------------------- Export GenerateExcel  Module -------------
//------------------------------------------------------------------------------

module.exports = taskWaitTimeModule;