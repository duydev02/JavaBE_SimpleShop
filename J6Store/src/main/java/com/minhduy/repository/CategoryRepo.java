package com.minhduy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.minhduy.entity.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, String> {

}
