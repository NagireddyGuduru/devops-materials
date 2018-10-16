package com.mphasis.ewt.gateway.interfaces;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class EdgeService {

	@Value("${homePage}")
	private String homePage;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String welcome() {
		return "redirect:" + homePage;
	}
}
