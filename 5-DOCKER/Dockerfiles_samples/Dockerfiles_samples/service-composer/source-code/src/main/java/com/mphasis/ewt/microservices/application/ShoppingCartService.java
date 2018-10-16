package com.mphasis.ewt.microservices.application;

import java.io.File;
import java.util.Map;

public interface ShoppingCartService {

	int checkout(String organizationName, String organizationUrl, String projectName,
					String projectUrl, String projectDescription, String[] serviceIds);
	
	boolean isBuildReady(int buildNumber);
	
	File getBuildContent(int buildNumber);
	
	Map<String, String> getDeploymentInfo(final int buildNumber);
	
	boolean deployBuild(final int buildNumber, final Map<String, String> deploymentParameters);
	
	boolean redeployBuild(final int buildNumber, final Map<String, String> deploymentParameters);
	
	boolean isDeploymentDone(int buildNumber);
	
	boolean isDeploymentSuccessful(int buildNumber);
	
	boolean isBuildDeployable(String[] serviceIds);
	
	Map<String, String> getDeploymentLogs(int buildNumber, long position);
}
