package com.flavio.cookbook.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.flavio.cookbook.models.Cook;
import com.flavio.cookbook.services.CookService;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/cooks")
public class CookController {

    private final CookService cookService;

    public CookController(CookService cookService) {
        this.cookService = cookService;
    }

    @GetMapping("/")
    public List<Cook> getAllCooks() {
        return cookService.getAllCooks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Cook>> getCookById(@PathVariable Long id) {
        Optional<Cook> Cook = cookService.getCookById(id);
        return Cook.isPresent() ? ResponseEntity.ok(Cook) : ResponseEntity.status(HttpStatus.NOT_FOUND).body(Cook);
    }

    @GetMapping("/user/{id}")
    public List<Cook> getCookByUserId(@PathVariable Long id) {
        return cookService.getAllCooksFromUser(id);
    }

    @GetMapping("/sort/{down}")
    public List<Cook> getCooksSortByRate(@PathVariable boolean down) {
        return cookService.getCooksSortByRate(down);
    }

    @PostMapping("/")
    public ResponseEntity<Cook> createCook(@RequestBody Cook Cook) {
        Cook savedCook = cookService.saveCook(Cook);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCook);
    }

    @PutMapping("/{id}")
    public void updateCook(@PathVariable Long id, @RequestBody Cook Cook) {
        if (cookService.getCookById(id).isPresent())
            cookService.updateCook(id, Cook);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCook(@PathVariable Long id) {
        if (cookService.getCookById(id).isPresent()) {
            cookService.deleteCook(id);
            return ResponseEntity.ok("Receta eliminada correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Receta no encontrada.");
        }
    }
}

