package com.mphasis.ewt.democlient.interfaces;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Controller
public class NavigationService {
	
	//<block-oauth2-authorization-service-start>
	@Value("${security.oauth2.resource.userInfoUri}")
	private String oauthUserInfoUri;
	
	@Autowired
	private  RestTemplate restTemplate;
	//<block-oauth2-authorization-service-end>
	
	//<block-micro-frontends-start>
	@Value("${dependentServices.microFrontendAppUri}")
	private String microFrontendsAppUri;
	
	@RequestMapping(value = "/microFrontendApp", method = RequestMethod.GET)
	public String gotoMicroFrontends(final HttpServletRequest request, final HttpServletResponse response) {
		if (isOAuthTokenValid(request)) {
			//<block-oauth2-authorization-service-start>
			final Object details = SecurityContextHolder.getContext().getAuthentication().getDetails();
			String accessToken = null;
			if (details.getClass().isAssignableFrom(OAuth2AuthenticationDetails.class)) {
				accessToken = ((OAuth2AuthenticationDetails) details).getTokenValue();
				final Cookie accessTokenCookie = new Cookie("access_token", accessToken);
				accessTokenCookie.setPath("/");
				response.addCookie(accessTokenCookie);
			}
			if (null != accessToken) {
				//<block-oauth2-authorization-service-end>
				return "redirect:" + microFrontendsAppUri;
				//<block-oauth2-authorization-service-start>
			}
			//<block-oauth2-authorization-service-end>
		}
		return "redirect:/";
	}
	//<block-micro-frontends-end>
	
	private boolean isOAuthTokenValid(final HttpServletRequest request) {
		//<block-oauth2-authorization-service-start>
		try {
			restTemplate.exchange(
					oauthUserInfoUri, 
					HttpMethod.GET, 
					null, 
					String.class);
		} catch (HttpClientErrorException e) {
			if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
				//invalidate the authentication when the token is expired.
				SecurityContextHolder.getContext().setAuthentication(null);
			}
			request.getSession().invalidate();
			return false;
		}
		//<block-oauth2-authorization-service-end>
		return true;
	}
}
