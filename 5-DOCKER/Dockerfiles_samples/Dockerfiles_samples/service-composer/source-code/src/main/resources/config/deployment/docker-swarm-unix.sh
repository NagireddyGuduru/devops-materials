[ -f docker-compose-platform-monitoring.yml ] && docker-compose -f docker-compose-platform-monitoring.yml build || echo "Monitoring stack not selected"

[ -f docker-compose-platform-monitoring.yml ] && docker stack deploy -c docker-compose-platform-monitoring.yml pmon || echo "Monitoring stack not selected"

[ -f docker-compose-elk.yml ] && docker-compose -f docker-compose-elk.yml build || echo "Logging stack not selected"

[ -f docker-compose-elk.yml ] && docker stack deploy -c docker-compose-elk.yml apm || echo "Logging stack not selected"

[ -f docker-compose.yml ] && docker stack rm {{stackName}} || echo "Service stack not selected"

[ -f docker-compose.yml ] && docker-compose build || echo "Service stack not selected"

[ -f docker-compose.yml ] && docker stack deploy -c docker-compose.yml {{stackName}} || echo "Service stack not selected"