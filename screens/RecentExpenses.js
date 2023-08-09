import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/expenses_output/ExpensesOutput";
import { ExpensesContext } from "../store/expenses_context";
import { getDateMinusDays } from "../utils/date";
import { getExpenses } from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        async function fetchExpenses() {
            setIsFetching(true);
            try {
                const expenses = await getExpenses();
                expensesCtx.setExpenses(expenses);
            } catch(error) {
                setError('Could not fetch expenses!');
            }
            setIsFetching(false);
        }
        fetchExpenses();
    }, []);

    if (error && !isFetching) {
        return <ErrorOverlay message={error} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date > date7DaysAgo) && (expense.date <= today);
    });

    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the last 7 days." />
}

export default RecentExpenses;