package com.mphasis.ewt.gateway.filters.post;
import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.POST_TYPE;
import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.SEND_RESPONSE_FILTER_ORDER;

import java.net.MalformedURLException;
import java.net.URL;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import com.netflix.util.Pair;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

@Component
public class ZipkinAuthRedirectionFilter extends ZuulFilter {
	
	private static final String HEADER_LOCATION = "Location";
	
	@Value("${zipkinServerAddress:zipkin-server}")
	private String zipkinServerAddress;
	
	@Value("${loginEndpoint:/login}")
	private String loginEndpoint;
	
	@Value("${zipkinAuthEndpoint:/zipkin-auth/login}")
	private String zipkinAuthEndpoint;
	
	
	@Override
	public boolean shouldFilter() {
		RequestContext ctx = RequestContext.getCurrentContext();
		int statusCode = ctx.getResponseStatusCode();
		return HttpStatus.valueOf(statusCode).is3xxRedirection();
	}

	@Override
	public int filterOrder() {
		return SEND_RESPONSE_FILTER_ORDER - 100;
	}

	@Override
	public String filterType() {
		return POST_TYPE;
	}

	@Override
	public Object run() {
		RequestContext context = RequestContext.getCurrentContext();

		for (final Pair<String, String> header : context.getZuulResponseHeaders()) {
			if (header.first().equalsIgnoreCase(HEADER_LOCATION)) {
				try {
					URL url = new URL(header.second());
					if (zipkinServerAddress.equalsIgnoreCase(url.getHost()) && 
							loginEndpoint.equalsIgnoreCase(url.getPath())) {
						header.setSecond(zipkinAuthEndpoint);
					}
					
				} catch (MalformedURLException e) {}
				break;
			}
		}
		return null;
	}
}
