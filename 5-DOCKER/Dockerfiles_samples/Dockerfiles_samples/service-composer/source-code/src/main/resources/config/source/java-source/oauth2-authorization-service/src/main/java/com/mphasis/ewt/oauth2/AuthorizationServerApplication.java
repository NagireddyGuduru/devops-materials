package com.mphasis.ewt.oauth2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//<block-stagemonitor-start>
import org.stagemonitor.core.Stagemonitor;
//<block-stagemonitor-end>

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AuthorizationServerApplication extends SpringBootServletInitializer {
									
	public static void main(String[] args) {
		//<block-stagemonitor-start>
		Stagemonitor.init();
		//<block-stagemonitor-end>
		SpringApplication.run(AuthorizationServerApplication.class, args);
	}
}
