package com.mphasis.ewt.microservices.domain.catalog;

import java.util.SortedSet;

import org.apache.commons.lang.builder.HashCodeBuilder;

import com.mphasis.ewt.microservices.domain.shared.Entity;

public class ServiceCategory implements Entity<ServiceCategory>, Comparable<ServiceCategory> {

	private String name;
	private int order;
	private String description;
	private SortedSet<ServiceCategory> categories;
	private SortedSet<ServiceDescription> services;
	private boolean visible;

	public ServiceCategory() {
		visible = true;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public SortedSet<ServiceCategory> getCategories() {
		return categories;
	}

	public void setCategories(SortedSet<ServiceCategory> categories) {
		this.categories = categories;
	}

	public SortedSet<ServiceDescription> getServices() {
		return services;
	}

	public void setServices(SortedSet<ServiceDescription> services) {
		this.services = services;
	}
	
	public boolean isVisible() {
		return visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}

	public boolean sameIdentityAs(ServiceCategory other) {
		return other != null && other.name.equals(other.name);
	}

	@Override
	public boolean equals(final Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ServiceCategory category = (ServiceCategory) o;

		return sameIdentityAs(category);
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder().append(name).toHashCode();
	}

	@Override
	public int compareTo(ServiceCategory o) {
		return new Integer(this.order).compareTo(o.order);
	}
}
