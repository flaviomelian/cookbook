package com.flavio.cookbook.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Optional<User> getuserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteuser(Long id) {
        userRepository.deleteById(id);
    }

    public void updateuser(User user) {
        userRepository.save(user);
    }

}
