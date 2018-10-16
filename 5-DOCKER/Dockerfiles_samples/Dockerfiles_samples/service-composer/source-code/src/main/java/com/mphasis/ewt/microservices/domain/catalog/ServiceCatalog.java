package com.mphasis.ewt.microservices.domain.catalog;

import java.util.Set;
import java.util.SortedSet;

import org.apache.commons.lang.builder.HashCodeBuilder;

import com.mphasis.ewt.microservices.domain.shared.Entity;

public class ServiceCatalog implements Entity<ServiceCatalog> {

	private String id;
	private String name;
	private SortedSet<ServiceCategory> categories;

	public ServiceCatalog() {

	}

	public ServiceCatalog(final String id, final String name) {
		this.id = id;
		this.name = name;
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

	public Set<ServiceCategory> getCategories() {
		return categories;
	}

	public void setCategories(SortedSet<ServiceCategory> categories) {
		this.categories = categories;
	}

	public boolean sameIdentityAs(ServiceCatalog other) {
		return other != null && other.id.equals(other.id);
	}

	@Override
	public boolean equals(final Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ServiceCatalog catalog = (ServiceCatalog) o;

		return sameIdentityAs(catalog);
	}

	@Override
	public int hashCode() {
		return new HashCodeBuilder().append(id).toHashCode();
	}
}
