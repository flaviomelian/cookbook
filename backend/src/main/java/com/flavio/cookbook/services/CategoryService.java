package com.flavio.cookbook.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flavio.cookbook.models.Category;
import com.flavio.cookbook.repositories.CategoryRepository;

@Service
public class CategoryService {
    
     @Autowired
    private CategoryRepository CategoryRepository;

    public List<Category> getAllCategories() {
        return CategoryRepository.findAll();
    }

    public Category saveCategory(Category Category) {
        return CategoryRepository.save(Category);
    }

    public Optional<Category> getCategoryById(Long id) {
        return CategoryRepository.findById(id);
    }

    public void deleteCategory(Long id) {
        CategoryRepository.deleteById(id);
    }

    public void updateCategory(Category Category) {
        CategoryRepository.save(Category);
    }

}
