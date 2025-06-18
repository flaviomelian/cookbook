package com.flavio.cookbook.dto;
import java.time.LocalDateTime;
import com.flavio.cookbook.models.Comment;
import lombok.Data;

@Data
public class CommentDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private Long userId;
    private String userEmail;

    // Constructor
    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
        this.userId = comment.getUser().getId();
        this.userEmail = comment.getUser().getEmail();
    }

}

