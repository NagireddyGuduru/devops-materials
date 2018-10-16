DO [ WORKING_DIR tools/elasticsearch ]

DO [ COPY /* /elasticsearch ] 

DO [ DELETE /Dockerfile ] WHEN [ IF_NOT_INCLUDED(docker-swarm) ]