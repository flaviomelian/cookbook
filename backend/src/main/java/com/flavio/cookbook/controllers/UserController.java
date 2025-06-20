package com.flavio.cookbook.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.flavio.cookbook.components.JwtUtil;
import com.flavio.cookbook.models.User;
import com.flavio.cookbook.services.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
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
        Optional<User> existing = userService.getUserByEmail(user.getEmail());
        if (existing.isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El usuario ya existe");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setActive(true);
        user.setRole(user.getRole());
        user.setName(user.getName());
        userService.saveUser(user);
        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        Optional<User> userOpt = userService.getUserByEmail(email);
        ;
        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email or password is incorrect");
        String token = jwtUtil.generateToken(email);
        return ResponseEntity.ok(Map.of("token", token, "user", userOpt.get()));
    }

    @PostMapping("/{id}/validate-password")
    public ResponseEntity<Map<String, Boolean>> validatePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> credentials) {
        String password = credentials.get("password");
        Optional<User> userOpt = userService.getUserById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("valid", false));
        }
        User user = userOpt.get();
        boolean valid = passwordEncoder.matches(password, user.getPassword());
        return ResponseEntity.ok(Map.of("valid", valid));
    }

    @PutMapping("/{id}")
public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
    Optional<User> userOpt = userService.getUserById(id);
    if (userOpt.isEmpty()) 
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    User existingUser = userOpt.get();
    existingUser.setName(user.getName());
    existingUser.setEmail(user.getEmail());
    existingUser.setLanguage(user.getLanguage());
    if (user.getPassword() != null && !user.getPassword().isEmpty()) 
        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
    existingUser.setUpdatedAt(LocalDateTime.now());
    userService.saveUser(existingUser);
    return ResponseEntity.ok(existingUser);
}

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (userService.getUserById(id).isPresent()) {
            userService.deleteUser(id);
            return ResponseEntity.ok("Usuario eliminado correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrada.");
        }
    }
}
