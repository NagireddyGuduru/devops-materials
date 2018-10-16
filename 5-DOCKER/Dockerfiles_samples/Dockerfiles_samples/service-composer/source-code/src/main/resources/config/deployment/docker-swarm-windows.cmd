(@FOR /f "tokens=*" %i IN ('docker-machine env') DO @%i) & IF EXIST docker-compose-platform-monitoring.yml docker-compose -f docker-compose-platform-monitoring.yml build

(@FOR /f "tokens=*" %i IN ('docker-machine env') DO @%i) & IF EXIST docker-compose-platform-monitoring.yml docker stack deploy -c docker-compose-platform-monitoring.yml pmon

(@FOR /f "tokens=*" %i IN ('docker-machine env') DO @%i) & IF EXIST docker-compose-elk.yml docker-compose -f docker-compose-elk.yml build

(@FOR /f "tokens=*" %i IN ('docker-machine env') DO @%i) & IF EXIST docker-compose-elk.yml docker stack deploy -c docker-compose-elk.yml apm

(@FOR /f "tokens=*" %i IN ('docker-machine env') DO @%i) & IF EXIST docker-compose.yml docker stack rm {{stackName}}

(@FOR /f "tokens=*" %i IN ('docker-machine env') DO @%i) & IF EXIST docker-compose.yml docker-compose build

(@FOR /f "tokens=*" %i IN ('docker-machine env') DO @%i) & IF EXIST docker-compose.yml docker stack deploy -c docker-compose.yml {{stackName}}