package com.mphasis.ewt.microservices.domain.dsl;

import java.util.ArrayList;
import java.util.List;

public class CommandDescription {

	private String verb;
	private List<String> arguments;
	private String criteria;

	public CommandDescription() {
		arguments = new ArrayList<String>();
	}

	public String getVerb() {
		return verb;
	}

	public void setVerb(String verb) {
		this.verb = verb;
	}

	public List<String> getArguments() {
		return arguments;
	}

	public void setArguments(List<String> arguments) {
		this.arguments = arguments;
	}

	public String getCriteria() {
		return criteria;
	}

	public void setCriteria(String criteria) {
		this.criteria = criteria;
	}

}
