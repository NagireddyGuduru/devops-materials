var logger = new (require('./utilityModule/logger/logger.js'));
var postData = require('./connector/postdata.js');
var host = 'http://localhost:3030';
var organizationData = require('./data/testdata-org-v8');
var usersData = require('./data/testdata-users-v8');
var pipelinesData = require('./data/testdata-pipelines-v8');
var productsData = require('./data/testdata-products-v8');
var metricsData = require('./data/testdata-metrics-v8');
var workitemsData = require('./data/testdata-workitems-v8');

logger.log('info','Devops Post TestData on ', host);

var apiName = process.argv[2];   

if(apiName=="metrics"){
    logger.log('info', 'Post Metrics API started');
    postData.metrics(host,metricsData, function(err, res, body){
        if(res.statusCode==200){
            logger.log('info', 'Metrics API Success');
           // logger.log('info','Response', body);
           
        } else{
            logger.log('error', 'Metrics API Failed' , body);
        }   
         
    });
} else if(apiName=="workitems"){
    logger.log('info', 'Post Workitems API started');
    postData.workitems(host,workitemsData, function(err, res, body){
        if(res.statusCode==200){
            logger.log('info', 'WorkItems API Success');
           // logger.log('info','Response', body);    
            
        } else{
            logger.log('error', 'WorkItems API Failed' , body);
        }   
         
     });
} else{
    logger.log('info', 'Post Onbording API\'s started');
    postData.organization(host,organizationData, function(err, res, body){
        if(res.statusCode==200){
            logger.log('info', 'Organization API Success');
            //logger.log('info','Response', body);
    
            postData.users(host,usersData, function(err, res, body){
                if(res.statusCode==200){
                    logger.log('info', 'Users API Success');
                   // logger.log('info','Response', body);
    
                    postData.pipelines(host,pipelinesData, function(err, res, body){
                        if(res.statusCode==200){
                            logger.log('info', 'Pipelines API Success');
                            //logger.log('info','Response', body);
    
                            postData.products(host,productsData, function(err, res, body){
                                if(res.statusCode==200){
                                    logger.log('info', 'Products API Success');
                                    //logger.log('info','Response', body);
    
                                } else{
                                    logger.log('error', 'Products API Failed' , body);
                                }   
                                 
                            });
    
            
                        } else{
                            logger.log('error', 'Pipelines API Failed' , body);
                        }   
                         
                    });
    
    
                } else{
                    logger.log('error', 'Users API Failed' , body);
                }   
                 
            });
    
           
        } else{
            logger.log('error', 'Organization API Failed' , body);
        }    
         
    });
}





