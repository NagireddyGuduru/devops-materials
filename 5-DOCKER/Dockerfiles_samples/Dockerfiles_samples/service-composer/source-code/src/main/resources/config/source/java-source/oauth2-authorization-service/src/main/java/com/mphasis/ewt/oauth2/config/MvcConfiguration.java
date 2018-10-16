package com.mphasis.ewt.oauth2.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MvcConfiguration extends WebMvcConfigurerAdapter {

	@Override
	public void addViewControllers(final ViewControllerRegistry registry) {
		registry.addViewController("/login").setViewName("/login");
	}
}
