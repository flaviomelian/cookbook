package com.flavio.cookbook.repositories;
import com.flavio.cookbook.models.Cook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CookRepository extends JpaRepository<Cook, Long> {}
