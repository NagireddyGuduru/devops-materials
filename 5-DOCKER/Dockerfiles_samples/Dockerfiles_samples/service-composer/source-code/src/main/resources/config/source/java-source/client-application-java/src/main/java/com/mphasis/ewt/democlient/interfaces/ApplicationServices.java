package com.mphasis.ewt.democlient.interfaces;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@RestController
public class ApplicationServices {
	
	//<block-resource-service-template-start>
	@Value("${dependentServices.demoServiceUri}")
	private String demoServiceUri;
	
	@Autowired
	private  RestTemplate restTemplate;
	//<block-resource-service-template-end>
	
	@GetMapping("/user/me")
    public ResponseEntity<Principal> user(Principal principal) {
		if (null == principal) {
			return ResponseEntity.badRequest().body(null);
		} else {
			return ResponseEntity.ok().body(principal);
		}
    }
	
	//<block-resource-service-template-start>
	@GetMapping("/pingDemoService")
	public ResponseEntity<String> pingDemoService() {
		try {
			final ResponseEntity<String> response = restTemplate.exchange(
					demoServiceUri + "/ping", 
					HttpMethod.GET, 
					null, 
					String.class);
			return new ResponseEntity<String>("Received from DemoService :" + response.getBody(), response.getStatusCode());
		} catch (HttpClientErrorException e) {
			if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
				//invalidate the authentication when the token is expired.
				SecurityContextHolder.getContext().setAuthentication(null);
			}
			return new ResponseEntity<String>(e.getStatusCode());
		}
	}
	
	//<block-oauth2-authorization-service-start>
	@GetMapping("/contacts")
	public ResponseEntity<String> callServiceChain() {
		try {
			final ResponseEntity<String> response = restTemplate.exchange(
					demoServiceUri + "/allUsers", 
					HttpMethod.GET, 
					null, 
					String.class);
			return new ResponseEntity<String>(response.getBody(), response.getStatusCode());
		} catch (HttpClientErrorException e) {
			if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
				//invalidate the authentication when the token is expired.
				SecurityContextHolder.getContext().setAuthentication(null);
			}
			return new ResponseEntity<String>(e.getStatusCode());
		}
	}
	//<block-oauth2-authorization-service-end>
	//<block-resource-service-template-end>
}
