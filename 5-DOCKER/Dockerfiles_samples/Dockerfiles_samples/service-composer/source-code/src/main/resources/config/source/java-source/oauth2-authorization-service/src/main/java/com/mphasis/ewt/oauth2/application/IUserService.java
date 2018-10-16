package com.mphasis.ewt.oauth2.application;

import java.util.List;

import com.mphasis.ewt.oauth2.domain.model.security.User;

public interface IUserService {

	List<User> getUsers();
}
