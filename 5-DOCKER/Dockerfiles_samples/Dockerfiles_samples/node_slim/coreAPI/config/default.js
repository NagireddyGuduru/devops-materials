'use strict';
var _ = require('lodash');
var env = process.env.NODE_ENV || 'dev';

var envApplication = require('./' + env + "/application.js");
var envConstants = require('./' + env + "/constants.js");
var defaults = {
    dataBaseQueries: {
    },
    //Response status messages 
    HTTP_Status: {
        code_200: {
            code: 200,
            message: ''
        },
        code_400: {
            code: 400,
            message: 'Bad Request'
        },
        code_500: {
            code: 500,
            message: 'Server Error!'
        },
        code_403: {
            code: 403,
            message: 'Forbidden : Page Not Found!'
        },
        code_600: {
            code: 600,
            message: 'Data Not Found!'
        }
    },
    logLevel: {
        info: 'info',
        error: 'error',
        debug: 'debug'
    },
    operationType: {
        get: 'GET',
        post: 'POST',
        put: 'PUT'
    }

};
module.exports = _.merge(defaults, envApplication, envConstants);