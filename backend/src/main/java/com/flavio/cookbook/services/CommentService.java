package com.flavio.cookbook.services;

import org.springframework.stereotype.Service;
import com.flavio.cookbook.repositories.CommentRepository;
import com.flavio.cookbook.dto.CommentDTO;
import com.flavio.cookbook.models.Comment;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    public void updateComment(Long id, Comment comment) {
        Optional<Comment> commentUpdate = commentRepository.findById(id);
        if (commentUpdate.isPresent()) {
            Comment commentSave = commentUpdate.get();
            commentSave.setContent(comment.getContent());
            commentSave.setCreatedAt(comment.getCreatedAt());
            commentSave.setUser(comment.getUser());
            commentRepository.save(commentSave);
        }
    }

    public List<CommentDTO> getAllCommentsFromCook(Long id) {
        return commentRepository.findAllCommentsByCook(id).stream()
                .map(CommentDTO::new)
                .collect(Collectors.toList());
    }

}
