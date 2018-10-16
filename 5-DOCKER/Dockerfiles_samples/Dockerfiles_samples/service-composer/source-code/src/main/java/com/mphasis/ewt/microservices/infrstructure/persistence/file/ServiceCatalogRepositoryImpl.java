package com.mphasis.ewt.microservices.infrstructure.persistence.file;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.mphasis.ewt.microservices.domain.catalog.ServiceCatalog;
import com.mphasis.ewt.microservices.domain.catalog.ServiceCatalogRepository;
import com.mphasis.ewt.microservices.domain.catalog.ServiceCategory;
import com.mphasis.ewt.microservices.domain.catalog.ServiceDescription;

@Repository
public class ServiceCatalogRepositoryImpl implements ServiceCatalogRepository {

	@Override
	public ServiceCatalog getDefaultCatalog() {
		final ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
		try {
			ServiceCatalog result = mapper.readValue(
								ServiceCatalogRepositoryImpl.class.getResourceAsStream("/config/catalogs/default.yml"), 
								ServiceCatalog.class);
			return processCatalog(result);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public ServiceCatalog getCatalog(String catalogId) {
		// TODO Auto-generated method stub
		return null;
	}
	
	private ServiceCatalog processCatalog(final ServiceCatalog catalog) {
		final List<ServiceCategory> hiddenCategories = new ArrayList<ServiceCategory>();
		for (ServiceCategory category: catalog.getCategories()) {
			if (category.isVisible()) {
				removeHiddenServices(category);
			} else {
				hiddenCategories.add(category);
			}
		}
		catalog.getCategories().removeAll(hiddenCategories);
		
		return catalog;
	}
	
	private void removeHiddenServices(final ServiceCategory serviceCategory) {
		if (null != serviceCategory.getServices()) {
			final List<ServiceDescription> hiddenServices = new ArrayList<ServiceDescription>();
			for (final ServiceDescription serviceDescription: serviceCategory.getServices()) {
				if (!serviceDescription.isVisible()) {
					hiddenServices.add(serviceDescription);
				}
			}
			serviceCategory.getServices().removeAll(hiddenServices);
		}

		if (null != serviceCategory.getCategories()) {
			final List<ServiceCategory> hiddenCategories = new ArrayList<ServiceCategory>();
			for (ServiceCategory category: serviceCategory.getCategories()) {
				if (category.isVisible()) {
					removeHiddenServices(category);
				} else {
					hiddenCategories.add(category);
				}
			}
			serviceCategory.getCategories().removeAll(hiddenCategories);
		}
	}

}
