package com.mphasis.ewt.microservices.interfaces.cart;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mphasis.ewt.microservices.application.ShoppingCartService;
import com.mphasis.ewt.microservices.interfaces.cart.dto.CheckoutRequest;
import com.mphasis.ewt.microservices.interfaces.cart.dto.CheckoutResponse;

@RestController
@RequestMapping(value="/cart", produces="application/json")
public class ShoppingCartRestService {

	@Autowired
	private ShoppingCartService cartService;
	
	@PostMapping("/checkout")
	public ResponseEntity<CheckoutResponse> checkout(@RequestBody CheckoutRequest request) {
		final CheckoutResponse result = new CheckoutResponse();
		final int buildNumber = cartService.checkout(
									request.getOrganizationName(), 
									request.getOrganizationUrl(), 
									request.getProjectName(), 
									request.getProjectUrl(), 
									request.getProjectDescription(), 
									request.getSelectedServices()); 
		result.setComposeStatusUrl("/cart/composeStatus/" + buildNumber);
		result.setDownloadUrl("/cart/download/" + buildNumber);
		result.setDeployable(cartService.isBuildDeployable(request.getSelectedServices()));
		if (result.isDeployable()) {
			result.setDeploymentDetailsUrl("/cart/deploymentInfo/" + buildNumber);
			result.setDeployUrl("/cart/deploy/" + buildNumber);
			result.setRedeployUrl("/cart/redeploy/" + buildNumber);
			result.setDeploymentStatusUrl("/cart/deploymentStatus/" + buildNumber);
			result.setDeploymentLogsUrl("/cart/deploymentLogs/" + buildNumber);
		}
		
		return new ResponseEntity<CheckoutResponse>(result, HttpStatus.OK);
	}
	
	@GetMapping("/composeStatus/{buildNumber}")
	public ResponseEntity<Boolean> getComposeStatus(@PathVariable("buildNumber") int buildNumber) {
		return new ResponseEntity<Boolean>(cartService.isBuildReady(buildNumber), HttpStatus.OK);
	}
	
	@GetMapping("/download/{buildNumber}")
	public ResponseEntity<Resource> getBuildContent(@PathVariable("buildNumber") int buildNumber) {
		final File buildContent = cartService.getBuildContent(buildNumber);
		if (null == buildContent) {
			return new ResponseEntity<Resource>(HttpStatus.NOT_FOUND);
		} else {
			try {
				ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(buildContent.toPath()));
				return ResponseEntity
							.ok()
							.header("Content-Disposition", "attachment; filename=source-code.zip")
							.contentLength(buildContent.length())
							.contentType(MediaType.APPLICATION_OCTET_STREAM)
							.body(resource);
			} catch (IOException e) {
				return new ResponseEntity<Resource>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
	
	@GetMapping("/deploymentInfo/{buildNumber}")
	public ResponseEntity<Map<String, String>> getDeploymentInfo(@PathVariable("buildNumber") int buildNumber) {
		return new ResponseEntity<Map<String, String>>(
					cartService.getDeploymentInfo(buildNumber), 
					HttpStatus.OK);
	}
	
	@PostMapping(value="/deploy/{buildNumber}")
	public ResponseEntity<Boolean> deploy(@PathVariable("buildNumber") int buildNumber, 
							@RequestBody HashMap<String, String> deploymentParameters,
							HttpServletResponse response) {
		
		return new ResponseEntity<Boolean>(cartService.deployBuild(buildNumber, deploymentParameters), HttpStatus.OK);
	}
	
	@PostMapping(value="/redeploy/{buildNumber}")
	public ResponseEntity<Boolean> redeploy(@PathVariable("buildNumber") int buildNumber, 
							@RequestBody HashMap<String, String> deploymentParameters,
							HttpServletResponse response) {
		
		return new ResponseEntity<Boolean>(cartService.redeployBuild(buildNumber, deploymentParameters), HttpStatus.OK);
	}
	
	@GetMapping("/deploymentStatus/{buildNumber}")
	public ResponseEntity<Boolean> getDeploymentStatus(@PathVariable("buildNumber") int buildNumber) {
		return new ResponseEntity<Boolean>(cartService.isDeploymentDone(buildNumber), HttpStatus.OK);
	}
	
	@GetMapping(value = "/deploymentLogs/{buildNumber}")
	public ResponseEntity<Map<String, String>> getDeploymentLogs(@PathVariable("buildNumber") int buildNumber) {
		return new ResponseEntity<Map<String, String>>(cartService.getDeploymentLogs(buildNumber, 0), HttpStatus.OK);
	}
	
	@GetMapping(value = "/deploymentLogs/{buildNumber}/{readFrom}")
	public ResponseEntity<Map<String, String>> getDeploymentLogsFrom(@PathVariable("buildNumber") int buildNumber,
						@PathVariable("readFrom") long readFrom) {
		return new ResponseEntity<Map<String, String>>(cartService.getDeploymentLogs(buildNumber, readFrom), HttpStatus.OK);
	}
}
