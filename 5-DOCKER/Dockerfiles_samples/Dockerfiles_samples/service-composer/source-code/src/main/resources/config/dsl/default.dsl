DO [ COPY /mvnw / ]
DO [ COPY /mvnw.cmd / ]
DO [ COPY /.mvn/* / ]

DO [ COPY /pom.xml / ]
DO [ BLOCK_REPLACE /pom.xml org-info maven-org-info ]
DO [ BLOCK_DELETE /pom.xml stagemonitor ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ BLOCK_DELETE /pom.xml oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /pom.xml resource-service-template ] WHEN [ IF_NOT_INCLUDED(resource-service-template) ]
DO [ BLOCK_DELETE /pom.xml client-application-java ] WHEN [ IF_NOT_INCLUDED(client-application-java) ]
DO [ BLOCK_DELETE /pom.xml edge-service-zuul ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_DELETE /pom.xml config-server-spring ] WHEN [ IF_NOT_INCLUDED(config-server-spring) ]
DO [ BLOCK_DELETE /pom.xml stagemonitor ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ BLOCK_DELETE /pom.xml zipkin-server ] WHEN [ IF_NOT_INCLUDED(zipkin-server) ]
DO [ BLOCK_DELETE /pom.xml spring-cloud-services ] WHEN [ IF_NOT_INCLUDED(spring-cloud-services) ]
DO [ BLOCK_DELETE /pom.xml eureka-server ] WHEN [ IF_NOT_INCLUDED(eureka-server) ]
DO [ BLOCK_CLEAN /pom.xml ]

DO [ COPY /oauth2-login-scripts.txt / ] WHEN [ IF_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /oauth2-login-scripts.txt non-edge-service-zuul ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_DELETE /oauth2-login-scripts.txt edge-service-zuul ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_CLEAN /oauth2-login-scripts.txt ]

DO [ COPY /README.MD / ]
DO [ INTERPOLATE /README.MD ]
DO [ BLOCK_DELETE /README.MD docker ] WHEN [ IF_NOT_INCLUDED(docker-swarm) ]
DO [ BLOCK_DELETE /README.MD kubernetes ] WHEN [ IF_NOT_INCLUDED(kubernetes) ]
DO [ BLOCK_DELETE /README.MD pas ] WHEN [ IF_NOT_INCLUDED(pas) ]
DO [ BLOCK_DELETE /README.MD heroku ] WHEN [ IF_NOT_INCLUDED(heroku) ]
DO [ BLOCK_CLEAN /README.MD ]