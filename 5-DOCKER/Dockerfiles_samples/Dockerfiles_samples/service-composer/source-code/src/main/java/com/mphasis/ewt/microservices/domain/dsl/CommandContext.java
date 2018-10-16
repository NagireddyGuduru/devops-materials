package com.mphasis.ewt.microservices.domain.dsl;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CommandContext {

	private File sourceDirectory;
	private File destinationDirectory;
	private Map<String, Object> environment;
	private List<String> services;

	public CommandContext() {
		environment = new HashMap<String, Object>();
		services = new ArrayList<String>();
	}

	public File getSourceDirectory() {
		return sourceDirectory;
	}

	public void setSourceDirectory(File sourceDirectory) {
		this.sourceDirectory = sourceDirectory;
	}

	public File getDestinationDirectory() {
		return destinationDirectory;
	}

	public void setDestinationDirectory(File destinationDirectory) {
		this.destinationDirectory = destinationDirectory;
	}

	public Map<String, Object> getEnvironment() {
		return environment;
	}

	public void setEnvironment(Map<String, Object> environment) {
		this.environment = environment;
	}

	public List<String> getServices() {
		return services;
	}

	public void setServices(List<String> services) {
		this.services = services;
	}
	
	public CommandContext clone() {
		final CommandContext result = new CommandContext();
		result.sourceDirectory = new File(this.sourceDirectory.getAbsolutePath());
		result.destinationDirectory = new File(this.destinationDirectory.getAbsolutePath());
		result.services = new ArrayList<String>();
		result.services.addAll(services);
		result.environment = new HashMap<String, Object>();
		for (Map.Entry<String, Object> entry: this.environment.entrySet()) {
			result.environment.put(entry.getKey(), entry.getValue());
		}
		return result;
	}

}
