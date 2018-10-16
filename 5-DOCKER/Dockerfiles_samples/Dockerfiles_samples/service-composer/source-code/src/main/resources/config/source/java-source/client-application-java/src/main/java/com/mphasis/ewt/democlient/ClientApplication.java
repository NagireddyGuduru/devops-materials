package com.mphasis.ewt.democlient;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//<block-stagemonitor-start>
import org.stagemonitor.core.Stagemonitor;
//<block-stagemonitor-end>
@SpringBootApplication
public class ClientApplication {

	public static void main(final String[] args) {
		//<block-stagemonitor-start>
		Stagemonitor.init();
		//<block-stagemonitor-end>
		SpringApplication.run(ClientApplication.class, args);
	}
}
