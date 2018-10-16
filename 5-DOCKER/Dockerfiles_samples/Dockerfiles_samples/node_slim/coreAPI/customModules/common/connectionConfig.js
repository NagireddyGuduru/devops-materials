/* 
 * This module is to get the database connection establish
 * 
 * 
 * 
 * @type Module
 */



function getDBConnection() {
//------------------------------------------------------------------------------
//----------------  Include  Node Modules  ---------------------------
//------------------------------------------------------------------------------    
    var cassandra = require('cassandra-driver');
    var kdb = require('kairosdb');

    //Include custom module..
    var config = require('config');
    var logger = new (require('../../utilityModule/logger/logger.js'));

    var kairosDBConnection = config.database.kairosDB;
    var cassandraDBConnection = config.database.cassandraDB;
    var connectionPoolKairosDB = null;
    var connectionPoolCassandraDB = null;
    var messagesDB = config.staticMessages.dataBase;
    var logLevel = config.logLevel;

    //------------------------------------------------------------------------------
    //-------------------------- EXPOSED APIs  NAME --------------------------------
    //------------------------------------------------------------------------------

    return {
        getConnectionReady: getConnectionReady,
        getcassandraDBConnectionReady: getcassandraDBConnectionReady
    };

    /**
     * 
     * @returns {unresolved}
     */
    function getConnectionReady() {
        if (connectionPoolKairosDB !== null) {
            return(connectionPoolKairosDB);
        }
        connectionPoolKairosDB = kdb.init(kairosDBConnection.DB_HOST, kairosDBConnection.DB_PORT);
        connectionPoolKairosDB.version(function(err, version) {
            if (err) {
                logger.log(logLevel.error, kairosDBConnection.DB_NAME + ' ' + messagesDB.connectionFailed + " " + kairosDBConnection.DB_HOST + " : " + kairosDBConnection.DB_PORT);
                return;
            }
            logger.log(logLevel.info, kairosDBConnection.DB_NAME + ' ' + messagesDB.conectionSuccess + " " + kairosDBConnection.DB_HOST + " : " + kairosDBConnection.DB_PORT);
        });
        return connectionPoolKairosDB;
    }

    /**
     * 
     * @returns {unresolved}
     */
    function getcassandraDBConnectionReady() {
        if (connectionPoolCassandraDB !== null) {
            return(connectionPoolCassandraDB);
        }
        connectionPoolCassandraDB = new cassandra.Client({contactPoints: [cassandraDBConnection.DB_HOST, cassandraDBConnection.DB_HOST], keyspace: cassandraDBConnection.DB_KEYSPACE});
        connectionPoolCassandraDB.connect()
          .then(function() {
              logger.log(logLevel.info, cassandraDBConnection.DB_NAME + ' ' + messagesDB.conectionSuccess + " " + cassandraDBConnection.DB_HOST + " : " + cassandraDBConnection.DB_PORT);
          })
          .catch(function(err) {
              logger.log(logLevel.error, cassandraDBConnection.DB_NAME + ' ' + messagesDB.connectionFailed + " " + cassandraDBConnection.DB_HOST + " : " + cassandraDBConnection.DB_PORT);
          });
        return connectionPoolCassandraDB;
    }
}

//------------------------------------------------------------------------------
//-------------------------------Export DB Connection  Module ----------------
//------------------------------------------------------------------------------

module.exports = new getDBConnection();
//module.exports = connectionPoolCassandraDB;