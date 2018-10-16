package com.mphasis.ewt.microservices.application;

import java.util.HashMap;
import java.util.Map;
import org.junit.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;


public class DockerDeploymentTest extends TestcaseBase {

	@Autowired
	private ShoppingCartService cartService;
	
	@Test
	public void deployOAuth2AuthorizationServiceCart()  {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"mysql", "oauth2-authorization-service", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
		
		cartService.deployBuild(buildNumber, getDeploymentParameters());
		waitUntilDeploymentFinishes(buildNumber);
		Assert.assertTrue("Deployment Failed", cartService.isDeploymentSuccessful(buildNumber));
	}
	
	@Test
	public void deployOAuth2AuthorizationResourceEdgeAndClientServiceCart()  {
		final int buildNumber = cartService.checkout("Test Organization", 
										"http://www.test.organization.com", 
										"Test Project", 
										"http://www.test.organization.com/testproject", 
										"Test Project Description", 
										new String[] {"oauth2-authorization-service", "resource-service-template", "client-application-java", "micro-frontends", "edge-service-zuul", "mysql", "docker-swarm"});
		waitUntilBuildFinishes(buildNumber);
		
		cartService.deployBuild(buildNumber, getDeploymentParameters());
		waitUntilDeploymentFinishes(buildNumber, 6000);
		Assert.assertTrue("Deployment Failed", cartService.isDeploymentSuccessful(buildNumber));
	}
	
	private Map<String, String> getDeploymentParameters() {
		final Map<String, String> parameters = new HashMap<String, String>();
		parameters.put("stackName", "ms");
		return parameters;
	}
}
