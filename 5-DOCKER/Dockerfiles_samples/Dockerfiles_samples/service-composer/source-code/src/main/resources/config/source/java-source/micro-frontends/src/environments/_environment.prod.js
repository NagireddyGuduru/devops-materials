export const environment = {
    // <block-oauth2-authorization-service-start>
    loginUrl: 'http://{{loadBalancerAddress}}:8080/client-app-java',
    userInfoUri: 'http://{{loadBalancerAddress}}:8000/auth-service/user/me',
    // <block-oauth2-authorization-service-end>
    production: true
};
