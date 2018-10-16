package com.mphasis.ewt.microservices.application.impl;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.mphasis.ewt.microservices.application.ShoppingCartService;
import com.mphasis.ewt.microservices.application.impl.cart.SolutionComposer;
import com.mphasis.ewt.microservices.application.impl.cart.SolutionDeployer;

@Service
public class ShoppingCartServiceImpl implements ShoppingCartService {

	@Value("${solutionBuilder.workingDirectory}")
	private String workingDirectory;
	
	@Value("${solutionBuilder.sourceFile}")
	private String sourceFile;
	
	@Value("${solutionBuilder.numberOfBuildsToRetain}")
	private int numberOfBuildsToRetain;
	
	@Value("${solutionBuilder.loadBalancerAddress}")
	private String loadBalancerAddress;
	
	@Override
	public int checkout(String organizationName, String organizationUrl, String projectName, 
							String projectUrl, String projectDescription, String[] serviceIds) {
		
		return SolutionComposer.compose(
						organizationName, 
						organizationUrl, 
						projectName, 
						projectUrl, 
						projectDescription, 
						serviceIds,
						workingDirectory,
						sourceFile,
						numberOfBuildsToRetain,
						getProcessEnvironment());
	}

	@Override
	public boolean isBuildReady(final int buildNumber) {
		return SolutionComposer.isComposeReady(workingDirectory, buildNumber);
	}
	
	@Override
	public File getBuildContent(int buildNumber) {
		return SolutionComposer.getBuildContent(workingDirectory, buildNumber);
	}
	
	@Override 
	public Map<String, String> getDeploymentInfo(final int buildNumber) {
		return SolutionDeployer.getDeploymentInfo(workingDirectory, buildNumber);
	}
	
	@Override
	public boolean deployBuild(final int buildNumber, final Map<String, String> deploymentParameters) {
		return SolutionDeployer.deploy(buildNumber, deploymentParameters, workingDirectory);
	}
	
	@Override
	public boolean redeployBuild(final int buildNumber, final Map<String, String> deploymentParameters) {
		return SolutionDeployer.redeploy(buildNumber, deploymentParameters, workingDirectory);
	}

	@Override
	public boolean isDeploymentDone(int buildNumber) {
		return SolutionDeployer.isDeploymentDone(workingDirectory, buildNumber);
	}
	
	@Override
	public boolean isDeploymentSuccessful(int buildNumber) {
		return SolutionDeployer.isDeploymentSuccessful(workingDirectory, buildNumber);
	}
	
	@Override
	public boolean isBuildDeployable(String[] serviceIds) {
		return SolutionDeployer.isBuildDeployale(serviceIds);
	}
	
	@Override
	public Map<String, String> getDeploymentLogs(int buildNumber, long position) {
		return SolutionDeployer.getDeploymentLogs(workingDirectory, buildNumber, position);
	}
	
	private Map<String, String> getProcessEnvironment() {
		final Map<String, String> env = new HashMap<String, String>();
		env.put("loadBalancerAddress", loadBalancerAddress);
		return env;
	}
}
