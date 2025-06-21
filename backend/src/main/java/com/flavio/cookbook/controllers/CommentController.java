package com.flavio.cookbook.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.flavio.cookbook.dto.CommentDTO;
import com.flavio.cookbook.models.Comment;
import com.flavio.cookbook.models.Cook;
import com.flavio.cookbook.models.User;
import com.flavio.cookbook.services.CommentService;
import com.flavio.cookbook.services.CookService;
import com.flavio.cookbook.services.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final UserService userService;
    private final CookService cookService;

    public CommentController(CommentService commentService, UserService userService, CookService cookService) {
        this.commentService = commentService;
        this.userService = userService;
        this.cookService = cookService;
    }

    @GetMapping
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Comment>> getCommentById(@PathVariable Long id) {
        Optional<Comment> Comment = commentService.getCommentById(id);
        return Comment.isPresent() ? ResponseEntity.ok(Comment)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(Comment);
    }

    @GetMapping("/cook/{id}")
    public List<CommentDTO> getCommentByCookId(@PathVariable Long id) {
        return commentService.getAllCommentsFromCook(id);
    }

    @PostMapping("/")
    public ResponseEntity<Comment> createComment(@RequestBody CommentDTO commentDTO) {
        // Busca el usuario y la receta por ID
        User user = userService.getUserById(commentDTO.getUserId()).orElseThrow();
        Cook cook = cookService.getCookById(commentDTO.getCookId()).orElseThrow();

        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setUser(user);
        comment.setCook(cook);
        comment.setCreatedAt(LocalDateTime.now());

        Comment savedComment = commentService.saveComment(comment);
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
