DO [ WORKING_DIR tools/mysql ]

DO [ COPY /* /mysql ] 

DO [ DELETE /mysql-oauth2-init.sql ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ DELETE /mysql-init.sql ] WHEN [ IF_INCLUDED(oauth2-authorization-service) ]

DO [ BLOCK_DELETE /Dockerfile oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /Dockerfile non-oauth2-authorization-service ] WHEN [ IF_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_CLEAN /Dockerfile ]