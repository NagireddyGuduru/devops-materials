var config = require('config');
var environment = require('../customModules/common/connectionConfig.js');
var logger = new (require('../utilityModule/logger/logger.js'));
var _ = require('lodash');
var sha256 = require("sha256");
var request = require('request');

var appid = config.appKeys[0].appid,      
    appkey = _.find(config.appKeys, {'appid': appid});
 
function postData() {
        return {
            organization: organization,
            users:users,
            pipelines:pipelines,
            products:products,
            metrics:metrics,
            workitems:workitems
        };

    function getHeader(){

        var timestamp = Date.now();
        var text = appid + appkey.appkey + timestamp;
        var newToken = sha256(text);        
        var headers = {
            'x-timestamp': timestamp,
            'x-user': 'JohnSmith@abc.com',
            'x-appid': 'devopserver',
            'x-orgid': 'SYZBank',
            'x-token': newToken,
            'cache-control': 'no-cache'      
        };

        return headers;
    }

    function postData(url,data,delay,callbackFn){

        var options = {
            url: url,
            headers: getHeader(),
            body: data,
            json:true
        };
        delay=false;
        if(delay){
            setTimeout(function(){
                request.post(options, function(err, res, body) {
                    callbackFn(err, res, body);
                });    
            },50000);
        } else{
            request.post(options, function(err, res, body) {
                callbackFn(err, res, body);
            });  
        }

        
       
    }

    function organization(host,data,callbackFn){
        var url = host + '/api/v1/organizations';
        postData(url,data,false,callbackFn);
    }

    function users(host,data,callbackFn){
        var url = host + '/api/v1/users';
        postData(url,data,false,callbackFn);
    }

    function pipelines(host,data,callbackFn){
        var url = host + '/api/v1/pipelines';
        postData(url,data,false,callbackFn);
    }

    function products(host,data,callbackFn){
        var url = host + '/api/v1/products';
        postData(url,data,false,callbackFn);
    }

    function metrics(host,data,callbackFn){
        var url = host + '/api/v1/metrics';
        postData(url,data,true,callbackFn);
    }

    function workitems(host,data,callbackFn){
        var url = host + '/api/v1/workitems';
        postData(url,data,true,callbackFn);
    }
     
}


module.exports = new postData();