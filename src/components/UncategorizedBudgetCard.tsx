import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetContext";
import BudgetCard from "./BudgetCard";

interface UncategorizedBudgetCardProps {
  onAddExpenseClick: () => void;
  onViewExpensesClick: () => void;
}

export default function UncategorizedBudgetCard({
  onAddExpenseClick,
  onViewExpensesClick,
}: UncategorizedBudgetCardProps): JSX.Element | null {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total: any, expense: { amount: any; }) => total + expense.amount,
    0
  );

  if (amount === 0) {
    return null;
  }

  return (
    <BudgetCard
          amount={amount}
          name="Uncategorized"
          gray
          onAddExpenseClick={onAddExpenseClick}
          onViewExpensesClick={onViewExpensesClick} max={0}    />
  );
}
