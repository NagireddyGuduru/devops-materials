export const environment = {
  production: false,
  // <block-oauth2-authorization-service-start>
  oauth2TokenUri: 'http://{{loadBalancerAddress}}:8000/auth-service/oauth/token',
  oauth2ClientAppName: 'demo-client-app',
  oauth2ClientAppSecret: 'secret',
  oauth2UserInfoUri: 'http://{{loadBalancerAddress}}:8000/auth-service/user/me',
  // <block-oauth2-authorization-service-end>
  // <block-micro-frontends-start>
  microFrontendAppsUri: 'http://{{loadBalancerAddress}}:4201/#/dashboard'
  // <block-micro-frontends-end>
};