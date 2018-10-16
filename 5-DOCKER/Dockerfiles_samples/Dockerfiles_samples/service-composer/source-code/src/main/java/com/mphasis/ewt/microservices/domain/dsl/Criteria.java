package com.mphasis.ewt.microservices.domain.dsl;

import java.util.ArrayList;
import java.util.List;

public class Criteria {

	private String verb;
	private List<String> arguments;

	public Criteria() {
		this.arguments = new ArrayList<String>();
	}
	
	public Criteria(final String verb, final List<String> arguments) {
		this.verb = verb;
		this.arguments = arguments;
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

}
