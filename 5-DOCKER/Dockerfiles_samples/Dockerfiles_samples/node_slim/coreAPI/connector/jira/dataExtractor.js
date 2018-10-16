var request = require('request');

function dataExtractor() {
    
    return {
         getStories: getStories               
     };

    function getStories(jiraConfig,callbackFn) {
          var options = {
            url: jiraConfig.hostname + "/rest/api/2/search?jql=project = 10100 AND issuetype = Story",
            headers: {
                'Authorization': 'Basic ' + jiraConfig.credentials            
            }
        };
        
        request.get(options, function(err, res, body) {
            callbackFn(err, res, body);
        });
    }
}

module.exports = new dataExtractor();