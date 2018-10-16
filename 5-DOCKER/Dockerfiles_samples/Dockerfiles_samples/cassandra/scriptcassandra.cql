CREATE KEYSPACE devopsdb WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy', 'datacenter1' : 3 };
use devopsdb;
truncate table organizations;
truncate table pipelines;
truncate table products;
truncate table users;
exit;