package com.minhduy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.minhduy.entity.Role;
import com.minhduy.repository.RoleRepo;
import com.minhduy.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	RoleRepo roleRepo;

	@Override
	public List<Role> findAll() {
		return roleRepo.findAll();
	}
}
