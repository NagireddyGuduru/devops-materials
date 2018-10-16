/**
 * Dev Configuration
 */
'use strict';

// Dev specific configuration
var appConfig = {
    //application id-keys
    appKeys: [
        {appid: 'devopserver', appkey: 'opsview'}
    ],
    server: {
        // Port to run server on
        port: process.env.PORT || 3030,
        // Host/URL to run server on
        host: process.env.HOSTNAME || 'localhost',
        // Log level
        logLevel: 'dev'
    },
    database: {
        kairosDB: {
            DB_NAME: 'Kairos',
            DB_HOST: 'localhost', // config 
            DB_PORT: 8080 // config
        },
        kairosREST_API: {
            DB_NAME: 'Kairos',
            DB_HOST: 'http://localhost:', // config 
            DB_PORT: 8080, // config
            DB_DATAPOINTS: '/api/v1/datapoints',
            DB_DATAPOINTS_QUERY: '/api/v1/datapoints/query',
            DB_DATAPOINTS_TAGS: '/api/v1/datapoints/query/tags',
            DB_DATAPOINTS_DELETE: '/api/v1/datapoints/delete'
        },
        cassandraDB: {
            DB_NAME: 'Cassandra',
            DB_HOST: '127.0.0.1', //config
            DB_PORT: 9042, // config
            DB_KEYSPACE: 'devopsdb'
        }
    }, routes: {
        getMetrics: '/api/v1/metrics',
        updateMetrics: '/api/v1/metrics',
        getPipelines: '/api/v1/pipeline',
        getPipelineById: '/api/v1/pipeline/:pipelineid',
        updatePipeline: '/api/v1/pipeline',
        getOrganizations: '/api/v1/organizations',
        getOrganizationById: '/api/v1/organizations/:orgid',
        updateOrganizations: '/api/v1/organizations',
        getProducts: '/api/v1/products/',
        getProductById: '/api/v1/product/:productid',
        updateProducts: '/api/v1/products',
        updateWorkitem: '/api/v1/workitem',
        getTaskWaitTime: '/api/v1/taskwaittime/',
        getLeadTime: '/api/v1/leadtime/',
        metrics: '/api/v1/metrics',
        pipelines: '/api/v1/pipeline',
        pipelineById: '/api/v1/pipeline/:pipelineid',
        organizations: '/api/v1/organizations',
        organizationsById: '/api/v1/organizations/:orgid',
        products: '/api/v1/products/',
        productsById: '/api/v1/product/:productid',
        workitem: '/api/v1/workitem',
        taskwaittime: '/api/v1/taskwaittime',
        leadtime: '/api/v1/leadtime',
        users: '/api/v1/users',
        connectors:'/api/v1/connectors:connector'
    },
    routeNames: {
        org: 'organizations',
        metrics: 'metrics',
        workitem: 'workitem',
        pipeline: 'pipeline',
        product: 'product',
        taskwaittime: 'taskwaittime',
        leadtime: 'leadtime'
    },
    dbSelectQueries: {
        getOrgs: "SELECT * FROM organizations",
        getPipelines: "SELECT * FROM pipelines",
        getProducts: "SELECT orgid,productid,productname,pipelineid FROM products",
        getUsers: "SELECT * FROM usermaster"
    }
};

module.exports = appConfig;
