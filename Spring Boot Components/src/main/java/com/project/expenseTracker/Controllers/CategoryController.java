package com.project.expenseTracker.Controllers;

import com.project.expenseTracker.Models.Category;
import com.project.expenseTracker.Repository.CategoryRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private CategoryRepo categoryRepo;

    public CategoryController(CategoryRepo categoryRepo){
        super();
        this.categoryRepo = categoryRepo;
    }

    @GetMapping("/categories")
    Collection<Category> categories(){
        return (Collection<Category>) categoryRepo.findAll();
    }

    @GetMapping("/category/{Id}")
    ResponseEntity<?> getCategory(@PathVariable long Id){
        Optional<Category> category = categoryRepo.findById(Id);
     return category.map(response -> ResponseEntity.ok().body(response))
             .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/category")
    ResponseEntity<Category> addCategory(@RequestBody Category category) throws URISyntaxException {

        Category result = categoryRepo.save(category);
        return ResponseEntity.created(new URI(("/api/category")+result.getId())).body(result);
    }

    @PutMapping("/category")
    ResponseEntity<Category> updateCategory(@RequestBody Category category) throws URISyntaxException {

        Category result = categoryRepo.save(category);
        return ResponseEntity.created(new URI(("/api/category")+result.getId())).body(result);
    }

    @RequestMapping(value="/category/{id}", method=RequestMethod.DELETE)
    ResponseEntity<Category> deleteCategory(@PathVariable("id") long Id) throws URISyntaxException {

        categoryRepo.deleteById(Id);
        return ResponseEntity.ok().build();
    }

}
