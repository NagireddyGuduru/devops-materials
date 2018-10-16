package com.mphasis.ewt.microservices.application;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mphasis.ewt.microservices.ServiceComposerApplication;
import com.mphasis.ewt.microservices.domain.catalog.ServiceCatalog;
import com.mphasis.ewt.microservices.domain.catalog.ServiceCategory;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ServiceComposerApplication.class)
public class CatalogServiceTest {

	@Autowired
	private CatalogService catalogService;
	
	@Test
	public void testDefaultCatalog() {
		ServiceCatalog catalog = catalogService.getDefaultCatalog();
		Assert.assertNotNull("Default catalog is null", catalog);
		Assert.assertEquals("Default catalog is null", "default" , catalog.getId());
		Assert.assertTrue("Must contain at least one category", catalog.getCategories().size() > 0);
		
		if (catalog.getCategories().size() > 1) {
			final ServiceCategory[] categories = catalog.getCategories().toArray(new ServiceCategory[0]);
			Assert.assertTrue("Categories must be in ascending order", categories[0].getOrder() < categories[1].getOrder());
		}
	}
}
