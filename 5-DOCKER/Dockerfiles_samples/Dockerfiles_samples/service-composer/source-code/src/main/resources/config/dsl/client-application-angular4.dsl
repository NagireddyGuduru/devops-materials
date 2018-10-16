DO [ WORKING_DIR client-application-angular4 ]

DO [ COPY /* / ]

DO [ DELETE /Dockerfile ] WHEN [ IF_NOT_INCLUDED(docker-swarm) ]
DO [ BLOCK_CLEAN /Dockerfile ]

DO [ BLOCK_DELETE /src/index.html edge-service-zuul ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_DELETE /src/index.html non-edge-service-zuul ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_CLEAN /src/index.html ]

DO [ DELETE /src/app/login/* ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ DELETE /src/app/login ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ DELETE /src/app/security.service.* ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ DELETE /src/app/external-resource.guard.* ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]

DO [ DELETE /src/environments/environment.ts ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ RENAME /src/environments/_environment.ts environment.ts ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ DELETE /src/environments/environment.prod.ts ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ RENAME /src/environments/_environment.prod.ts environment.prod.ts ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ DELETE /src/environments/_environment.ts ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ DELETE /src/environments/_environment.prod.ts ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_DELETE /src/environments/environment.ts oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /src/environments/environment.ts micro-frontends ] WHEN [ IF_NOT_INCLUDED(micro-frontends) ]
DO [ BLOCK_DELETE /src/environments/environment.prod.ts oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /src/environments/environment.prod.ts micro-frontends ] WHEN [ IF_NOT_INCLUDED(micro-frontends) ]
DO [ INTERPOLATE /src/environments/environment.prod.ts ]
DO [ BLOCK_CLEAN /src/environments/environment.ts ]
DO [ BLOCK_CLEAN /src/environments/environment.prod.ts ] 

DO [ BLOCK_DELETE /src/app/app.module.ts oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_CLEAN /src/app/app.module.ts ] 

DO [ BLOCK_DELETE /src/app/home/home.component.html oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_CLEAN /src/app/home/home.component.html ]

DO [ BLOCK_DELETE /src/app/home/home.component.ts oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /src/app/home/home.component.ts micro-frontends ] WHEN [ IF_NOT_INCLUDED(micro-frontends) ]
DO [ BLOCK_CLEAN /src/app/home/home.component.ts ]