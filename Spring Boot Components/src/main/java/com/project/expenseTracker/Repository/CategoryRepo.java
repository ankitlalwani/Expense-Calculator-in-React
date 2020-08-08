package com.project.expenseTracker.Repository;

import com.project.expenseTracker.Models.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepo  extends CrudRepository<Category, Long> {

}
