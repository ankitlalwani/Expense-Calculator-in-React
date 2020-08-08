package com.project.expenseTracker.Repository;

import com.project.expenseTracker.Models.Expense;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface ExpenseRepo extends CrudRepository<Expense, Long> {

    @Query("select E from Expense E where E.user.Username = :userName order by E.date")
    Collection<Expense> findByUserName(@Param("userName") String userName);
}
