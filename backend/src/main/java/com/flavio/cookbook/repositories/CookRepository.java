package com.flavio.cookbook.repositories;

import com.flavio.cookbook.models.Cook;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CookRepository extends JpaRepository<Cook, Long> {
    List<Cook> findByUser_Id(Long userId);
    @Query("SELECT c FROM Cook c ORDER BY c.rating ASC")
    List<Cook> findAllOrderByRatingAsc();
    @Query("SELECT c FROM Cook c ORDER BY c.rating DESC")
    List<Cook> findAllOrderByRatingDesc();
}
