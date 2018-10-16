
function leadTimeModule() {

//------------------------------------------------------------------------------
//----------------  Include Files  External Modules  ---------------------------
//------------------------------------------------------------------------------
    var request = require('request');
    var Sync = require('sync');

    //------------------------------------------------------------------------------
    //-------------------------- EXPOSED APIs  NAME --------------------------------
    //------------------------------------------------------------------------------

    return{
        generateLeadTime: calculateLeadTime
    };

    /*
     * 
     * @param {type} callbackSuccess
     * @param {type} callbackFail
     * @returns {undefined}
     */
    function calculateLeadTime(callbackSuccess, callbackFail) {
        var options = {
            url: 'http://localhost:8080/api/v1/datapoints/query',
            form: JSON.stringify(getAPI_1ProductsDataModel()),
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
            if (res.statusCode == 200) {
                Sync(function() {
                    var productArray = [], asyncTasks = [];
                    var sprintCount = 4;
                    //console.log(JSON.parse(body));
                    var productList = getProductClientList(JSON.parse(body));

                    for (var i = 0; i < productList.length; i++) {
                        var product = productList[i];
                        productArray.push(
                          {
                              "product": product.product,
                              "client": product.client,
                              "leadTime": []
                          }
                        );
                        //console.log(productArray);

                        for (var j = 1; j < sprintCount + 1; j++) {

                            if (j === 1) {

                                var result = getAPI_2DataModel.sync(null, product.product, product.client);
                                //  console.log(JSON.parse(result));

                                result = JSON.parse(result);
                                if (result.hasOwnProperty('queries') && result.queries.length > 0 && result.queries[0].results.length > 0) {
                                    var workItems = result.queries[0].results;
                                    var itemLeadTime = [];
                                    for (var x = 0; x < workItems.length; x++) {
//                                        //console.log("sprint Count: "+j+" Product : "+product.product + " Client: " +product.client +  " Itemname: " +workItems[x].tags.itemname[0]);
                                        var currentSprintEndtime = workItems[x].values[0][1];
                                        var startTime = getWorkItemStartTime.sync(null, workItems[x]);
//                                        console.log("End Time: " + currentSprintEndtime);
//                                        console.log("start Time 1: " + startTime);
//                                         console.log("");
                                        var a = new Date(currentSprintEndtime);
                                        var b = new Date(startTime);
                                        var weeks = (a - b) / 604800000;
                                        weeks = Math.round(weeks * 100) / 100;
                                        itemLeadTime.push(weeks);
                                    }

//                                     console.log("Leadtime " + i + "  b " + itemLeadTime.toString());
                                    productArray[i].leadTime.push(getAVGLeadTime(itemLeadTime));
                                    //  console.log(productArray);

                                } else {
                                    productArray[i].leadTime.push(0);
                                }

                            } else {
//                                console.log(j);
                                var result = getAPI_3DataModel.sync(null, product.product, product.client, j * 2);

                                result = JSON.parse(result);
                                //console.log("Sprint >1  workitems: " + i + " sdf " + result);

                                if (result.hasOwnProperty('queries') && result.queries.length > 0 && result.queries[0].results.length > 0) {
                                    var workItems = result.queries[0].results;
                                    var itemLeadTime = [];
                                    for (var x = 0; x < workItems.length; x++) {
//                                        console.log("sprint Count: "+j+" Product : "+product.product + " Client: " +product.client +  " Itemname: " +workItems[x].tags.itemname[0]);
                                        var currentSprintEndtime = workItems[x].values[0][1];
                                        var startTime = getWorkItemStartTime.sync(null, workItems[x]);
//                                        console.log("End Time: " + currentSprintEndtime);
//                                        console.log("start Time: " + startTime);
//                                         console.log("");
                                        var a = new Date(currentSprintEndtime);
                                        var b = new Date(startTime);
                                        var weeks = (a - b) / 604800000;
                                        weeks = Math.round(weeks * 100) / 100;
                                        // console.log(weeks);
                                        itemLeadTime.push(weeks);
                                        //productArray[i].spintLeadTime = weeks;
                                    }

//                                    console.log("Leadtime 2 " + (getAVGLeadTime(itemLeadTime)));
                                    productArray[i].leadTime.push(getAVGLeadTime(itemLeadTime));

                                } else {
                                    productArray[i].leadTime.push(0);
                                }
                            }
                        }
                    }
//                    console.log("Leadtime " + JSON.stringify(productArray));
                    callbackSuccess(productArray);
                });
                // console.log(productArray);

            } else {
                callbackSuccess([]);
            }
        });

    }

    /**
     * Function to calculate the average lead time
     * @param {type} leadTimeArray
     * @returns {Number}
     */
    function getAVGLeadTime(leadTimeArray) {
        var avgLeadTime = 0;
        for (var i = 0; i < leadTimeArray.length; i++) {
            avgLeadTime += leadTimeArray[i]
        }
        //console.log("AVG LeadTime: " + avgLeadTime / leadTimeArray.length);
        return avgLeadTime / leadTimeArray.length;
    }

    /**
     * 
     * @param {type} obj
     * @param {type} callback
     * @returns {undefined}
     */
    function getWorkItemStartTime(obj, callback) {
        var data = {
            "metrics": [
                {
                    "tags": {
                        "client": [
                            obj.tags.client
                        ],
                        "product": [
                            obj.tags.product
                        ],
                        "phase": [
                            "Requirement"
                        ],
                        "metric": [
                            "startdate"
                        ],
                        "itemname": [
                            obj.tags.itemname[0]
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
            } else if (res.statusCode == 200) {
                callback(null, body);
            } else {
                callback(null, {});
            }

        });


    }

    /**
     * 
     * @param {type} rawData
     * @returns {Array|leadTimeModule.getProductClientList.productList}
     */
    function getProductClientList(rawData) {
        var data = [], productList = [];
        if (rawData.hasOwnProperty('queries') && rawData.queries.length > 0) {
            data = rawData.queries[0].results;
            for (var i = 0; i < data.length; i++) {
                productList.push({"product": data[i].tags.product[0], "client": data[i].tags.client[0]});
            }
        }
        return productList;
    }

    /**
     * 
     * @returns {leadTimeModule.getAPI_1ProductsDataModel.data}
     */
    function getAPI_1ProductsDataModel() {
        var data = {
            "metrics": [
                {
                    "tags": {
                        "phase": [
                            "Deploy to Production phase"
                        ]
                    },
                    "name": "workitems",
                    "group_by": [
                        {
                            "name": "tag",
                            "tags": [
                                "client",
                                "product",
                                "phase"
                            ]
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
        return data;
    }

    /**
     * 
     * @param {type} product
     * @param {type} client
     * @param {type} callback
     * @returns {undefined}
     */
    function getAPI_2DataModel(product, client, callback) {
        //console.log(product + " " + client);
        var data = {
            "metrics": [
                {
                    "tags": {
                        "phase": [
                            "Deploy to Production phase"
                        ],
                        "metric": [
                            "enddate"
                        ],
                        "client":
                          [client],
                        "product": [product]
                    },
                    "name": "workitems",
                    "group_by": [
                        {
                            "name": "tag",
                            "tags": [
                                "client",
                                "product",
                                "workitem",
                                "itemname"
                            ]
                        },
                        {
                            "name": "time",
                            "group_count": "1",
                            "range_size": {
                                "value": "2",
                                "unit": "weeks"
                            }
                        }
                    ]
                }
            ],
            "cache_time": 0,
            "start_relative": {
                "value": "2",
                "unit": "weeks"
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
            } else if (res.statusCode == 200) {
                callback(null, body);
            } else {
                callback(null, {});
            }
        });


    }

    /**
     * 
     * @param {type} product
     * @param {type} client
     * @param {type} weekCount
     * @param {type} callback
     * @returns {undefined}
     */
    function getAPI_3DataModel(product, client, weekCount, callback) {
        //console.log(product + " " + client);
        var data = {
            "metrics": [
                {
                    "tags": {
                        "phase": [
                            "Deploy to Production phase"
                        ],
                        "metric": [
                            "enddate"
                        ],
                        "client":
                          [client],
                        "product": [product]
                    },
                    "name": "workitems",
                    "group_by": [
                        {
                            "name": "tag",
                            "tags": [
                                "client",
                                "product",
                                "workitem",
                                "itemname"
                            ]
                        },
                        {
                            "name": "time",
                            "group_count": "1",
                            "range_size": {
                                "value": "2",
                                "unit": "weeks"
                            }
                        }
                    ]
                }
            ],
            "cache_time": 0,
            "start_relative": {
                "value": weekCount,
                "unit": "weeks"
            },
            "end_relative": {
                "value": weekCount - 2,
                "unit": "weeks"
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
            //console.log(body);
            if (err) {
                callback(null, {});
            } else if (res.statusCode == 200) {
                callback(null, body);
            } else {
                callback(null, {});
            }

        });
    }

}

//------------------------------------------------------------------------------
//---------------------- Export GenerateExcel  Module -------------
//------------------------------------------------------------------------------

module.exports = leadTimeModule;