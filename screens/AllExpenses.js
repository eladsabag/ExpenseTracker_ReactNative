import ExpensesOutput from "../components/expenses_output/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses_context";

function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No registered expenses found!" />
}

export default AllExpenses;