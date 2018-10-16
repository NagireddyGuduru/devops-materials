var request = require('request');

function jiraAuthentication() {
    return {
        auth: auth        
     };

    function auth(jiraConfig,callbackFn) { 

    if(jiraConfig.authType === "basic")  {
        var url = jiraConfig.hostname + "/rest/api/2/myself";        
        var options = {
            url: url ,
            headers: {
                'Authorization': 'Basic ' + jiraConfig.credentials                
            }
        };
        request.get(options, function(err, res, body) {
            callbackFn(err, res, body);
        });
    } else{
        var err = "authType not suppoted";
        callbackFn(err, null, null);
    }

         
         
    }      
}

module.exports = new jiraAuthentication();