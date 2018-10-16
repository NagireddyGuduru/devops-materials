package com.mphasis.ewt.microservices.domain.catalog;

import java.util.Set;

import org.apache.commons.lang.builder.HashCodeBuilder;

import com.mphasis.ewt.microservices.domain.shared.Entity;

public class ServiceDescription implements Entity<ServiceDescription>, Comparable<ServiceDescription> {

	private String id;
	private String name;
	private String description;
	private int order;
	private boolean enabled;
	private Set<String> implicitIncludes;
	private Set<String> implicitExcludes;
	private Set<String> dependentServices;
	private boolean visible;
	
	public ServiceDescription() {
		this.enabled = true;
		visible = true;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Set<String> getImplicitIncludes() {
		return implicitIncludes;
	}

	public void setImplicitIncludes(Set<String> implicitIncludes) {
		this.implicitIncludes = implicitIncludes;
	}

	public Set<String> getImplicitExcludes() {
		return implicitExcludes;
	}

	public void setImplicitExcludes(Set<String> implicitExcludes) {
		this.implicitExcludes = implicitExcludes;
	}

	public Set<String> getDependentServices() {
		return dependentServices;
	}

	public void setDependentServices(Set<String> dependentServices) {
		this.dependentServices = dependentServices;
	}
	
	public boolean isVisible() {
		return visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}

	public boolean sameIdentityAs(ServiceDescription other) {
		return other != null && other.id.equals(other.id);
	}

	@Override
	public boolean equals(final Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ServiceDescription service = (ServiceDescription) o;

		return sameIdentityAs(service);
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder().append(id).toHashCode();
	}

	@Override
	public int compareTo(ServiceDescription o) {
		return new Integer(this.order).compareTo(o.order);
	}
}
