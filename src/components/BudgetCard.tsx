import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

interface BudgetCardProps {
  name: string;
  amount: number;
  max: number;
  hideButtons?: boolean;
  onAddExpenseClick?: () => void;
  onViewExpensesClick?: () => void;
  variant?: "gray" | "primary" | "warning" | "danger";
  backgroundColor?: string;
  gray?: boolean; // Add the 'gray' prop
}

function getProgressBarVariant(amount: number, max: number): string {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}

export const BudgetCard: React.FC<BudgetCardProps> = (props) => {
  const {
    name,
    amount,
    max,
    hideButtons,
    onAddExpenseClick,
    onViewExpensesClick,
    variant = "primary",
    backgroundColor = "transparent",
    gray,
  } = props;

  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: backgroundColor,
  };

  return (
    <Card style={cardStyle} className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            <span className="text-muted fs-6 ms-1">
              / {currencyFormatter.format(max)}
            </span>
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={variant === "gray" ? "light" : getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button onClick={onViewExpensesClick} variant="outline-secondary">
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
