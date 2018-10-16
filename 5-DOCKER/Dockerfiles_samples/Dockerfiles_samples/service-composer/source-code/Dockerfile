FROM openjdk:8-jdk-alpine
ENV http_proxy 'http://subratkumar.mishra:password@orrproxy.mphasis.com:8080'
ENV https_proxy 'http://subratkumar.mishra:password@orrproxy.mphasis.com:8080'
ARG compose_version=1.19.0

RUN apk --no-cache add python py-pip git &&\
    git clone --branch ${compose_version} https://github.com/docker/compose.git /code/compose &&\
    cd /code/compose &&\
    pip --no-cache-dir install -r requirements.txt -r requirements-dev.txt pyinstaller==3.1.1 &&\
    git rev-parse --short HEAD > compose/GITSHA &&\
    ln -s /lib /lib64 && ln -s /lib/libc.musl-x86_64.so.1 ldd && ln -s /lib/ld-musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2 && \
    pyinstaller docker-compose.spec &&\
    unlink /lib/ld-linux-x86-64.so.2 /lib64 ldd ||true &&\
    mv dist/docker-compose /usr/local/bin/docker-compose &&\
    pip freeze | xargs pip uninstall -y &&\
    apk del python py-pip git &&\
    rm -rf /code /usr/lib/python2.7/ /root/.cache /var/cache/apk/* &&\
	chmod +x /usr/local/bin/docker-compose

RUN mkdir /service-composer && \
	chmod 777 /service-composer && \
	mkdir /root/.m2
	
COPY others/settings.xml /root/.m2/settings.xml

COPY target/service-composer-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS=""
ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar
