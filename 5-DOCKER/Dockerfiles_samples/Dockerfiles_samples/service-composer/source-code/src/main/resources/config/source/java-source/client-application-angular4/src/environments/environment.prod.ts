export const environment = {
  production: false,
  // <block-oauth2-authorization-service-start>
  oauth2TokenUri: 'http://{{loadBalancerAddress}}/auth-service/oauth/token',
  oauth2ClientAppName: 'demo-client-app',
  oauth2ClientAppSecret: 'secret',
  oauth2UserInfoUri: 'http://{{loadBalancerAddress}}/auth-service/user/me',
  // <block-oauth2-authorization-service-end>
  // <block-micro-frontends-start>
  microFrontendAppsUri: 'http://{{loadBalancerAddress}}/micro-frontends/#/dashboard'
  // <block-micro-frontends-end>
};