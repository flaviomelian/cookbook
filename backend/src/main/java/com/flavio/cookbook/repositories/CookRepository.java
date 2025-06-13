package com.flavio.cookbook.repositories;
import com.flavio.cookbook.models.Cook;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CookRepository extends JpaRepository<Cook, Long> {
    List<Cook> findByUser_Id(Long userId);
}
