package com.minhduy.service;

import java.util.List;

import com.minhduy.entity.Authority;

public interface AuthorityService {

	List<Authority> findAll();

	Authority create(Authority auth);

	void delete(Integer id);

	List<Authority> findAuthoritiesOfAdministrators();

	void register(String username);

}
