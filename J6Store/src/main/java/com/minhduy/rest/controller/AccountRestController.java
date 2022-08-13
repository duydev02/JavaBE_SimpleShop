package com.minhduy.rest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.minhduy.entity.Account;
import com.minhduy.service.AccountService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/accounts")
public class AccountRestController {

	@Autowired
	private AccountService accountService;

	@GetMapping
	public List<Account> getAccounts(@RequestParam("admin") Optional<Boolean> admin) {
		if (admin.orElse(false)) {
			return accountService.getAdministrators();
		}
		return accountService.findAll();
	}

	@PutMapping("/{username}")
	public Account post(@PathVariable("username") String username, @RequestBody Account account) {
		if (accountService.findById(username) != null) {
			return accountService.create(account);
		}
		return null;
	}
	
	@DeleteMapping("/{username}")
	public void delete(@PathVariable("username") String username) throws Exception {
		if (accountService.findById(username) != null) {
			accountService.delete(username);
		} else {
			throw new Exception("Not found username to delete!");
		}
	}
}
