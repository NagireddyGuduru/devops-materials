package com.mphasis.ewt.oauth2.domain.model.security;

import java.io.Serializable;

public enum RoleType implements Serializable {
	USER("USER"),
	ADMINISTRATOR("ADMINISTRATOR");
	
	String	roleType;
	
	private RoleType(final String roleType) {
		this.roleType = roleType;
	}
	
	public String getRoleType() {
		return this.roleType;
	}
}
