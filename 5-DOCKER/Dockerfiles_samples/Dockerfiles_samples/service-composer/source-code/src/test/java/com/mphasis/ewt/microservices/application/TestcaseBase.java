package com.mphasis.ewt.microservices.application;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mphasis.ewt.microservices.ServiceComposerApplication;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ServiceComposerApplication.class)
public class TestcaseBase {

	@Autowired
	private ShoppingCartService cartService;
	
	protected void waitUntilBuildFinishes(final int buildNumber) {
		waitUntilBuildFinishes(buildNumber, 60);
	}
	
	protected void waitUntilBuildFinishes(final int buildNumber, int waitSeconds) {
		int  counter = 1;
		while (!cartService.isBuildReady(buildNumber)) {
			try {
				counter++;
				Thread.sleep(1000);
				if (counter > waitSeconds) {
					throw new RuntimeException("Build Timeout");
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
	
	protected void waitUntilDeploymentFinishes(final int buildNumber) {
		waitUntilDeploymentFinishes(buildNumber, 60);
	}
	
	protected void waitUntilDeploymentFinishes(final int buildNumber, int waitSeconds) {
		int  counter = 1;
		while (!cartService.isDeploymentDone(buildNumber)) {
			try {
				counter++;
				Thread.sleep(1000);
				if (counter > waitSeconds) {
					throw new RuntimeException("Build Timeout");
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
