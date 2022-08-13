package com.minhduy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.minhduy.entity.Account;
import com.minhduy.entity.Authority;

@Repository
public interface AuthorityRepo extends JpaRepository<Authority, Integer> {

	@Query("SELECT DISTINCT a FROM Authority a WHERE a.account IN ?1")
	List<Authority> authoritiesOf(List<Account> accounts);

	@Modifying(clearAutomatically = true)
	@Query(value = "INSERT INTO Authorities(username, roleId) VALUES(?1, 'CUST')", nativeQuery = true)
	void register(String username);

}
