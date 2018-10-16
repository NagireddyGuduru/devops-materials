package com.mphasis.ewt.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
//<block-stagemonitor-start>
import org.stagemonitor.core.Stagemonitor;
//<block-stagemonitor-end>

@EnableZuulProxy
@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		//<block-stagemonitor-start>
		Stagemonitor.init();
		//<block-stagemonitor-end>
		SpringApplication.run(GatewayApplication.class, args);
	}
}
