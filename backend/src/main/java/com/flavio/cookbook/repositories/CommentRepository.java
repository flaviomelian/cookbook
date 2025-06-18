package com.flavio.cookbook.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.flavio.cookbook.models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.cook.id = :cookId ORDER BY c.createdAt DESC")
    List<Comment> findAllCommentsByCook(@Param("cookId") Long cookId);
}
