package com.mphasis.ewt.microservices.domain.catalog;

public interface ServiceCatalogRepository {

	ServiceCatalog getDefaultCatalog();
	ServiceCatalog getCatalog(final String catalogId);
}
