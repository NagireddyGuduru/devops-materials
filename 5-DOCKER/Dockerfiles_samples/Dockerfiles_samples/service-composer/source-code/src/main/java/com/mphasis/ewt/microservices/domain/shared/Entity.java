package com.mphasis.ewt.microservices.domain.shared;

public interface Entity<T> {

	boolean sameIdentityAs(T other);
}
