var request = require('request');
var config = require('config');
var _ = require('lodash');
var sha256 = require("sha256");

function dataConnector() {
    return {
         postMetrics: postMetrics,
         postWorkItems:postWorkItems        
     };

    function postMetrics(metricName,data,callbackFn) {
        console.log('info', 'postMetrics started!');
        var metricURL = "http://localhost:3030/api/v1/metrics";
        var headers = getHeaders()
        var options = {
            url: metricURL,
            headers: headers,
            form: JSON.stringify(data)
        };

        console.log("postMetrics options",options);

        request.post(options, function(err, res, body) {
             callbackFn(err, res, body);
        });
     }

    function getHeaders(registerOrg){
        var appid = registerOrg.appid;
        var orgid = registerOrg.orgid;
        var appkey = _.find(config.appKeys, {'appid': appid});
        timestamp = Date.now();
        var text = appid + appkey.appkey + timestamp;
        var token = sha256(text);
        var headers = {
                'x-timestamp': timestamp,
                'x-appid': appid,
                'x-orgid': orgid,
                'x-token': token,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache '                          
        };
        return headers;
    }

    function postWorkItems(registerOrg,data,callbackFn) {
        console.log('info', 'postWorkItems');   
        console.log("info", "data", JSON.stringify(data));
        var workitemsURL = "http://localhost:3030/api/v1/workitems";
        var headers = getHeaders(registerOrg)
        var options = {
            url: workitemsURL,
            headers: headers,
            body: data,
            json: true
        };

        //console.log("postWorkItems",options);

        request.post(options, function(err, res, body) {
             callbackFn(err, res, body);
        });
             
    }     
}

module.exports = new dataConnector();