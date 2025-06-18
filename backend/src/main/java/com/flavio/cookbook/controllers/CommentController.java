package com.flavio.cookbook.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.flavio.cookbook.dto.CommentDTO;
import com.flavio.cookbook.models.Comment;
import com.flavio.cookbook.services.CommentService;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Comment>> getCommentById(@PathVariable Long id) {
        Optional<Comment> Comment = commentService.getCommentById(id);
        return Comment.isPresent() ? ResponseEntity.ok(Comment) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(Comment);
    }

    @GetMapping("/cook/{id}")
    public List<CommentDTO> getCommentByCookId(@PathVariable Long id) {
        return commentService.getAllCommentsFromCook(id);
    }

    @PostMapping("/")
    public ResponseEntity<Comment> createComment(@RequestBody Comment Comment) {
        Comment savedComment = commentService.saveComment(Comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }

    @PutMapping("/{id}")
    public void updateComment(@PathVariable Long id, @RequestBody Comment Comment) {
        if (commentService.getCommentById(id).isPresent())
            commentService.updateComment(id, Comment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id) {
        if (commentService.getCommentById(id).isPresent()) {
            commentService.deleteComment(id);
            return ResponseEntity.ok("Comentario eliminado correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comentario no encontrado.");
        }
    }
}
