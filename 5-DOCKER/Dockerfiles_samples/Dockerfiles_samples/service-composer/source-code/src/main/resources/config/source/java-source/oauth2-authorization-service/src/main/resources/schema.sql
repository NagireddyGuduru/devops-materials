/** Application Security related tables */

/*All Users gets stored in APP_USER table*/
CREATE TABLE IF NOT EXISTS app_user (
   id BIGINT NOT NULL AUTO_INCREMENT,
   user_name VARCHAR(30) NOT NULL,
   password VARCHAR(100) NOT NULL,
   first_name VARCHAR(30) NOT NULL,
   last_name  VARCHAR(30) NOT NULL,
   email VARCHAR(30) NOT NULL,
   PRIMARY KEY (id),
   UNIQUE (user_name)
);
   
/* USER_ROLE table contains all possible application roles */ 
CREATE TABLE IF NOT EXISTS user_role(
   id BIGINT NOT NULL AUTO_INCREMENT,
   type VARCHAR(30) NOT NULL,
   PRIMARY KEY (id),
   UNIQUE (type)
);
   
/* JOIN TABLE for MANY-TO-MANY relationship between users and roles*/  
CREATE TABLE IF NOT EXISTS app_user_user_role (
    user_id BIGINT NOT NULL,
    user_role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, user_role_id),
    CONSTRAINT FK_APP_USER FOREIGN KEY (user_id) REFERENCES app_user (id),
    CONSTRAINT FK_USER_PROFILE FOREIGN KEY (user_role_id) REFERENCES user_role (id)
);
   
/* Create persistent_logins Table used to store rememberme related stuff
CREATE TABLE IF NOT EXISTS persistent_logins (
    username VARCHAR(64) NOT NULL,
    series VARCHAR(64) NOT NULL,
    token VARCHAR(64) NOT NULL,
    last_used TIMESTAMP NOT NULL,
    PRIMARY KEY (series)
);
*/


/* Table for keeping the Client information for OAuth2 Authorization services */ 
CREATE TABLE IF NOT EXISTS oauth_client_details (
  client_id VARCHAR(256) PRIMARY KEY,
  resource_ids VARCHAR(256),
  client_secret VARCHAR(256),
  scope VARCHAR(256),
  authorized_grant_types VARCHAR(256),
  web_server_redirect_uri VARCHAR(256),
  authorities VARCHAR(256),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additional_information VARCHAR(4096),
  autoapprove VARCHAR(256)
);

/* Following tables are used for token store to persist the tokens alive across server starts */
CREATE TABLE IF NOT EXISTS oauth_client_token (
  token_id VARCHAR(256),
  token LONG VARBINARY,
  authentication_id VARCHAR(256) PRIMARY KEY,
  user_name VARCHAR(256),
  client_id VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS oauth_access_token (
  token_id VARCHAR(256),
  token LONG VARBINARY,
  authentication_id VARCHAR(256) PRIMARY KEY,
  user_name VARCHAR(256),
  client_id VARCHAR(256),
  authentication LONG VARBINARY,
  refresh_token VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS oauth_refresh_token (
  token_id VARCHAR(256),
  token LONG VARBINARY,
  authentication LONG VARBINARY
);

CREATE TABLE IF NOT EXISTS oauth_code (
  code VARCHAR(256), authentication LONG VARBINARY
);

CREATE TABLE IF NOT EXISTS oauth_approvals (
	userId VARCHAR(256),
	clientId VARCHAR(256),
	scope VARCHAR(256),
	status VARCHAR(10),
	expiresAt TIMESTAMP,
	lastModifiedAt TIMESTAMP NULL DEFAULT NULL
);