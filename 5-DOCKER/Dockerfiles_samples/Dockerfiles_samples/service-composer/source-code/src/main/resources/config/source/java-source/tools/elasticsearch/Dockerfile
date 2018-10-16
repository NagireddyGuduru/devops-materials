ARG ELK_VERSION

FROM docker.elastic.co/elasticsearch/elasticsearch:${ELK_VERSION}

# Add your elasticsearch plugins setup here
# Example: RUN elasticsearch-plugin install analysis-icu

COPY ./config/elasticsearch.yml /usr/share/elasticsearch/config/elasticsearch.yml
