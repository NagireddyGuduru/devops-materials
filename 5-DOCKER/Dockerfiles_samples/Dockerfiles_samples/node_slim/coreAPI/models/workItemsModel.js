/* 
 * This module is to get the Organizations Model
 * 
 * 
 * 
 * @type Router
 */

var express = require('express');

var dataModel = {
    workitemData_clientid: [
        {
            "id": "DAS-10",
            "clientid": "ABC Bank",
            "productid": "Mobile Wallet",
            "type": "DEFECT",
            "status": "In Progress",
            "startdate": "2017-03-19T14:10:13.001Z",
            "enddate": "2017-05-29T09:12:32.031Z",
            "pipelineid": 1,
            "stagetypeid": 1
        }
    ],
    workitemData_clientid_: [
        {
            "orgid": 1,
            "orgname": "ABC Client",
            "pipelines": [
                {
                    "pipelineid": "PL1",
                    "stages": [
                        {
                            "stageid": "S1",
                            "stageseq": 1,
                            "stagename": "Requirement",
                            "stagetype": "REQ"
                        }
                    ]
                }
            ],
            "product": [
                {
                    "productid": "P1",
                    "productname": "Product 1",
                    "pipelineid": "PL1"
                }
            ]
        }
    ],
    workitemData_clientid_status: [
        {
            "id": "DAS-10",
            "clientid": "ABC Bank",
            "productid": "Mobile Wallet",
            "type": "DEFECT",
            "status": "In Progress",
            "startdate": "2017-03-19T14:10:13.001Z",
            "enddate": "2017-05-29T09:12:32.031Z",
            "pipelineid": 1,
            "stagetypeid": 1
        }
    ],
    workitemData_clientid__prodid_status: [
        {
            "id": "DAS-10",
            "clientid": "ABC Bank",
            "productid": "Mobile Wallet",
            "type": "DEFECT",
            "status": "In Progress",
            "startdate": "2017-03-19T14:10:13.001Z",
            "enddate": "2017-05-29T09:12:32.031Z",
            "pipelineid": 1,
            "stagetypeid": 1
        }
    ]
};


module.exports = dataModel;




