package com.minhduy.service;

import java.util.List;

import com.minhduy.entity.Account;

public interface AccountService {

	Account findById(String username);

	List<Account> getAdministrators();

	List<Account> findAll();

	Account create(Account account);

	void delete(String username);
}
