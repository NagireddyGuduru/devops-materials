/**
 * Node constant for db connection basic on environment
 * 
 * 
 * 
 * @type Module
 */

function getEnvDBConnection() {

    //------------------------------------------------------------------------------
    //-------------------------- EXPOSED APIs  NAME --------------------------------
    //------------------------------------------------------------------------------
    return {
        getKairosDBConnectionString: getKairosDBConnectionString,
        getCassandraDBConnectionString: getCassandraDBConnectionString

    };

    /**
     * 
     * @returns {unresolved}
     */
    function getKairosDBConnectionString() {
        var environment = {
            ENV_CONNECTION_STRINGS: {
                DB_HOST: 'localhost', // config 
                DB_PORT: 8080 // config
            }
        };

        //return environment specific connection string;
        return environment.ENV_CONNECTION_STRINGS;
    }
    function getCassandraDBConnectionString() {
        var environment = {
            ENV_CONNECTION_STRINGS: {
                DB_HOST: '172.0.0.1', //config
                DB_PORT: 9042 // config
            }
        };

        //return environment specific connection string;
        return environment.ENV_CONNECTION_STRINGS;
    }
}


//------------------------------------------------------------------------------
//-------------------------------Export Constant Module ------------------------
//------------------------------------------------------------------------------

module.exports = getEnvDBConnection;