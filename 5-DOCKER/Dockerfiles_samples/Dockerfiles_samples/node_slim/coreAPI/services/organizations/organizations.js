var logger = new (require('../../utilityModule/logger/logger.js'));

function getOrganizationsData() {   
    var query = "SELECT * from organizations";

    return {
        getRecords: getRecords,
        getOrgName:getOrgName
    };

    function getRecords(client,callbackFn) {
        logger.log('info', 'getOrganizationsData - CQLQuery: ' + query);
        client.execute(query, function(err, result) {
            callbackFn(err, result);            
        });
    } 

    function getOrgName(orgid,data){
        var orgname = "";
        for(i=0;i<data.length;i++){
            if(data[i].orgid && data[i].orgid === orgid){
                 return data[i].orgname;
            }
        }
        return orgname;
    }

}

module.exports = new getOrganizationsData();