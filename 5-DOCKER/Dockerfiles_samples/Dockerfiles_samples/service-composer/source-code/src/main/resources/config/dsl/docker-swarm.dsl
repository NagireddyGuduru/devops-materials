DO [ COPY /.env / ] WHEN [ IF_INCLUDED(docker-swarm) ]
DO [ BLOCK_DELETE /.env elk ] WHEN [ AND(IF_NOT_INCLUDED(elasticsearch), IF_NOT_INCLUDED(logstash), IF_NOT_INCLUDED(kibana)) ]
DO [ BLOCK_CLEAN /.env ]

DO [ COPY /docker-compose.yml / ] - 
	WHEN [ AND(IF_INCLUDED(docker-swarm), -
			OR(IF_INCLUDED(oauth2-authorization-service), -
			 	IF_INCLUDED(resource-service-template), -
			 	IF_INCLUDED(client-application-java), - 
			 	IF_INCLUDED(client-application-angular4), - 
			 	IF_INCLUDED(micro-frontends), - 
			 	IF_INCLUDED(edge-service-zuul)))]
DO [ BLOCK_DELETE /docker-compose.yml mysql ] WHEN [ IF_NOT_INCLUDED(mysql) ]
DO [ BLOCK_DELETE /docker-compose.yml oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /docker-compose.yml resource-service-template ] WHEN [ IF_NOT_INCLUDED(resource-service-template) ]
DO [ BLOCK_DELETE /docker-compose.yml client-application-java ] WHEN [ IF_NOT_INCLUDED(client-application-java) ]
DO [ BLOCK_DELETE /docker-compose.yml client-application-angular4 ] WHEN [ IF_NOT_INCLUDED(client-application-angular4) ]
DO [ BLOCK_DELETE /docker-compose.yml micro-frontends ] WHEN [ IF_NOT_INCLUDED(micro-frontends) ]
DO [ BLOCK_DELETE /docker-compose.yml edge-service-zuul ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_DELETE /docker-compose.yml non-edge-service-zuul ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_DELETE /docker-compose.yml log-aggregation-elk ] WHEN [ IF_NOT_INCLUDED(log-aggregation-elk) ]
DO [ BLOCK_DELETE /docker-compose.yml stagemonitor ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ BLOCK_DELETE /docker-compose.yml non-stagemonitor ] WHEN [ IF_INCLUDED(stagemonitor) ]
DO [ BLOCK_DELETE /docker-compose.yml zuul-dependencies ] WHEN [ AND(IF_NOT_INCLUDED(client-application-java), IF_NOT_INCLUDED(client-application-angular4)) ]
DO [ BLOCK_DELETE /docker-compose.yml micro-frontends-dependencies ] WHEN [ AND(IF_NOT_INCLUDED(client-application-java), IF_NOT_INCLUDED(client-application-angular4)) ]
DO [ BLOCK_DELETE /docker-compose.yml apm-net ] WHEN [ AND(IF_NOT_INCLUDED(stagemonitor), IF_NOT_INCLUDED(log-aggregation-elk)) ]
DO [ BLOCK_DELETE /docker-compose.yml config-server-spring ] WHEN [ IF_NOT_INCLUDED(config-server-spring) ]
DO [ BLOCK_DELETE /docker-compose.yml zipkin-server ] WHEN [ IF_NOT_INCLUDED(zipkin-server) ]
DO [ BLOCK_DELETE /docker-compose.yml eureka-server ] WHEN [ IF_NOT_INCLUDED(eureka-server) ]
DO [ INTERPOLATE /docker-compose.yml ]
DO [ BLOCK_CLEAN /docker-compose.yml ]

DO [ COPY /docker-compose-elk.yml / ] WHEN -
		[ AND(IF_INCLUDED(docker-swarm), OR(IF_INCLUDED(elasticsearch), IF_INCLUDED(logstash), IF_INCLUDED(kibana))) ]
DO [ BLOCK_DELETE /docker-compose-elk.yml elasticsearch ] WHEN [ IF_NOT_INCLUDED(elasticsearch) ]
DO [ BLOCK_DELETE /docker-compose-elk.yml logstash ] WHEN [ IF_NOT_INCLUDED(logstash) ]
DO [ BLOCK_DELETE /docker-compose-elk.yml kibana ] WHEN [ IF_NOT_INCLUDED(kibana) ]
DO [ BLOCK_CLEAN /docker-compose-elk.yml ]


DO [ COPY /docker-compose-platform-monitoring.yml / ] WHEN -
		[ AND(IF_INCLUDED(docker-swarm), OR(IF_INCLUDED(portainer), IF_INCLUDED(docker-visualizer))) ]
DO [ BLOCK_DELETE /docker-compose-platform-monitoring.yml portainer ] WHEN [ IF_NOT_INCLUDED(portainer) ]
DO [ BLOCK_DELETE /docker-compose-platform-monitoring.yml docker-visualizer ] WHEN [ IF_NOT_INCLUDED(docker-visualizer) ]
DO [ BLOCK_CLEAN /docker-compose-platform-monitoring.yml ]