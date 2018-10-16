package com.mphasis.ewt.demoservice.interfaces;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
//<block-api-documentation-swagger-start>
import io.swagger.annotations.ApiOperation;
//<block-api-documentation-swagger-end>

@RestController
public class HealthCheck {

	//<block-api-documentation-swagger-start>
	@ApiOperation(value = "Ping for health check",
					notes = "Ping for health check")
	//<block-api-documentation-swagger-end>
	@GetMapping("/ping")
	public ResponseEntity<String> ping() {
		return new ResponseEntity<String>("pong", HttpStatus.OK);
	}
}
