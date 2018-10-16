var config = require('config');
var dataProducts = require('../services/products/products.js'); 
var environment = require('../customModules/common/connectionConfig.js');
var logger = new (require('../utilityModule/logger/logger.js'));
var client = environment.getcassandraDBConnectionReady();

var jiraAuthentication = require('./jira/auth');
var jiraDataExtractor = require('./jira/dataExtractor');
var jiraDataConvertor = require('./jira/dataConvertor');
var jiraDataConnector = require('./jira/dataConnector');

//var mockdata = require('./data/mockdata.json');

function connector() {
    return {
         jiraConnector: jiraConnector
      };

    function jiraConnector(callbackFn) {
        var registerOrgs = config.onboarding.organizations;
        var integratedApps=[];
        
        for(var i=0;i<registerOrgs.length;i++){
         	 integratedApps = registerOrgs[i].integratedApps;
        	 for(var j=0;j<integratedApps.length;j++){
        	 	if(integratedApps[j].name ==="jira"){
        	 		logger.log("info","Connector for Org Id", registerOrgs[i].orgid, "and jira hostname ", integratedApps[j].hostname);
        	 		startConnector(registerOrgs[i],integratedApps[j], callbackFn);
        	 	} else{
        	 		logger.log("error", "Application ", integratedApps[j].name, "is not supported for org id",registerOrgs[i].orgid);
        	 		process.exit(0);
        	 	}
        	 }
         }
    }         
}

function startConnector(registerOrg,integratedApp,callbackFn){

	var username = integratedApp.username,
		credentials = integratedApp.credentials,
		jiraHostName = integratedApp.hostname;

	var jiraConfig = {"authType":"basic","hostname":jiraHostName,"username":username,"credentials":credentials};
 
	 jiraAuthentication.auth(jiraConfig,function(err, res, body){

		    if (err) {
 		        callbackFn("jiraAuthentication auth err",err);            
		    } else {
		    	var data;
		    	try{
 		    		data = JSON.parse(body);
 		    	}
		    	catch (e) {
		    		 callbackFn("jiraAuthentication auth error : ",e);  
                     throw e;
                }
		    	if(!username || !data.name){
		    		callbackFn("jiraAuthentication auth err Invalid username","");  
		    	}
		    	else if(username === data.name){
		    		 	logger.log("info","jiraAuthentication Authorization Suceess !!");
		    		 	var projectName = "DCTP";	
		        		var products;
		
		        		dataProducts.getRecords(client, function(err,result){
			            if (err) {
			                logger.log('error', ' Connector : Products GET Method Failed ', JSON.stringify(err));
			                callbackFn("Connector : Products GET Method Failed",err); 	                
			            } else{
			                products=result.rows || [];              			               
		            		jiraDataExtractor.getStories(jiraConfig, function(err, res, body){
					        	logger.log("info","jiraDataExtractor Suceess !!");	
					        	 if (err) {
						            callbackFn(err);                  
						        } else if (res.statusCode == 200) {
						        	postDataToDevopsAPI(registerOrg,projectName,body,products,callbackFn);
			              		} else{
			 			           callbackFn("getStories Results are empty","");
						        }
					        });
			            }
			        });

		    		} else{
		    		 	callbackFn("jiraAuthentication auth err Invalid username","");	
		    		}        
		        		    
		    }        
		}); 

}

function getProduct(projectName,products){
	for(var i=0; i<products.length;i++){
   		if(projectName===products[i].productname){
    			return products[i];
   		}
   }
   return [];
}

function postDataToDevopsAPI(registerOrg,projectName,data,products,callbackFn) {

   var results = JSON.parse(data);
   var product = getProduct(projectName,products);
   var stages = product.stages || [];
   var workItemsData = jiraDataConvertor.createWorkItems(results,stages,projectName);

   jiraDataConnector.postWorkItems(registerOrg,workItemsData, function(err, res, body){
   		if (err) {
			callbackFn(err);               
	   	} else if (res.statusCode == 200) {
			callbackFn("WorkItems is posted","");
		} else{
			var msg = "postWorkItems is Failed with statusCode " + res.statusCode;
			callbackFn(msg ,"");
		}
                 
   });

}

module.exports = new connector();