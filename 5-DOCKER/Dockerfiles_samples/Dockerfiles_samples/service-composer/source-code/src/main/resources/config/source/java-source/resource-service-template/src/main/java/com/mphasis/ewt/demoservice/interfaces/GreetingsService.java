package com.mphasis.ewt.demoservice.interfaces;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RefreshScope
public class GreetingsService {

	@Value("${greetings:Hello default}")
	private String greetings;
	
	@Value("${db.username:mysql}")
	private String dbUsername;
	
	@Value("${db.password:password}")
	private String dbPassword;
	
	@GetMapping("/greetings")
	public String greetings() {
		return greetings;
	}
}
