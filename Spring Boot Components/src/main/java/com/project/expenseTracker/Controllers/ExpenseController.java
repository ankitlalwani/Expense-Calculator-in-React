package com.project.expenseTracker.Controllers;

import com.project.expenseTracker.Models.Category;
import com.project.expenseTracker.Models.Expense;
import com.project.expenseTracker.Repository.ExpenseRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ExpenseController {

    private ExpenseRepo expenseRepo;

    public ExpenseController(ExpenseRepo expenseRepo1){
        super();
        this.expenseRepo=expenseRepo1;
    }

    @GetMapping("/getExpenses")
    Collection<Expense> getAllExpenses(){
        return (Collection<Expense>) expenseRepo.findAll();
    }

    @GetMapping("/expenses/{userName}")
    Collection<Expense> getExpensesByID(@PathVariable String userName){
        return expenseRepo.findByUserName(userName);
    }

    @PostMapping("/expenses")
    ResponseEntity<Expense> addCategory(@RequestBody Expense expense) throws URISyntaxException {

        Expense result = expenseRepo.save(expense);
        return ResponseEntity.created(new URI(("/api/category")+result.getId())).body(result);
    }

    @RequestMapping(value="/expenses/{id}", method=RequestMethod.DELETE)
    ResponseEntity<Expense> deleteExpense(@PathVariable("id") long Id) throws URISyntaxException {

        expenseRepo.deleteById(Id);
        return ResponseEntity.ok().build();
    }
}
