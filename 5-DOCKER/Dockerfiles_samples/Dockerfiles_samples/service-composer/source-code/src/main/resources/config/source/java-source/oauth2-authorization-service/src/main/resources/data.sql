/* Populate USER_PROFILE Table */
INSERT INTO user_role(type) 
	SELECT * FROM (SELECT 'ADMINISTRATOR') AS tmp 
		WHERE NOT EXISTS (SELECT type FROM user_role WHERE type = 'ADMINISTRATOR') LIMIT 1;

INSERT INTO user_role(type) 
	SELECT * FROM (SELECT 'USER') AS tmp 
		WHERE NOT EXISTS (SELECT type FROM user_role WHERE type = 'USER') LIMIT 1;
		
  
/* Populate one Admin User with password as admin */
INSERT INTO app_user(user_name, password, first_name, last_name, email)
	SELECT * FROM (SELECT 'admin','$2a$10$ASBkTHX9bo/lS8LSKAwlNOgeeHfJ1ujiTN5KkHw6U3xiZZq9.2XmS', 'Default', 'Administrator', 'admin@mphasis.com') AS tmp 
		WHERE NOT EXISTS (SELECT user_name FROM app_user WHERE user_name = 'admin') LIMIT 1;
/* Populate one Normal User with password as password */
INSERT INTO app_user(user_name, password, first_name, last_name, email)
	SELECT * FROM (SELECT 'user','$2a$10$oBFdk6z9p96qF3EUTf8ZnOqhIGxV5FdTgoRbeEMV8oMN18zGPDRtC', 'Default', 'User' as first_name, 'user@mphasis.com') AS tmp 
		WHERE NOT EXISTS (SELECT user_name FROM app_user WHERE user_name = 'user') LIMIT 1;
  
/* Populate JOIN Table */
INSERT INTO app_user_user_role (user_id, user_role_id)
  	SELECT * FROM (SELECT user.id as user_id, role.id as role_id FROM app_user user, user_role role WHERE user.user_name='admin' and role.type='ADMINISTRATOR') as tmp 
  		WHERE NOT EXISTS (SELECT user_id FROM app_user_user_role WHERE user_id=tmp.user_id) LIMIT 1;
		
 
/* Creates an OAuth client for the demo service with password as password */
INSERT INTO oauth_client_details(client_id, client_secret, authorities) 
	SELECT * FROM (SELECT 'demo-service', '$2a$10$oBFdk6z9p96qF3EUTf8ZnOqhIGxV5FdTgoRbeEMV8oMN18zGPDRtC', 'TRUSTED_CLIENT') as tmp
		WHERE NOT EXISTS (SELECT client_id from oauth_client_details WHERE client_id = 'demo-service') LIMIT 1;

/* Creates an OAuth client for the demo client app with password as secret */  		
INSERT INTO oauth_client_details(client_id, client_secret, resource_ids, scope, authorized_grant_types, autoapprove, access_token_validity, refresh_token_validity) 
	SELECT * FROM (SELECT 'demo-client-app', '$2a$10$qQb2kGjilMk5nky9zAs5vu.k02rX8brW1F2LbYs0lR0Njhq8c4gui', 'SECURITY_SERVICE,DEMO_SERVICE', 'read,write', 'password,refresh_token,authorization_code,implicit,client_credentials', 'true', 3600, 86400) as tmp
		WHERE NOT EXISTS (SELECT client_id from oauth_client_details WHERE client_id = 'demo-client-app') LIMIT 1;
INSERT INTO oauth_client_details(client_id, client_secret, resource_ids, scope, authorized_grant_types, autoapprove, access_token_validity, refresh_token_validity) 
	SELECT * FROM (SELECT 'zipkin-server', '$2a$10$qQb2kGjilMk5nky9zAs5vu.k02rX8brW1F2LbYs0lR0Njhq8c4gui', 'SECURITY_SERVICE', 'read', 'password,refresh_token,authorization_code,implicit,client_credentials', 'true', 3600, 86400) as tmp
		WHERE NOT EXISTS (SELECT client_id from oauth_client_details WHERE client_id = 'zipkin-server') LIMIT 1;
INSERT INTO oauth_client_details(client_id, client_secret, resource_ids, scope, authorized_grant_types, autoapprove, access_token_validity, refresh_token_validity) 
	SELECT * FROM (SELECT 'eureka-server', '$2a$10$qQb2kGjilMk5nky9zAs5vu.k02rX8brW1F2LbYs0lR0Njhq8c4gui', 'SECURITY_SERVICE', 'read', 'password,refresh_token,authorization_code,implicit,client_credentials', 'true', 3600, 86400) as tmp
		WHERE NOT EXISTS (SELECT client_id from oauth_client_details WHERE client_id = 'eureka-server') LIMIT 1;


/* Clear the token store if you want to start on a clean store*/
DELETE FROM oauth_client_token;
DELETE FROM oauth_refresh_token;
DELETE FROM oauth_access_token;
DELETE FROM oauth_code;