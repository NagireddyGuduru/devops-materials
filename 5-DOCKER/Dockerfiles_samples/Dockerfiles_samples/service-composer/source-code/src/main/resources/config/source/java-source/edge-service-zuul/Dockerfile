FROM openjdk:8-jdk-alpine

#<block-stagemonitor-start>
COPY others/byte-buddy-agent-1.7.9.jar byte-buddy-agent-1.7.9.jar
#<block-stagemonitor-end>
COPY others/wait-for /wait-for
RUN chmod +x /wait-for && dos2unix /wait-for
COPY target/edge-service-zuul-0.0.1-SNAPSHOT.jar app.jar
COPY docker-application.yml application.yml

EXPOSE 80

ENV JAVA_OPTS=""

#<block-non-stagemonitor-start>
ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar
#<block-non-stagemonitor-end>

#<block-stagemonitor-start>
ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -javaagent:/byte-buddy-agent-1.7.9.jar -jar /app.jar
#<block-stagemonitor-start>