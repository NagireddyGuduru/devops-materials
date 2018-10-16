package com.mphasis.ewt.microservices.interfaces.cart.dto;

public class CheckoutRequest {

	private String organizationName;
	private String organizationUrl;
	private String projectName;
	private String projectUrl;
	private String projectDescription;
	private String[] selectedServices;

	public CheckoutRequest() {

	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOriganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	public String getOrganizationUrl() {
		return organizationUrl;
	}

	public void setOrganizationUrl(String organizationUrl) {
		this.organizationUrl = organizationUrl;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectUrl() {
		return projectUrl;
	}

	public void setProjectUrl(String projectUrl) {
		this.projectUrl = projectUrl;
	}

	public String getProjectDescription() {
		return projectDescription;
	}

	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}

	public String[] getSelectedServices() {
		return selectedServices;
	}

	public void setSelectedServices(String[] selectedServices) {
		this.selectedServices = selectedServices;
	}

}
