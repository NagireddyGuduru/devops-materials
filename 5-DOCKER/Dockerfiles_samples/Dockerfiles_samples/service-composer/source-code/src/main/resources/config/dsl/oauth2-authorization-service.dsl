DO [ WORKING_DIR oauth2-authorization-service ]

DO [ COPY /* / ]

DO [ DELETE /others/byte-buddy-agent* ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ DELETE /src/main/resources/stagemonitor* ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]

DO [ DELETE /Dockerfile ] WHEN [ IF_NOT_INCLUDED(docker-swarm) ]
DO [ BLOCK_DELETE /Dockerfile stagemonitor ] WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ BLOCK_DELETE /Dockerfile non-stagemonitor ] WHEN [ IF_INCLUDED(stagemonitor) ]
DO [ BLOCK_CLEAN /Dockerfile ]

DO [ BLOCK_DELETE /src/main/java/com/mphasis/ewt/oauth2/AuthorizationServerApplication.java stagemonitor ] - 
	WHEN [ IF_NOT_INCLUDED(stagemonitor) ]
DO [ BLOCK_CLEAN /src/main/java/com/mphasis/ewt/oauth2/AuthorizationServerApplication.java ]