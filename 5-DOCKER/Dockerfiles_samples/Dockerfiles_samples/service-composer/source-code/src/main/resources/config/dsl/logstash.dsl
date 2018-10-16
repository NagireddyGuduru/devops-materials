DO [ WORKING_DIR tools/logstash ]

DO [ COPY /* /logstash ] 

DO [ DELETE /Dockerfile ] WHEN [ IF_NOT_INCLUDED(docker-swarm) ]
DO [ BLOCK_DELETE /Dockerfile log-aggregation-elk ] WHEN [ IF_NOT_INCLUDED(log-aggregation-elk) ]
DO [ BLOCK_CLEAN /Dockerfile ]

DO [ DELETE /pipeline/java-app-logs-pipeline.conf ] WHEN [ IF_NOT_INCLUDED(log-aggregation-elk) ]
DO [ DELETE /pipeline/mysql-logs-pipeline.conf ] WHEN [ IF_NOT_INCLUDED(log-aggregation-elk) ]
DO [ DELETE /pipeline/z-output.conf ] WHEN [ IF_NOT_INCLUDED(elasticsearch) ]
