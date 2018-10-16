ARG ELK_VERSION

FROM docker.elastic.co/logstash/logstash:${ELK_VERSION}

#<block-log-aggregation-elk-start>
RUN logstash-plugin install --no-verify logstash-filter-multiline
#<block-log-aggregation-elk-end>

COPY ./config/logstash.yml /usr/share/logstash/config/logstash.yml
#<block-log-aggregation-elk-start>
COPY ./pipeline /usr/share/logstash/pipeline
#<block-log-aggregation-elk-end>