#
# Cassandra Dockerfile
#
#

# Pull base image.
FROM kairosdb


#Get scripts from rajiv
ADD scripts/cassandra-singlenode.sh /usr/local/bin/cassandra-singlenode

ENTRYPOINT ["cassandra-singlenode"]

# Define default command.
CMD ["bash"]