/* 
 * This module is to request authenticate 
 * 
 * 
 * 
 * @type Module
 */

//------------------------------------------------------------------------------
//----------------  Include Files Node Modules  ---------------------------
//------------------------------------------------------------------------------
var _ = require('lodash');
var sha256 = require("sha256");

//var SHA256 = require("crypto-js/sha256");

//------------------------------------------------------------------------------
//----------------  Include Files External Modules  ---------------------------
//------------------------------------------------------------------------------
var config = require('config');
var logger = new (require('../../utilityModule/logger/logger.js'));
var logLevel = config.logLevel;
var internal = {};
var authenticate = {
    authMiddleware: authMiddleware
  };

// check header parameters for x-appid, x-timestamp, x-requestid, x-token
/**
 * Middleware to verify all the incoming requests 
 * @param {type} req
 * @param {type} res
 * @param {type} next
 * @returns {undefined}
 */
function authMiddleware(req, res, next) {
    var requestUrl = req.originalUrl;
    try {

        var appid = req.headers['x-appid'],
            timestamp = req.headers['x-timestamp'], 
            token = req.headers['x-token'];

        var appkey = _.find(config.appKeys, {'appid': appid});

        if (appkey){
            if (appid && timestamp && token) {
                 var text = appid + appkey.appkey + timestamp;
                 var newToken = sha256(text);

                 //console.log("token ", token, " newToken" , newToken);

                 if (token == newToken) {
                    next(); 
                 } else{
                    internal.unauthorisedRequest(res);
                 }

            } else{
                internal.unauthorisedRequest(res);
            }
            
      } else{
         internal.unauthorisedRequest(res);
      } 
    } catch (e) {
        logger.log(logLevel.error, "Auth Middleware -> Exception: " + JSON.stringify(e));
    }
}

internal.unauthorisedRequest = function(res) {
    res.status(401).send({
        'statusCode': '401',
        'message': 'Unauthorised Request.'
    });
    res.end;
};

module.exports = authenticate;