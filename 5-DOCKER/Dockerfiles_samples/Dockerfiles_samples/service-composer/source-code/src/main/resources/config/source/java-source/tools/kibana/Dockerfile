ARG ELK_VERSION

FROM docker.elastic.co/kibana/kibana:${ELK_VERSION}

#<block-stagemonitor-start>
RUN kibana-plugin install https://github.com/stagemonitor/stagemonitor-kibana/releases/download/v0.3.0/stagemonitor-kibana-0.3.0-5.6.0.zip
#<block-stagemonitor-end>