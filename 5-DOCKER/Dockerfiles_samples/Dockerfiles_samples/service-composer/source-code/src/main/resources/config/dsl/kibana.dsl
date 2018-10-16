DO [ WORKING_DIR tools/kibana ]

DO [ COPY /* /kibana ] 

DO [ DELETE /Dockerfile ] WHEN [ IF_NOT_INCLUDED(docker-swarm) ]
DO [ BLOCK_DELETE /Dockerfile stagemonitor ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ BLOCK_CLEAN /Dockerfile ]