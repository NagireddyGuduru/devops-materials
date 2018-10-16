package com.mphasis.ewt.demoservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//<block-stagemonitor-start>
import org.stagemonitor.core.Stagemonitor;
//<block-stagemonitor-end>

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class DemoServiceApplication {
	public static void main(String args[]) {
		//<block-stagemonitor-start>
		Stagemonitor.init();
		//<block-stagemonitor-end>
		SpringApplication.run(DemoServiceApplication.class, args);
	}
}
