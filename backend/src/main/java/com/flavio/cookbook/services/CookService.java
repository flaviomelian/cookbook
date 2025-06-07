package com.flavio.cookbook.services;
import org.springframework.stereotype.Service;
import com.flavio.cookbook.repositories.CookRepository;
import com.flavio.cookbook.models.Cook;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class CookService {
    
    @Autowired
    private CookRepository cookRepository;

    public List<Cook> getAllCooks() {
        return cookRepository.findAll();
    }

    public Cook saveCook(Cook cook) {
        return cookRepository.save(cook);
    }

    public Optional<Cook> getCookById(Long id) {
        return cookRepository.findById(id);
    }

    public void deleteCook(Long id) {
        cookRepository.deleteById(id);
    }

    public void updateCook(Cook cook) {
        cookRepository.save(cook);
    }

}
