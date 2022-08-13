package com.minhduy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.minhduy.entity.Account;
import com.minhduy.repository.AccountRepo;
import com.minhduy.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService {

	@Autowired
	private AccountRepo accountRepo;
	
	@Override
	public Account findById(String username) {
		return accountRepo.findById(username).get();
	}

	@Override
	public List<Account> findAll() {
		return accountRepo.findAll();
	}

	@Override
	public List<Account> getAdministrators() {
		return accountRepo.getAdministrators();
	}

	@Override
	public Account create(Account account) {
		return accountRepo.save(account);
	}

	@Override
	public void delete(String username) {
		accountRepo.deleteById(username);
	}

}
