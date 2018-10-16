package com.mphasis.ewt.oauth2.interfaces;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mphasis.ewt.oauth2.application.IUserService;
import com.mphasis.ewt.oauth2.domain.model.security.User;

@RestController
@RequestMapping("/users")
public class UsersRestService {

	@Autowired
	private IUserService userService;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Collection<User>> getUsers() {
		return new ResponseEntity<Collection<User>>(userService.getUsers(), HttpStatus.OK);
	}
}
