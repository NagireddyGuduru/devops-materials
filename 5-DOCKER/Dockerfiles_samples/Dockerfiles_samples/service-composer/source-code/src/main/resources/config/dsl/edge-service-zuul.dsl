DO [ WORKING_DIR edge-service-zuul ]

DO [ COPY /* / ]

DO [ DELETE /others/byte-buddy-agent* ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ DELETE /src/main/resources/stagemonitor* ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]

DO [ DELETE /Dockerfile ] WHEN [ IF_NOT_INCLUDED(docker-swarm) ]
DO [ BLOCK_DELETE /Dockerfile stagemonitor ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ BLOCK_DELETE /Dockerfile non-stagemonitor ] WHEN [ IF_INCLUDED(stagemonitor) ]
DO [ BLOCK_CLEAN /Dockerfile ]

DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/gateway/GatewayApplication.java stagemonitor ] - 
	WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ BLOCK_CLEAN /src/main/java/com/mphasis/ewt/gateway/GatewayApplication.java ]

DO [ DELETE /src/main/java/com/mphasis/ewt/gateway/filters/pre/Oauth2AuthorizationTokenFilter.java ] - 
	WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]

DO [ DELETE /src/main/java/com/mphasis/ewt/gateway/filters/post/ZipkinAuthRedirectionFilter.java ] - 
	WHEN [ OR(IF_NOT_INCLUDED(oauth2-authorization-service), IF_NOT_INCLUDED(zipkin-server)) ]	
		
DO [ BLOCK_DELETE /src/main/resources/application.yml oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml resource-service-template ] WHEN [ IF_NOT_INCLUDED(resource-service-template) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml client-application-java ] WHEN [ IF_NOT_INCLUDED(client-application-java) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml client-application-angular4 ] WHEN [ IF_NOT_INCLUDED(client-application-angular4) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml micro-frontends ] WHEN [ IF_NOT_INCLUDED(micro-frontends) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml zipkin-server ] WHEN [ IF_NOT_INCLUDED(zipkin-server) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml zuul-routes ] - 
	WHEN [ AND(IF_NOT_INCLUDED(micro-frontends), IF_NOT_INCLUDED(resource-service-template), IF_NOT_INCLUDED(client-application-java), - 
			IF_NOT_INCLUDED(client-application-angular4), IF_NOT_INCLUDED(zipkin-server)) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml micro-frontends-home ] - 
	WHEN [ OR(IF_NOT_INCLUDED(micro-frontends), IF_INCLUDED(client-application-java), IF_INCLUDED(client-application-angular4)) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml default-home-page ] - 
	WHEN [ OR(IF_INCLUDED(client-application-java), IF_INCLUDED(client-application-angular4), IF_INCLUDED(micro-frontends)) ]
DO [ BLOCK_CLEAN /src/main/resources/application.yml ] 	

DO [ DELETE /docker-application.yml ] WHEN [ IF_NOT_INCLUDED(docker-swarm) ]
DO [ BLOCK_DELETE /docker-application.yml oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /docker-application.yml resource-service-template ] WHEN [ IF_NOT_INCLUDED(resource-service-template) ]
DO [ BLOCK_DELETE /docker-application.yml client-application-java ] WHEN [ IF_NOT_INCLUDED(client-application-java) ]
DO [ BLOCK_DELETE /docker-application.yml client-application-angular4 ] WHEN [ IF_NOT_INCLUDED(client-application-angular4) ]
DO [ BLOCK_DELETE /docker-application.yml micro-frontends ] WHEN [ IF_NOT_INCLUDED(micro-frontends) ]
DO [ BLOCK_DELETE /docker-application.yml zipkin-server ] WHEN [ IF_NOT_INCLUDED(zipkin-server) ]
DO [ BLOCK_DELETE /docker-application.yml zuul-routes ] - 
	WHEN [ AND(IF_NOT_INCLUDED(micro-frontends), IF_NOT_INCLUDED(resource-service-template), IF_NOT_INCLUDED(client-application-java), -
			IF_NOT_INCLUDED(client-application-angular4), IF_NOT_INCLUDED(zipkin-server)) ]
DO [ BLOCK_CLEAN /docker-application.yml ] 	