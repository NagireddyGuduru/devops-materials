package com.mphasis.ewt.gateway.filters.post;

import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "302RedirectUrls")
public class LocationRewriteSettings {

	private Map<String, String> settings;

	public Map<String, String> getSettings() {
		return settings;
	}

	public void setSettings(Map<String, String> settings) {
		this.settings = settings;
	}

}
