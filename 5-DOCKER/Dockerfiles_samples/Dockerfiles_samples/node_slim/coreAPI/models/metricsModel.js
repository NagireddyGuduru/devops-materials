/* 
 * This module is to get the Organizations Model
 * 
 * 
 * 
 * @type Router
 */

var express = require('express');

var dataModel = {
	
	metrics: [
	{
		"orgid" : "ABC",
		"orgname" : "ABC Bank",
		"products" : 
		[
            {
                "productid": "P1",
                "productname": "Mobile Wallet",
                "metrics": [
                    {
                        "name": "velocity",
                        "value": [120, 100, 110, 115]
                    },
                    {
                        "name": "totaldeployment",
                        "value": [15, 12, 14, 14]
                    },
                    {
                        "name": "locchanged",
                        "value": [200, 225, 240, 225]
                    },
                    {
                        "name": "faileddeployment",
                        "value": [2, 1, 2, 3]
                    },
                    {
                        "name": "ticketvolumn",
                        "value": [12, 10, 13, 14]
                    },
                    {
                        "name": "techdebt",
                        "value": [23, 20, 22, 20]
                    },
                    {
                        "name": "constraints",
                        "value": [23, 20, 19, 20]
                    },
                    {
                        "name": "leadtime",
                        "value": [132, 128, 130, 125]
                    },
                    {
                        "name": "averagedeploymenttime",
                        "value": [5, 6, 4, 4]
                    }
                ]
            },
            {
                "productid": "P2",
                "productname": "Open Bank API",
                "metrics": [
                    {
                        "name": "velocity",
                        "value": [110, 120, 115, 114]
                    },
                    {
                        "name": "totaldeployment",
                        "value": [14, 16, 14, 13]
                    },
                    {
                        "name": "locchanged",
                        "value": [250, 215, 240, 230]
                    },
                    {
                        "name": "faileddeployment",
                        "value": [2, 3, 2, 3]
                    },
                    {
                        "name": "ticketvolume",
                        "value": [11, 10, 10, 12]
                    },
                    {
                        "name": "techdebt",
                        "value": [21, 21, 22, 23]
                    },
                    {
                        "name": "constraints",
                        "value": [21, 23, 19, 19]
                    },
                    {
                        "name": "leadtime",
                        "value": [122, 128, 110]
                    },
                    {
                        "name": "averagedeploymenttime",
                        "value": [4, 2, 2, 3]
                    }
                ]
            },
            {
                "productid": "P3",
                "productname": "Commercial Bank Portal",
                "metrics": [
                    {
                        "name": "velocity",
                        "value": [120, 100, 110, 115]
                    },
                    {
                        "name": "totaldeployment",
                        "value": [15, 12, 14, 14]
                    },
                    {
                        "name": "locchanged",
                        "value": [200, 225, 240, 225]
                    },
                    {
                        "name": "faileddeployment",
                        "value": [2, 1, 2, 3]
                    },
                    {
                        "name": "ticketvolume",
                        "value": [12, 10, 13, 14]
                    },
                    {
                        "name": "techdebt",
                        "value": [23, 20, 22, 20]
                    },
                    {
                        "name": "constraints",
                        "value": [23, 20, 19, 20]
                    },
                    {
                        "name": "leadtime",
                        "value": [132, 128, 130, 125]
                    },
                    {
                        "name": "averagedeploymenttime",
                        "value": [5, 6, 4, 4]
                    }
                ]
            }
        ]
	},
	
	{
		"orgid" : "XYZ",
		"orgname" : "XYZ Bank",
		"products" : [
            {
                "productid": "P4",
                "productname": "Commercial Wallet",
                "metrics": [
                    {
                        "name": "velocity",
                        "value": [120, 100, 110, 115]
                    },
                    {
                        "name": "totaldeployment",
                        "value": [15, 12, 14, 14]
                    },
                    {
                        "name": "locchanged",
                        "value": [200, 225, 240, 225]
                    },
                    {
                        "name": "faileddeployment",
                        "value": [2, 1, 2, 3]
                    },
                    {
                        "name": "ticketvolumn",
                        "value": [12, 10, 13, 14]
                    },
                    {
                        "name": "techdebt",
                        "value": [23, 20, 22, 20]
                    },
                    {
                        "name": "constraints",
                        "value": [23, 20, 19, 20]
                    },
                    {
                        "name": "leadtime",
                        "value": [132, 128, 130, 125]
                    },
                    {
                        "name": "averagedeploymenttime",
                        "value": [5, 6, 4, 4]
                    }
                ]
            }
        ]
	}
	],
	
    metrics_clientid: [
            {
                "productid": "P1",
                "productname": "Mobile Wallet",
                "metrics": [
                    {
                        "name": "velocity",
                        "value": [120, 100, 110, 115]
                    },
                    {
                        "name": "totaldeployment",
                        "value": [15, 12, 14, 14]
                    },
                    {
                        "name": "locchanged",
                        "value": [200, 225, 240, 225]
                    },
                    {
                        "name": "faileddeployment",
                        "value": [2, 1, 2, 3]
                    },
                    {
                        "name": "ticketvolumn",
                        "value": [12, 10, 13, 14]
                    },
                    {
                        "name": "techdebt",
                        "value": [23, 20, 22, 20]
                    },
                    {
                        "name": "constraints",
                        "value": [23, 20, 19, 20]
                    },
                    {
                        "name": "leadtime",
                        "value": [132, 128, 130, 125]
                    },
                    {
                        "name": "averagedeploymenttime",
                        "value": [5, 6, 4, 4]
                    }
                ]
            },
            {
                "productid": "P2",
                "productname": "Open Bank API",
                "metrics": [
                    {
                        "name": "velocity",
                        "value": [110, 120, 115, 114]
                    },
                    {
                        "name": "totaldeployment",
                        "value": [14, 16, 14, 13]
                    },
                    {
                        "name": "locchanged",
                        "value": [250, 215, 240, 230]
                    },
                    {
                        "name": "faileddeployment",
                        "value": [2, 3, 2, 3]
                    },
                    {
                        "name": "ticketvolume",
                        "value": [11, 10, 10, 12]
                    },
                    {
                        "name": "techdebt",
                        "value": [21, 21, 22, 23]
                    },
                    {
                        "name": "constraints",
                        "value": [21, 23, 19, 19]
                    },
                    {
                        "name": "leadtime",
                        "value": [122, 128, 110]
                    },
                    {
                        "name": "averagedeploymenttime",
                        "value": [4, 2, 2, 3]
                    }
                ]
            },
            {
                "productid": "P3",
                "productname": "Commercial Bank Portal",
                "metrics": [
                    {
                        "name": "velocity",
                        "value": [120, 100, 110, 115]
                    },
                    {
                        "name": "totaldeployment",
                        "value": [15, 12, 14, 14]
                    },
                    {
                        "name": "locchanged",
                        "value": [200, 225, 240, 225]
                    },
                    {
                        "name": "faileddeployment",
                        "value": [2, 1, 2, 3]
                    },
                    {
                        "name": "ticketvolume",
                        "value": [12, 10, 13, 14]
                    },
                    {
                        "name": "techdebt",
                        "value": [23, 20, 22, 20]
                    },
                    {
                        "name": "constraints",
                        "value": [23, 20, 19, 20]
                    },
                    {
                        "name": "leadtime",
                        "value": [132, 128, 130, 125]
                    },
                    {
                        "name": "averagedeploymenttime",
                        "value": [5, 6, 4, 4]
                    }
                ]
            }
        ],
		
    metrics_productid: [
            {
                "productid": "P1",
                "productname": "Mobile Wallet",
                "metrics": [
                    {
                        "name": "velocity",
                        "value": [120, 100, 110, 115]
                    },
                    {
                        "name": "totaldeployment",
                        "value": [15, 12, 14, 14]
                    },
                    {
                        "name": "locchanged",
                        "value": [200, 225, 240, 225]
                    },
                    {
                        "name": "faileddeployment",
                        "value": [2, 1, 2, 3]
                    },
                    {
                        "name": "ticketvolumn",
                        "value": [12, 10, 13, 14]
                    },
                    {
                        "name": "techdebt",
                        "value": [23, 20, 22, 20]
                    },
                    {
                        "name": "constraints",
                        "value": [23, 20, 19, 20]
                    },
                    {
                        "name": "leadtime",
                        "value": [132, 128, 130, 125]
                    },
                    {
                        "name": "averagedeploymenttime",
                        "value": [5, 6, 4, 4]
                    }
                ]
            }
        ]
};


module.exports = dataModel;




