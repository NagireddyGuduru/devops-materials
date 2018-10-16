package com.mphasis.ewt.democlient.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ServiceConfiguration {

	@Bean
	public RestTemplate oauth2RestTemplate() {
		final RestTemplate restTemplate = new RestTemplate();
		//<block-oauth2-authorization-service-start>
		restTemplate.setInterceptors(Collections.singletonList(new Oauth2AuthorizationHeaderRequestInterceptor()));
		//<block-oauth2-authorization-service-end>
		return restTemplate;
	}
	
}
