package com.mphasis.ewt.microservices.interfaces.cart.dto;

public class CheckoutResponse {

	private String composeStatusUrl;
	private String downloadUrl;
	private String deploymentDetailsUrl;
	private String deployUrl;
	private String redeployUrl;
	private String deploymentStatusUrl;
	private String deploymentLogsUrl;
	private boolean deployable;

	public CheckoutResponse() {

	}

	public String getComposeStatusUrl() {
		return composeStatusUrl;
	}

	public void setComposeStatusUrl(String composeStatusUrl) {
		this.composeStatusUrl = composeStatusUrl;
	}

	public String getDeploymentStatusUrl() {
		return deploymentStatusUrl;
	}

	public void setDeploymentStatusUrl(String deploymentStatusUrl) {
		this.deploymentStatusUrl = deploymentStatusUrl;
	}

	public String getDeploymentLogsUrl() {
		return deploymentLogsUrl;
	}

	public void setDeploymentLogsUrl(String deploymentLogsUrl) {
		this.deploymentLogsUrl = deploymentLogsUrl;
	}

	public String getDownloadUrl() {
		return downloadUrl;
	}

	public void setDownloadUrl(String downloadUrl) {
		this.downloadUrl = downloadUrl;
	}

	public String getDeploymentDetailsUrl() {
		return deploymentDetailsUrl;
	}

	public void setDeploymentDetailsUrl(String deploymentDetailsUrl) {
		this.deploymentDetailsUrl = deploymentDetailsUrl;
	}

	public String getDeployUrl() {
		return deployUrl;
	}

	public void setDeployUrl(String deployUrl) {
		this.deployUrl = deployUrl;
	}

	public String getRedeployUrl() {
		return redeployUrl;
	}

	public void setRedeployUrl(String redeployUrl) {
		this.redeployUrl = redeployUrl;
	}

	public boolean isDeployable() {
		return deployable;
	}

	public void setDeployable(boolean deployable) {
		this.deployable = deployable;
	}

}
