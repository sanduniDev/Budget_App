import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext<any>(null);

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

interface Expense {
  id: string;
  description: string;
  amount: number;
  budgetId: string;
}

interface Budget {
  id: string;
  name: string;
  max: number;
}

interface BudgetsProviderProps {
  children: React.ReactNode;
}

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider: React.FC<BudgetsProviderProps> = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage<Budget[]>("budgets", []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);

  function getBudgetExpenses(budgetId: string): Expense[] {
    return expenses.filter((expense: { budgetId: string; }) => expense.budgetId === budgetId);
  }

  function addExpense({ description, amount, budgetId }: Expense): void {
    setExpenses((prevExpenses: any) => [
      ...prevExpenses,
      { id: uuidV4(), description, amount, budgetId },
    ]);
  }

  function addBudget({ name, max }: Budget): void {
    setBudgets((prevBudgets: any[]) => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  function deleteBudget({ id }: Budget): void {
    setExpenses((prevExpenses: any[]) => {
      return prevExpenses.map(expense => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((prevBudgets: any[]) => {
      return prevBudgets.filter(budget => budget.id !== id);
    });
  }

  function deleteExpense({ id }: Expense): void {
    setExpenses((prevExpenses: any[]) => {
      return prevExpenses.filter(expense => expense.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
