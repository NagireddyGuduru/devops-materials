package com.mphasis.ewt.microservices.application.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mphasis.ewt.microservices.application.CatalogService;
import com.mphasis.ewt.microservices.domain.catalog.ServiceCatalog;
import com.mphasis.ewt.microservices.domain.catalog.ServiceCatalogRepository;

@Service
public class CatalogServiceImpl implements CatalogService{

	@Autowired
	private ServiceCatalogRepository catalogRepository;
	
	@Override
	public ServiceCatalog getDefaultCatalog() {
		return catalogRepository.getDefaultCatalog();
	}

	@Override
	public ServiceCatalog getCatalog(String catalogId) {
		return catalogRepository.getCatalog(catalogId);
	}

}
