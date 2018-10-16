package com.mphasis.ewt.democlient.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Component
public class SsoLogoutHandler implements LogoutHandler {

	@Autowired
	private RestTemplate restTemplate;
	
	@Value("${security.oauth2.client.tokenInvalidateUri}")
	private String tokenInvalidateUri;
	
	@Override
    public void logout(final HttpServletRequest httpServletRequest, final HttpServletResponse httpServletResponse, final Authentication authentication) {
		
        Object details = authentication.getDetails();
        if (details.getClass().isAssignableFrom(OAuth2AuthenticationDetails.class)) {
            String accessToken = ((OAuth2AuthenticationDetails)details).getTokenValue();
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("access_token", accessToken);

            @SuppressWarnings({ "rawtypes", "unchecked" })
			HttpEntity<Object> request = new HttpEntity(params);
            try {
                restTemplate.exchange(tokenInvalidateUri, HttpMethod.POST, request, Object.class);
            } catch(HttpClientErrorException e) {
                e.printStackTrace();
            }
        }
	}
}
