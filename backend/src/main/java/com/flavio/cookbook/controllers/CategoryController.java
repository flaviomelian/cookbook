package com.flavio.cookbook.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.cookbook.models.Category;
import com.flavio.cookbook.services.CategoryService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/")
    public List<Category> getAllCategorys() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Category>> getCategoryById(@PathVariable Long id) {
        Optional<Category> Category = categoryService.getCategoryById(id);
        return Category.isPresent() ? ResponseEntity.ok(Category) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(Category);
    }

    @PostMapping("/")
    public ResponseEntity<Category> createCategory(@RequestBody Category Category) {
        Category savedCategory = categoryService.saveCategory(Category);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    @PutMapping("/{id}")
    public void updateCategory(@PathVariable Long id, @RequestBody Category Category) {
        if (categoryService.getCategoryById(id).isPresent())
            categoryService.updateCategory(Category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        if (categoryService.getCategoryById(id).isPresent()) {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("Categoria eliminada correctamente.");
        } else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria no encontrada.");
        
    }
}
