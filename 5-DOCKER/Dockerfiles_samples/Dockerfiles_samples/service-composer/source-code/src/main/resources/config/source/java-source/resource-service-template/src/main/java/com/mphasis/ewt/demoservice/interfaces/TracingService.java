package com.mphasis.ewt.demoservice.interfaces;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.sleuth.Span;
import org.springframework.cloud.sleuth.Tracer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RefreshScope
@RequestMapping("/trace")
public class TracingService {

	private static Logger log = LoggerFactory.getLogger(TracingService.class);
	
	/*@Autowired
	private RestTemplate restTemplate;*/
	
	@Autowired
	private Tracer tracer;
	
	@GetMapping("/simple")
	public String simple() {
		log.info("Trace with one span");
		return "I am a trace with one span";
	}
	
	@GetMapping("/complex")
	public String complex() {
		log.info("Trace with multiple spans");
		someTask();
		return "I am a trace with multiple span";
	}
	
	private void someTask() {
		Span span = tracer.createSpan("someTask");
		try {
			tracer.addTag("taskType", "sample");
			log.info("From a subtask");
			Thread.sleep(new Double(Math.random() * 10 * 1000).longValue());
			span.logEvent("Wait task completed");
		} catch (Exception e) {
			
		}
		tracer.close(span);
	}
}
