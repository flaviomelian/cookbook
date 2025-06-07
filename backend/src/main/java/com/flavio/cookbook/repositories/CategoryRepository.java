package com.flavio.cookbook.repositories;
import com.flavio.cookbook.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {}