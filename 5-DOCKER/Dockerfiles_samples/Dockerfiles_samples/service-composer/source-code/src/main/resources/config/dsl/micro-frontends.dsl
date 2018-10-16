DO [ WORKING_DIR micro-frontends ]

DO [ COPY /* / ]

DO [ DELETE /Dockerfile ] WHEN [ IF_NOT_INCLUDED(docker-swarm) ]
DO [ BLOCK_DELETE /Dockerfile oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_CLEAN /Dockerfile ]

DO [ DELETE /src/user-profile-management/* ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ DELETE /src/user-profile-management ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ DELETE /src/user-profile-management/environments/_environment.ts ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ DELETE /src/user-profile-management/environments/_environment.prod.ts ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ DELETE /src/user-profile-management/environments/environment.ts ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ DELETE /src/user-profile-management/environments/environment.prod.ts ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ RENAME /src/user-profile-management/environments/_environment.ts environment.ts ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ RENAME /src/user-profile-management/environments/_environment.prod.ts environment.prod.ts ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ INTERPOLATE /src/user-profile-management/environments/environment.prod.ts ]

DO [ BLOCK_DELETE /index.html oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /index.html edge-service-zuul ] WHEN [ IF_NOT_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_DELETE /index.html non-edge-service-zuul ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ BLOCK_CLEAN /index.html ]

DO [ DELETE /src/root-application/login-guard.* ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /src/root-application/root-application.js oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_CLEAN /src/root-application/root-application.js ]


DO [ DELETE /src/environments/_environment.js ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ DELETE /src/environments/__environment.js ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ DELETE /src/environments/_environment.prod.js ] WHEN [ IF_INCLUDED(edge-service-zuul) ]
DO [ DELETE /src/environments/__environment.prod.js ] WHEN [ IF_INCLUDED(edge-service-zuul) ]

DO [ DELETE /src/environments/environment.js ] WHEN [ AND(IF_NOT_INCLUDED(edge-service-zuul), IF_INCLUDED(client-application-java)) ]
DO [ DELETE /src/environments/__environment.js ] WHEN [ AND(IF_NOT_INCLUDED(edge-service-zuul), IF_INCLUDED(client-application-java)) ]
DO [ DELETE /src/environments/environment.prod.js ] WHEN [ AND(IF_NOT_INCLUDED(edge-service-zuul), IF_INCLUDED(client-application-java)) ]
DO [ DELETE /src/environments/__environment.prod.js ] WHEN [ AND(IF_NOT_INCLUDED(edge-service-zuul), IF_INCLUDED(client-application-java)) ]
DO [ RENAME /src/environments/_environment.js environment.js ] WHEN [ AND(IF_NOT_INCLUDED(edge-service-zuul), IF_INCLUDED(client-application-java)) ]
DO [ RENAME /src/environments/_environment.prod.js environment.prod.js ] WHEN [ AND(IF_NOT_INCLUDED(edge-service-zuul), IF_INCLUDED(client-application-java)) ]

DO [ DELETE /src/environments/environment.js ] WHEN [ AND(IF_NOT_INCLUDED(edge-service-zuul), IF_INCLUDED(client-application-angular4)) ]
DO [ DELETE /src/environments/_environment.js ] WHEN [ AND(IF_NOT_INCLUDED(edge-service-zuul), IF_INCLUDED(client-application-angular4)) ]
DO [ DELETE /src/environments/environment.prod.js ] WHEN [ AND(IF_NOT_INCLUDED(edge-service-zuul), IF_INCLUDED(client-application-angular4)) ]
DO [ DELETE /src/environments/_environment.prod.js ] WHEN [ AND(IF_NOT_INCLUDED(edge-service-zuul), IF_INCLUDED(client-application-angular4)) ]
DO [ RENAME /src/environments/__environment.js environment.js ] WHEN [ AND(IF_NOT_INCLUDED(edge-service-zuul), IF_INCLUDED(client-application-angular4)) ]
DO [ RENAME /src/environments/__environment.prod.js environment.prod.js ] WHEN [ AND(IF_NOT_INCLUDED(edge-service-zuul), IF_INCLUDED(client-application-angular4)) ]

DO [ INTERPOLATE /src/environments/environment.prod.js ]

DO [ BLOCK_DELETE /src/environments/environment.js oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_DELETE /src/environments/environment.prod.js oauth2-authorization-service ] WHEN [ IF_NOT_INCLUDED(oauth2-authorization-service) ]
DO [ BLOCK_CLEAN /src/environments/environment.js ]
DO [ BLOCK_CLEAN /src/environments/environment.prod.js ]

DO [ DELETE /src/environments/_environment.js ] 
DO [ DELETE /src/environments/__environment.js ]
DO [ DELETE /src/environments/_environment.prod.js ] 
DO [ DELETE /src/environments/__environment.prod.js ]