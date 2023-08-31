import { useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

export  function TotalBudgetCard(): JSX.Element | null {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total: any, expense: { amount: any; }) => total + expense.amount, 0);
  const max = budgets.reduce((total: any, budget: { max: any; }) => total + budget.max, 0);

  if (max === 0) {
    return null;
  }

  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />;
}
