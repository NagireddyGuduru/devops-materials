package com.mphasis.ewt.microservices.interfaces.cart.dto;

import java.util.HashMap;
import java.util.Map;

public class DeployRequest {

	private Map<String, String> parameters;

	public DeployRequest() {
		parameters = new HashMap<String, String>();
	}
	
	public Map<String, String> getParameters() {
		return parameters;
	}

	public void setParameters(Map<String, String> parameters) {
		this.parameters = parameters;
	}
	
	
}
