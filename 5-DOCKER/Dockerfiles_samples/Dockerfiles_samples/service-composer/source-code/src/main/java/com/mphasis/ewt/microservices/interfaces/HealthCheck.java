package com.mphasis.ewt.microservices.interfaces;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheck {

	@GetMapping("/ping")
	public ResponseEntity<String> ping() {
		return new ResponseEntity<String>("pong", HttpStatus.OK);
	}
}
