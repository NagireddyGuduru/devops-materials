var express = require('express');
var config = require('config');
var cassandra = require('cassandra-driver');
var moment = require("moment");
var request = require('request');
var bodyParser = require('body-parser');

var connectionConfig = require('./customModules/common/connectionConfig.js');
var logger = require('./utilityModule/logger/logger.js');
logger = new logger();
var authenticate = require('./middleware/auth/auth.js');


var environment = connectionConfig;
var morgan = require('morgan');
var app = express();
environment.getConnectionReady();
environment.getcassandraDBConnectionReady();

var organizations = require('./routes/organizations/organizations.js');
var metrics = require('./routes/metrics/metrics.js');
var leadTime = require('./routes/leadTime/leadTime.js');
var taskTimeWaitTime = require('./routes/taskTimeWaitTime/taskTimeWaitTime.js');
var workitems = require('./routes/workitems/workitems.js');
var pipelines = require('./routes/pipeline/pipeline.js');
var products = require('./routes/product/product.js');
var connectors = require('./routes/connectors/connectors.js');
 
var users = require('./routes/users/users.js');
var DBExecution = require('./routes/DBExecution.js');
app.use(morgan('tiny'));

/* Middleware for User Authentication 
 app.use(Authenticate Users)
 
 * */

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb'}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin,x-timestamp,x-user,x-appid,x-requestid,x-token, x-orgid,Content-Type, Accept");
    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        //move on
        next();
    }

});

app.use(authenticate.authMiddleware);
var DAY = 28800;
var logLevel = config.logLevel;

app.use(bodyParser.json());

app.use(config.routes.organizations, organizations);
app.use('/api/v1/metrics', metrics);
app.use('/api/v1/metrics/leadtime', leadTime);
app.use('/api/v1/metrics/taskwaittime', taskTimeWaitTime);
app.use('/api/v1/workitems', workitems);
app.use('/api/v1/pipelines', pipelines);
app.use('/api/v1/products', products);
app.use('/api/v1/users', users);
app.use('/api/v1/connectors', connectors);
 
// Temporery reference API to Create table using command
app.use('/api/v1/createTable', DBExecution);

process.on('uncaughtException', function(err) {
    logger.log(logLevel.error, 'Server Exception ::  ', err, '!');
});


app.listen(config.server.port, function() {
    logger.log(logLevel.info, 'Server listening on port ', config.server.port, '!');
});

module.exports = app;