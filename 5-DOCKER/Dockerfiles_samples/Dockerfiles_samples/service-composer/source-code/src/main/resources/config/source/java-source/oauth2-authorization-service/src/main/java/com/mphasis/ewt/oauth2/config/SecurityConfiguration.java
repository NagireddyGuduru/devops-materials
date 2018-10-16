package com.mphasis.ewt.oauth2.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.mphasis.ewt.oauth2.application.impl.UserDetailsService;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	@Qualifier("userDetailsService")
	private UserDetailsService userDetailsService;
	
	@Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
	public void configure(final AuthenticationManagerBuilder authManagerBuilder) throws Exception {
		authManagerBuilder
				.userDetailsService(userDetailsService)
				.passwordEncoder(passwordEncoder());
	}
	
	@Override
	public void configure(final HttpSecurity http) throws Exception {
		
		http
			//the client is required to be authenticated before authorizing a token and login end point requires to be open
			.requestMatchers().antMatchers("/login", "/oauth/authorize", "/assets/**") 
		.and()
			.authorizeRequests()
				.antMatchers("/login").permitAll()
				.anyRequest().authenticated()
		.and()
			.formLogin()
				.loginPage("/login")
				.usernameParameter("sso-username")
				.passwordParameter("sso-password")
		;
		
		http
			//allow access to static assets
			.requestMatchers().antMatchers("/assets/css/**", "/assets/js/**") 
		.and()
			.authorizeRequests().anyRequest().permitAll()
		;
	}
}
