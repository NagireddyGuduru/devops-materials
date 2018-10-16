DO [ WORKING_DIR client-application-java ]

DO [ COPY /* / ]

DO [ DELETE /others/byte-buddy-agent* ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ DELETE /src/main/resources/stagemonitor* ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]

DO [ DELETE /Dockerfile ] WHEN [ IF_NOT_INCLUDED(docker-swarm) ]
DO [ BLOCK_DELETE /Dockerfile stagemonitor ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ BLOCK_DELETE /Dockerfile non-stagemonitor ] WHEN [ IF_INCLUDED(stagemonitor) ]
DO [ BLOCK_CLEAN /Dockerfile ]

DO [ BLOCK_DELETE /src/main/resources/application.yml oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml non-oauth2-authorization-service ] WHEN [ IF_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml edge-service-zuul ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml non-edge-service-zuul ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml resource-service-template ] WHEN [ IF_NOT_INCLUDED(resource-service-template) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml micro-frontends ] WHEN [ IF_NOT_INCLUDED(micro-frontends) ]
DO [ BLOCK_CLEAN /src/main/resources/application.yml ]

DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/democlient/ClientApplication.java stagemonitor ] - 
	WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ BLOCK_CLEAN /src/main/java/com/mphasis/ewt/democlient/ClientApplication.java ]	

DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/democlient/interfaces/ApplicationServices.java resource-service-template ] - 
	WHEN [ IF_NOT_INCLUDED(resource-service-template) ]	
DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/democlient/interfaces/ApplicationServices.java oauth2-authorization-service ] - 
	WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]	
DO [ BLOCK_CLEAN /src/main/java/com/mphasis/ewt/democlient/interfaces/ApplicationServices.java ]

DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/democlient/interfaces/NavigationService.java oauth2-authorization-service ] - 
	WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]	
DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/democlient/interfaces/NavigationService.java micro-frontends ] - 
	WHEN [ IF_NOT_INCLUDED(micro-frontends) ]	
DO [ DELETE /src/main/java/com/mphasis/ewt/democlient/interfaces/NavigationService.java ] - 
	WHEN [ AND(IF_NOT_INCLUDED(oauth2-authorization-service), IF_NOT_INCLUDED(micro-frontends)) ]
DO [ BLOCK_CLEAN /src/main/java/com/mphasis/ewt/democlient/interfaces/NavigationService.java ]

DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/democlient/config/ServiceConfiguration.java oauth2-authorization-service ] - 
	WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]			
DO [ BLOCK_CLEAN /src/main/java/com/mphasis/ewt/democlient/config/ServiceConfiguration.java ] 	
DO [ DELETE /src/main/java/com/mphasis/ewt/democlient/config/Oauth2*.java ] - 
	WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]	
DO [ DELETE /src/main/java/com/mphasis/ewt/democlient/config/Sso*.java ] - 
	WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]	
DO [ DELETE /src/main/java/com/mphasis/ewt/democlient/config/SecurityConfiguration.java ] - 
	WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]	
	
DO [ DELETE /src/main/resources/templates/fragments/body.html ] WHEN [ IF_NOT_INCLUDED(micro-frontends) ]	
DO [ DELETE /src/main/resources/templates/fragments/_body.html ] WHEN [ IF_INCLUDED(micro-frontends) ]	
DO [ RENAME /src/main/resources/templates/fragments/_body.html body.html ]	