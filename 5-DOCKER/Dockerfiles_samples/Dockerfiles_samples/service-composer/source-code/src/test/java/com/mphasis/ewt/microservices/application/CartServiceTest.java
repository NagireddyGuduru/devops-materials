package com.mphasis.ewt.microservices.application;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class CartServiceTest extends TestcaseBase {

	@Autowired
	private ShoppingCartService cartService;
	
	@Test
	public void checkoutMySqlCart() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"mysql", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutOAuth2AuthorizationServiceCart()  {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"mysql", "oauth2-authorization-service", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutOAuth2ResourceServiceCart()  {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"mysql", "oauth2-authorization-service", "resource-service-template", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutResourceServiceCart()  {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"resource-service-template", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutResourceServiceAndStagemonitorCart()  {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"resource-service-template", "stagemonitor", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutClientApplicationJava() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"client-application-java", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutClientApplicationWithResourceServiceJava() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"client-application-java", "resource-service-template", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutClientApplicationWithResourceServiceWithOauth2AServiceJava() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"client-application-java", "oauth2-authorization-service", "resource-service-template", "mysql", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutEdgeServiceZuul() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"edge-service-zuul", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutEdgeServiceZuulAndClientAppJava() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"edge-service-zuul", "client-application-java", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutEdgeServiceZuulAndClientAppJavaAndResourceService() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"edge-service-zuul", "client-application-java", "resource-service-template", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutMicrofrontends() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"micro-frontends", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutMicrofrontendsWithZuul() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"micro-frontends", "edge-service-zuul", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutMicrofrontendsWithClientAppJavaAndResourceService() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"micro-frontends", "client-application-java", "resource-service-template", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutMicrofrontendsWithClientAppJavaAndResourceServiceAndOAuth2() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"micro-frontends", "client-application-java", "resource-service-template", "oauth2-authorization-service", "mysql", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutMicrofrontendsWithClientAppJavaAndResourceServiceAndOAuth2AndEdgeZuul() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"micro-frontends", "client-application-java", "resource-service-template", "oauth2-authorization-service", "edge-service-zuul", "mysql", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutClientApplicationAngular4() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"client-application-angular4", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutEdgeServiceZuulAndClientAppAngular4() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"edge-service-zuul", "client-application-angular4", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutClientApplicationAngular4AndMicrofrontends() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"client-application-angular4", "micro-frontends", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutClientApplicationAngular4AndMicrofrontendsAndOauth2() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"client-application-angular4", "micro-frontends", "oauth2-authorization-service", "mysql", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutClientApplicationAngular4AndMicrofrontendsAndOauth2AndEdgeZuul() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"client-application-angular4", "micro-frontends", "oauth2-authorization-service", "edge-service-zuul", "mysql", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutStagemonitor() {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"stagemonitor", "client-application-java", "oauth2-authorization-service", "resource-service-template", "edge-service-zuul", "micro-frontends", "mysql", "elasticsearch", "kibana", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutELK() {
		final int buildNumber = cartService.checkout("Test Organization", 
				"http://www.test.organization.com", 
				"Test Project", 
				"http://www.test.organization.com/testproject", 
				"Test Project Description", 
				new String[] {"elasticsearch", "logstash", "kibana", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutLogAggregationELKWithOauth2() {
		final int buildNumber = cartService.checkout("Test Organization", 
				"http://www.test.organization.com", 
				"Test Project", 
				"http://www.test.organization.com/testproject", 
				"Test Project Description", 
				new String[] {"log-aggregation-elk", "elasticsearch", "logstash", "kibana", "oauth2-authorization-service", "mysql", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	
	@Test
	public void checkoutResourceServiceWithSwaggerCart()  {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"resource-service-template", "api-documentation-swagger", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutResourceServiceSwaggerZuulAndOauth2Cart()  {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"edge-service-zuul", "resource-service-template", "api-documentation-swagger", "oauth2-authorization-service", "client-application-java", "micro-frontends", "mysql" , "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
	@Test
	public void checkoutResourceServiceSwaggerZuulCart()  {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"edge-service-zuul", "resource-service-template", "api-documentation-swagger", "client-application-java", "micro-frontends", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
	}
	
}
