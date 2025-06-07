package com.flavio.cookbook.repositories;
import com.flavio.cookbook.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {}
