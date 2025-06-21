package com.flavio.cookbook.dto;

import java.time.LocalDateTime;

import com.flavio.cookbook.models.Comment;

import lombok.Data;

@Data
public class CommentDTO {
    private String content;
    private Long userId;
    private String username;
    private Long cookId;
    private LocalDateTime createdAt = LocalDateTime.now();

    public CommentDTO() {
        // Default constructor
    }

    public CommentDTO(Comment comment) {
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
        this.userId = comment.getUser().getId();
        this.username = comment.getUser().getName();
    }
}
