package com.project.expenseTracker.Models;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ExpenseDetails {

    Double sum_of_amounts;
    String Category_Type;

    public Double getSum_of_amounts() {
        return sum_of_amounts;
    }

    public void setSum_of_amounts(Double sum_of_amounts) {
        this.sum_of_amounts = sum_of_amounts;
    }

    public String getCategory_Type() {
        return Category_Type;
    }

    public void setCategory_Type(String category_Type) {
        Category_Type = category_Type;
    }

    public ExpenseDetails(Double amount, String categoryType){
        this.sum_of_amounts=amount;
        this.Category_Type=categoryType;
    }

}
