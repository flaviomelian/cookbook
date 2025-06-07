package com.flavio.cookbook.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.cookbook.models.User;
import com.flavio.cookbook.services.UserService;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public List<User> getAllusers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getuserById(@PathVariable Long id) {
        Optional<User> user = userService.getuserById(id);
        return user.isPresent() ? ResponseEntity.ok(user) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(user);
    }

    @PostMapping("/")
    public ResponseEntity<User> createuser(@RequestBody User user) {
        User saveduser = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveduser);
    }

    @PutMapping("/{id}")
    public void updateuser(@PathVariable Long id, @RequestBody User user) {
        if (userService.getuserById(id).isPresent())
            userService.updateuser(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteuser(@PathVariable Long id) {
        if (userService.getuserById(id).isPresent()) {
            userService.deleteuser(id);
            return ResponseEntity.ok("Receta eliminada correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Receta no encontrada.");
        }
    }
}

