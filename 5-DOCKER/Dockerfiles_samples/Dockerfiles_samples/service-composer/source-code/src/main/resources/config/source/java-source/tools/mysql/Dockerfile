FROM mysql

#<block-non-oauth2-authorization-service-start>
ADD mysql-init.sql /docker-entrypoint-initdb.d
#<block-non-oauth2-authorization-service-end>

#<block-oauth2-authorization-service-start>
ADD mysql-oauth2-init.sql /docker-entrypoint-initdb.d
#<block-oauth2-authorization-service-end>

EXPOSE 3306