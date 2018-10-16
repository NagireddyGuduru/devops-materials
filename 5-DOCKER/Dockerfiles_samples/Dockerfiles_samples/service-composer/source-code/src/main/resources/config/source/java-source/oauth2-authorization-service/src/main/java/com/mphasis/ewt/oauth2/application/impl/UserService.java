package com.mphasis.ewt.oauth2.application.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.mphasis.ewt.oauth2.application.IUserService;
import com.mphasis.ewt.oauth2.domain.model.security.IUserRepository;
import com.mphasis.ewt.oauth2.domain.model.security.User;

@Service
public class UserService implements IUserService {

	@Autowired
	private IUserRepository userRepository;
		
	@Override
	@PreAuthorize("hasRole('ADMINISTRATOR')")
	public List<User> getUsers() {
		return userRepository.findAll();
	}
}	
