package com.flavio.cookbook.models;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "cooks")
public class Cook {

    // Atributos
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String steps;
    private String ingredients;
    @ManyToMany
    @JoinTable(
        name = "cook_user",
        joinColumns = @JoinColumn(name = "cook_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();

    // Constructor
    public Cook() {
    }

    public Cook(Long id, String name, String description, String steps, String ingredients) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.steps = steps;
        this.ingredients = ingredients;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    } 
    
    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    } 
}
