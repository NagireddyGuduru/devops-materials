# {{projectName}}

*{{projectUrl}}*

{{projectDescription}}

## How to build

Run the below command to do the maven build from the project roor directory.

```
./mvnw clean package
``` 

<block-docker-start>
## How to deploy

Run the following command to build docker images for your services. You need to have docker installed on your machine to do this.

```
docker-compose build
```

And then run the below command to deploy your images onto a running docker swarm environment.

```
docker stack deploy -c docker-compose.yml <service-name>
```
<block-docker-end>

<block-kubernetes-start>
<block-kubernetes-end>

<block-pas-start>
<block-pas-end>

<block-heroku-start>
<block-heroku-end>