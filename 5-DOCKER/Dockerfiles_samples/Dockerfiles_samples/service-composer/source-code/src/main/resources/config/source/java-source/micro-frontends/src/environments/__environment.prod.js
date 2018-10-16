export const environment = {
    // <block-oauth2-authorization-service-start>
    loginUrl: 'http://{{loadBalancerAddress}}:4200/client-app-angular4',
    userInfoUri: 'http://{{loadBalancerAddress}}:8000/auth-service/user/me',
    // <block-oauth2-authorization-service-end>
    production: true
};
