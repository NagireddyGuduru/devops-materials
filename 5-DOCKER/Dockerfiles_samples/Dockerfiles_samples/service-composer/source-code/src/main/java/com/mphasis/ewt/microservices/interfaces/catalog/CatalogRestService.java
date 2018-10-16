package com.mphasis.ewt.microservices.interfaces.catalog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mphasis.ewt.microservices.application.CatalogService;
import com.mphasis.ewt.microservices.domain.catalog.ServiceCatalog;

@RestController
@RequestMapping(value="/catalog", produces="application/json")
public class CatalogRestService {

	@Autowired
	private CatalogService catalogService;
	
	@GetMapping
	public ResponseEntity<ServiceCatalog> getDefaultCatalog() {
		return new ResponseEntity<ServiceCatalog>(catalogService.getDefaultCatalog(), HttpStatus.OK);
	}
}
