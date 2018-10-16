package com.mphasis.ewt.microservices.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class ErrorPagesController {

	@RequestMapping("/404")
    public RedirectView notFound(final HttpServletRequest request) {
        return new RedirectView(request.getContextPath());
    }
}
