import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModel"; // Corrected import

// import AddExpenseModal from "./components/AddExpenseModal";
// import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
// import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
// import TotalBudgetCard from "./components/TotalBudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import { TotalBudgetCard } from "./components/TotalBudgetCard";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App(): JSX.Element {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState<boolean>(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState<string | undefined>();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState<string | undefined>();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId: string | undefined): void {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={() => openAddExpenseModal(undefined)}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget: { id: string; name: string; max: number }) => {
  const amount = getBudgetExpenses(budget.id).reduce(
    (total: number, expense: { amount: number }) => total + expense.amount,
    0
  );
  return (
    <BudgetCard
      key={budget.id.toString()} // Convert to string for the key
      name={budget.name}
      amount={amount}
      max={budget.max}
      onAddExpenseClick={() => openAddExpenseModal(budget.id)}
      onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
    />
  );
})}

          <UncategorizedBudgetCard
            onAddExpenseClick={() => openAddExpenseModal(undefined)}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
     <ViewExpensesModal
  budgetId={viewExpensesModalBudgetId !== undefined ? viewExpensesModalBudgetId : null}
  handleClose={() => setViewExpensesModalBudgetId(undefined)}
/>

    </>
  );
}

export default App;
