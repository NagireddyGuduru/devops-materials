package com.mphasis.ewt.microservices.application;

import com.mphasis.ewt.microservices.domain.catalog.ServiceCatalog;

public interface CatalogService {

	ServiceCatalog getDefaultCatalog();
	ServiceCatalog getCatalog(final String catalogId);
}
