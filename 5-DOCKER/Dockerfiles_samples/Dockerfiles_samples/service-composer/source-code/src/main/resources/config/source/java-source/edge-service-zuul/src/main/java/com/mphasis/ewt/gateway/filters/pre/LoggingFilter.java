package com.mphasis.ewt.gateway.filters.pre;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;


import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.DEBUG_FILTER_ORDER;
import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.PRE_TYPE;

@Component
public class LoggingFilter extends ZuulFilter {

	private static Logger log = LoggerFactory.getLogger(LoggingFilter.class);
	
	@Override
	public boolean shouldFilter() {
		return true;
	}

	@Override
	public int filterOrder() {
		return DEBUG_FILTER_ORDER;
	}

	@Override
	public String filterType() {
		return PRE_TYPE;
	}
	
	@Override
	public Object run() {
		final RequestContext context = RequestContext.getCurrentContext();
		final HttpServletRequest request = context.getRequest();
		log.info(String.format("%s request to %s", request.getMethod(), request.getRequestURL().toString()));
		return null;
	}
}
