var logger = new (require('./utilityModule/logger/logger.js'));
var devopsConnector = require('./connector/connector.js');

logger.log('info','Devops Connector started'); 

devopsConnector.jiraConnector(function(msg, data){
	logger.log('info', 'jiraConnector' , msg , data);
 	process.exit(0); 
});