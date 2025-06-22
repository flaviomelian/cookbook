package com.flavio.cookbook.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;

import com.flavio.cookbook.models.Cook;
import com.flavio.cookbook.models.User;
import com.flavio.cookbook.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void addFavorite(User user, Cook cook){
        user.getFavorites().add(cook);
        userRepository.save(user);
    }

    public List<Cook> getAllFavouriteCooks(Long id) {
        return userRepository.findById(id).stream()
                .flatMap(user -> user.getFavorites().stream())
                .toList();
    }

}
