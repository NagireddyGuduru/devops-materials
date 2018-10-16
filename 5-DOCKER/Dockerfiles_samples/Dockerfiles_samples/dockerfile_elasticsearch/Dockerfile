# Pull base image
FROM logstash

# Maintainer
MAINTAINER "NagiReddy <nagireddy.guduru@gmail.com">

#WORKDIR /opt/logstash

ADD logstash.conf /usr/share/logstash/config/
ADD NextStepLog.log /usr/share/logstash/config/

CMD logstash -f "/usr/share/logstash/config/logstash.conf"


