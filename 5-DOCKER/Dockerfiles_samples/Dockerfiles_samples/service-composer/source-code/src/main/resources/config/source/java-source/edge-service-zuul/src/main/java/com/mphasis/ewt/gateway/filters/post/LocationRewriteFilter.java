package com.mphasis.ewt.gateway.filters.post;

import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.POST_TYPE;
import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.SEND_RESPONSE_FILTER_ORDER;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.netflix.util.Pair;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

@Component
public class LocationRewriteFilter extends ZuulFilter {

	private static final String HEADER_LOCATION = "Location";
	private static final String HEADER_FOWARDED_PROTOCOL = "x-forwarded-proto";
	private static final String HEADER_FOWARDED_HOST = "x-forwarded-host";
	private static final String HEADER_FOWARDED_PORT = "x-forwarded-port";
	
	@Value("${edgeService.uri}")
	private String edgeServiceUri;
	
	@Value("${edgeService.port}")
	private String edgeServicePort;
	
	private LocationRewriteSettings settings;
	
	public LocationRewriteFilter(final LocationRewriteSettings settings) {
		Map<String, String> map = new HashMap<String, String>();
		final String redirectUri;
		if (edgeServiceUrlConfiguredExpicitly()) {
			redirectUri = getConfiguredEdgeServiceHost();
		} else {
			redirectUri = getEdgeServiceUriFromHeaders();
		}
			
		for (Map.Entry<String, String> entry : settings.getSettings().entrySet()) {
			map.put(entry.getKey(), redirectUri + entry.getValue());
		}
		this.settings = settings;
		this.settings.setSettings(map);
	}
	
	private boolean edgeServiceUrlConfiguredExpicitly() {
		return !StringUtils.isEmpty(edgeServiceUri);
	}
	
	private String getConfiguredEdgeServiceHost() {
		final String edgeServerUri;
		if (StringUtils.isEmpty(edgeServicePort)) {
			edgeServerUri = edgeServiceUri;
		} else {
			edgeServerUri = edgeServiceUri + ":" + edgeServicePort;
		}
		return edgeServerUri;
	}
	
	private String getEdgeServiceUriFromHeaders() {
		final RequestContext context = RequestContext.getCurrentContext();
		StringBuffer edgeServerUri = new StringBuffer();
		if (!StringUtils.isEmpty(context.getZuulRequestHeaders().get(HEADER_FOWARDED_HOST))) {
			if (StringUtils.isEmpty(context.getZuulRequestHeaders().get(HEADER_FOWARDED_PROTOCOL))) {
				edgeServerUri.append("http");
			} else {
				edgeServerUri.append(context.getZuulRequestHeaders().get(HEADER_FOWARDED_PROTOCOL));
			}
			edgeServerUri.append("://");
			edgeServerUri.append(context.getZuulRequestHeaders().get(HEADER_FOWARDED_HOST));
			if (!StringUtils.isEmpty(context.getZuulRequestHeaders().get(HEADER_FOWARDED_PORT))) {
				edgeServerUri.append(':');
				edgeServerUri.append(context.getZuulRequestHeaders().get(HEADER_FOWARDED_PORT));
			}
		}
		return edgeServerUri.toString();
	}
	
	@Override
	public boolean shouldFilter() {
		RequestContext ctx = RequestContext.getCurrentContext();
		int statusCode = ctx.getResponseStatusCode();
		return HttpStatus.valueOf(statusCode).is3xxRedirection() && settings != null;
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
					String urlFilePart = url.getFile().toLowerCase();
					for (Map.Entry<String, String> entry : settings.getSettings().entrySet()) {
						final String contextPath = "/" + entry.getKey().toLowerCase();
						if (urlFilePart.startsWith(contextPath)) {
							header.setSecond(
									entry.getValue() + url.getFile().substring(contextPath.length()));
						}
					}
				} catch (MalformedURLException e) {}
				break;
			}
		}
		return null;
	}
}
