package com.flavio.cookbook.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.cookbook.models.User;
import com.flavio.cookbook.services.UserService;
import java.util.List;
import java.util.Map;
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
        Optional<User> user = userService.getUserById(id);
        return user.isPresent() ? ResponseEntity.ok(user) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(user);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userService.getUserByEmail(user.getEmail()) != null) 
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El usuario ya existe");

        
        User savedUser = userService.saveUser(user);

        Map<String, String> response = Map.of("email", savedUser.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User saveduser = userService.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveduser);
    }

    @PutMapping("/{id}")
    public void updateuser(@PathVariable Long id, @RequestBody User user) {
        if (userService.getUserById(id).isPresent())
            userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteuser(@PathVariable Long id) {
        if (userService.getUserById(id).isPresent()) {
            userService.deleteUser(id);
            return ResponseEntity.ok("Usuario eliminado correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrada.");
        }
    }
}
