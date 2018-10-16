/* 
 * This module is to get the Organizations Model
 * 
 * 
 * 
 * @type Router
 */

var express = require('express');

var dataModel = {
    orgData: [
        {
            "orgid": 1,
            "orgname": "ABC Client"
        },
        {
            "orgid": 2,
            "orgname": "XYZ Client"
        },
        {
            "orgid": 3,
            "orgname": "PQR Client"
        }
    ],
    orgData_orgid: [
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
                },
                {
                    "pipelineid": "PL2",
                    "stages": [
                        {
                            "stageid": "S2",
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
                    "link": "/api/v1//organizations/1/products/P1",
                    "productname": "Product 1",
                    "pipelineid": "PL1"
                }
            ]
        }
    ],
    orgData_orgid_prodid: [
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
    ]
};


module.exports = dataModel;




