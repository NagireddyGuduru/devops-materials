DO [ WORKING_DIR resource-service-template ]

DO [ COPY /* / ]

DO [ DELETE /others/byte-buddy-agent* ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ DELETE /src/main/resources/stagemonitor* ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]

DO [ BLOCK_DELETE /pom.xml api-documentation-swagger ] WHEN [ IF_NOT_INCLUDED(api-documentation-swagger) ]
DO [ BLOCK_DELETE /pom.xml config-server-spring ] WHEN [ IF_NOT_INCLUDED(config-server-spring) ]
DO [ BLOCK_DELETE /pom.xml spring-sleuth ] WHEN [ IF_NOT_INCLUDED(spring-sleuth) ]
DO [ BLOCK_DELETE /pom.xml zipkin-server ] WHEN [ IF_NOT_INCLUDED(zipkin-server) ]
DO [ BLOCK_DELETE /pom.xml eureka-server ] WHEN [ IF_NOT_INCLUDED(eureka-server) ]
DO [ BLOCK_CLEAN /pom.xml ]

DO [ DELETE /Dockerfile ] WHEN [ IF_NOT_INCLUDED(docker-swarm) ]
DO [ BLOCK_DELETE /Dockerfile stagemonitor ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ BLOCK_DELETE /Dockerfile non-stagemonitor ] WHEN [ IF_INCLUDED(stagemonitor) ]
DO [ BLOCK_CLEAN /Dockerfile ]

DO [ BLOCK_DELETE /src/main/resources/application.yml oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml non-oauth2-authorization-service ] WHEN [ IF_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml edge-service-zuul ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml non-edge-service-zuul ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml spring-sleuth ] WHEN [ IF_NOT_INCLUDED(spring-sleuth) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml zipkin-server ] WHEN [ IF_NOT_INCLUDED(zipkin-server) ]
DO [ BLOCK_DELETE /src/main/resources/application.yml eureka-server ] WHEN [ IF_NOT_INCLUDED(eureka-server) ]
DO [ BLOCK_CLEAN /src/main/resources/application.yml ]

DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/demoservice/DemoServiceApplication.java stagemonitor ] - 
	WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ BLOCK_CLEAN /src/main/java/com/mphasis/ewt/demoservice/DemoServiceApplication.java ]	

DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/demoservice/interfaces/HealthCheck.java api-documentation-swagger ] - 
	WHEN [ IF_NOT_INCLUDED(api-documentation-swagger) ]
DO [ BLOCK_CLEAN /src/main/java/com/mphasis/ewt/demoservice/interfaces/HealthCheck.java ]

DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/demoservice/interfaces/DemoService.java api-documentation-swagger ] - 
	WHEN [ IF_NOT_INCLUDED(api-documentation-swagger) ]
DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/demoservice/interfaces/DemoService.java oauth2-authorization-service ] - 
	WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]	
DO [ BLOCK_CLEAN /src/main/java/com/mphasis/ewt/demoservice/interfaces/DemoService.java ] 
	
DO [ DELETE /src/main/java/com/mphasis/ewt/demoservice/config/Oauth2*.java ] - 
	WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]	
DO [ DELETE /src/main/java/com/mphasis/ewt/demoservice/config/ResourceServiceConfiguration.java ] - 
	WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]	
DO [ DELETE /src/main/java/com/mphasis/ewt/demoservice/config/ServiceConfiguration.java ] - 
	WHEN [ IF_INCLUDED(oauth2-authorization-service) ]
		
DO [ DELETE /src/main/java/com/mphasis/ewt/demoservice/config/ApiDocumentationConfiguration.java ] - 
	WHEN [ IF_NOT_INCLUDED(api-documentation-swagger) ]
DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/demoservice/config/ApiDocumentationConfiguration.java edge-service-zuul ] - 
	WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]	
DO [ BLOCK_CLEAN /src/main/java/com/mphasis/ewt/demoservice/config/ApiDocumentationConfiguration.java ]
		
DO [ DELETE /src/main/java/com/mphasis/ewt/demoservice/config/WebSecurityConfiguration.java ] - 
	WHEN [ NOT(AND(IF_INCLUDED(oauth2-authorization-service), IF_INCLUDED(api-documentation-swagger))) ]	
	
DO [ DELETE /src/main/java/com/mphasis/ewt/demoservice/interfaces/ApplicationMertricsEndpoint.java ] - 
	WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ DELETE /src/main/java/com/mphasis/ewt/demoservice/samples ] - 
	WHEN [ IF_NOT_INCLUDED(stagemonitor) ]	

DO [ DELETE /src/main/resources/bootstrap.yml ] - 
	WHEN [ IF_NOT_INCLUDED(config-server-spring) ]	
DO [ DELETE /src/main/java/com/mphasis/ewt/demoservice/interfaces/GreetingsService.java ] - 
	WHEN [ IF_NOT_INCLUDED(config-server-spring) ]	
	
DO [ DELETE /src/main/java/com/mphasis/ewt/demoservice/interfaces/TracingService.java ] - 
	WHEN [ IF_NOT_INCLUDED(spring-sleuth) ]	
	