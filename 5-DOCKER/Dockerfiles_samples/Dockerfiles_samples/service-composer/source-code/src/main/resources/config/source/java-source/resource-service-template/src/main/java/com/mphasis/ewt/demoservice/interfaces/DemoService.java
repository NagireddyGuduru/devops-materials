package com.mphasis.ewt.demoservice.interfaces;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

//<block-api-documentation-swagger-start>
import io.swagger.annotations.ApiOperation;
//<block-api-documentation-swagger-end>

@RestController
public class DemoService {
	
	//<block-oauth2-authorization-service-start>
	@Value("${dependentServices.securityServiceUri}")
	private String securityServiceUri;
	//<block-oauth2-authorization-service-end>
	
	@Autowired
	private RestTemplate restTemplate;

	//<block-api-documentation-swagger-start>
	@ApiOperation(value = "Returns hello",
			notes = "Return hello")
	//<block-api-documentation-swagger-end>
	@RequestMapping("/hello")
	public ResponseEntity<String> hello() {
		return new ResponseEntity<String>("Hello...", HttpStatus.OK);
	}
	
	//<block-oauth2-authorization-service-start>
	//<block-api-documentation-swagger-start>
	@ApiOperation(value = "Can only be called by users with Adminstrator role",
				notes = "Can only be called by users with Adminstrator role")
	//<block-api-documentation-swagger-end>
	@RequestMapping("/admin/hello")	
	@PreAuthorize("hasRole('ADMINISTRATOR')")
	public ResponseEntity<String> helloAdmin() {
		return new ResponseEntity<String>("Hello Admin...", HttpStatus.OK);
	}
	
	//<block-api-documentation-swagger-start>
	@ApiOperation(value = "Returns all the usernames available registered in the user store",
			notes = "Returns all the usernames available registered in the user store")
	//<block-api-documentation-swagger-end>
	@RequestMapping("/allUsers")
	public ResponseEntity<List<String>> getAllUsers() {
		try {
			@SuppressWarnings("rawtypes")
			final ResponseEntity<List> response = restTemplate.exchange(
					securityServiceUri + "/users", 
					HttpMethod.GET, 
					null, 
					List.class);
			@SuppressWarnings("unchecked")
			final List<LinkedHashMap<String, Object>> usersMap = (List<LinkedHashMap<String, Object>>) response.getBody();
			final List<String> result = new ArrayList<String>();
			for (LinkedHashMap<String, Object> user: usersMap) {
				result.add((String)user.get("userName"));
			}
			return new ResponseEntity<List<String>>(result, HttpStatus.OK);
		} catch (HttpClientErrorException e) {
			return new ResponseEntity<List<String>>(e.getStatusCode());
		}
	}
	//<block-oauth2-authorization-service-end>
}
