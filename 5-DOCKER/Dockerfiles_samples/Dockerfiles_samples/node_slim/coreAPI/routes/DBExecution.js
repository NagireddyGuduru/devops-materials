/* 
 * This module is to get the Organizations 
 * 
 * 
 * 
 * @type Router
 */

var express = require('express');
var daataModel = require("../models/organizationsModel.js");
var connectionConfig = require('../customModules/common/connectionConfig.js');
var router = express.Router();
var environment = connectionConfig;
var client = environment.getcassandraDBConnectionReady();
/*
 *  
 */

var querieSet = [
    {
        query: 'CREATE TABLE IF NOT EXISTS organizations( orgid text PRIMARY KEY,  orgname text)'
    },
    {
        query: 'CREATE TYPE IF NOT EXISTS stage (stageid text,stageseq int,stagename text,stagetype text)'

    },
    {
        query: 'CREATE TABLE IF NOT EXISTS pipelines ( pipelineid text PRIMARY KEY, stages list<frozen<stage>>)'

    }, {
        query: 'CREATE TABLE IF NOT EXISTS products ( productid text PRIMARY KEY, productname text, pipelineid text, orgid text, orgname text,stages list<frozen<stage>>)'

    }, {
        query: 'CREATE TABLE devopsdb.users (userid text PRIMARY KEY,createddate timestamp,designation text,expirydate timestamp,fullname text,locked boolean,orgids list<text>,password text)'
    }

];
for (var i = 0; i < querieSet.length; i++) {
    client.execute(querieSet[i].query, function(err, result) {
        if (err) {
            //console.log(err);
           // console.log("Table creation failed! ");
        } else {
           // console.log("Table creation success! ");
        }
    });
}

/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
router.get('/', function(req, res) {
    var query = "CREATE TABLE IF NOT EXISTS organizations ( orgid text PRIMARY KEY,  orgname text)";
    client.execute(query, function(err, result) {
        if (err) {
            res.status(500).send(
              {
                  "message": 'Server Error : DataBase Error',
                  statusCode: 500
              });
            res.end();
        } else {
            console.log(result.rows);
            res.status(200).send({
                "message": 'organizations Table created',
                statusCode: 200
            });
        }
    });
    // res.status(200).send(daataModel.orgData);
});
/**
 * 
 */
router.get('/:orgid', function(req, res) {
    if (req.params.orgid) {
        var query = "SELECT * from organizations WHERE orgid='" + req.params.orgid + "' ";
        console.log(query);
        client.execute(query, function(err, result) {
            if (err) {
                res.status(500).send(
                  {
                      "message": 'Server Error : DataBase Error',
                      statusCode: 500
                  });
                res.end();
            } else {
                console.log(result);
                res.status(200).send(result.rows);
            }
        });
    } else {
        res.status(400).send({
            "message": 'bad input parameter',
            statusCode: 400
        });
    }
    console.log(req.params);
});
/**
 * 
 */
router.get('/:orgid/product/:prodid', function(req, res) {

    if (req.params.orgid && req.params.prodid) {
        res.status(200).send(daataModel.orgData_orgid_prodid);
    } else {
        res.status(400).send({
            "message": 'bad input parameter',
            "statusCode": 400
        });
    }
    console.log(req.params);
});
/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
router.post('/', function(req, res) {
    if (req.body && req.body.length > 0) {
        var insertCount = 0;
        for (var i = 0; i < req.body.length; i++) {
            if (req.body[i].orgid && req.body[i].orgname) {
                var query = "INSERT INTO organizations (orgid, orgname) VALUES ('" + req.body[i].orgid + "','" + req.body[i].orgname + "')";
                console.log(query);
                client.execute(query, function(err, result) {
                    if (err) {
                        console.log('Failed ::  Insertion error ');
                        console.log("-------------------");
//                        res.status(500).send({
//                            "message": 'Server Error : Insertion error',
//                            errorCode: 500
//                        });
//                        res.end();
                        return;
                    } else {
                        insertCount = insertCount + 1;
                        console.log('Success :: Added to DB ' + insertCount);
                        console.log("-------------------");
                    }
                });
            }
        }
        console.log(insertCount + " " + req.body.length);
        var statusMessage = insertCount !== req.body.length ? 'partially ' : '';
        res.status(200).send({
            "message": 'Success :: Added to DB',
            statusCode: 200
        });
        res.end();
    } else {
        res.status(400).send({
            "message": 'bad input parameter',
            statusCode: 400
        });
        res.end();
    }

});
/**
 * 
 * @param {type} param1
 * @param {type} param2
 */
router.put('/', function(req, res) {
    if (req.body && req.body.length > 0) {
        for (var i = 0; i < req.body.length; i++) {
            if (req.body[i].orgid) {

                var query = "UPDATE organizations SET orgname='" + req.body[i].orgname + "' WHERE orgid='" + req.body[i].orgid + "' ";
                console.log(query);
                client.execute(query, function(err, result) {
                    if (err) {
                        console.log('Failed ::  Insertion error ');
                        console.log("-------------------");
//                        res.status(500).send({
//                            "message": 'Server Error : Insertion error',
//                            errorCode: 500
//                        });
//                        res.end();
//                        return;
                    } else {

                        console.log('Success :: Updated DB ');
                        console.log("-------------------");
                    }
                });
            }
        }

        res.status(200).send({
            "message": 'Success :: Updated  DB',
            statusCode: 200
        });
        res.end();
    } else {
        res.status(400).send({
            "message": 'bad input parameter',
            statusCode: 400
        });
        res.end();
    }

});
/**
 * 
 */
router.post('/product', function(req, res) {
    res.send('POST handler for organizations route.');
});
/**
 * 
 * @type @exp;router
 */
module.exports = router;




