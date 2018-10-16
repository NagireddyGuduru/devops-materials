export const environment = {
    // <block-oauth2-authorization-service-start>
    loginUrl: 'http://{{loadBalancerAddress}}',
    userInfoUri: 'http://{{loadBalancerAddress}}/auth-service/user/me',
    // <block-oauth2-authorization-service-end>
    production: true
};
