package com.mphasis.ewt.democlient.config;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableOAuth2Sso
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Override
	public void configure(final HttpSecurity http) throws Exception {
		
		http
			.requestMatchers().antMatchers("/**")
		.and()
			.authorizeRequests()
				.antMatchers("/", "/login**", "/assets/**").permitAll()
				.anyRequest().authenticated()
		.and()
			.logout()
				.logoutSuccessUrl("/")
				.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
		.and()
			.csrf()
				.ignoringAntMatchers("/logout")
		;
	}
}
