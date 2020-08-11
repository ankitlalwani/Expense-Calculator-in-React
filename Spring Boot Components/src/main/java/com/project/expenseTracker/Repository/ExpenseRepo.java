package com.project.expenseTracker.Repository;

import com.project.expenseTracker.Models.Expense;
import com.project.expenseTracker.Models.ExpenseDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

@Repository
public interface ExpenseRepo extends CrudRepository<Expense, Long> {

    @Query("select E from Expense E where E.user.Username = :userName order by E.date desc")
    Collection<Expense> findByUserName(@Param("userName") String userName);

    @Query("select new com.project.expenseTracker.Models.ExpenseDetails(sum(E.amount), E.category.CategoryType) from Expense E where E.user.Username = :userName and E.date like %:month% group by E.category")
    ArrayList<ExpenseDetails> findByUserNameAndMonth(@Param("userName") String userName, @Param("month") String month);
}
