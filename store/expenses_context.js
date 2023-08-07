import { createContext, useReducer } from "react";

const dummyExpenses = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2021-01-5')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2022-12-01')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2021-02-19')
    },
    {
        id: 'e5',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2022-02-18')
    }
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: ({id}) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id },...state];
        case 'UPDATE':
            const updateableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updateableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data }
            const updateExpenses = [...state];
            updateExpenses[updateableExpenseIndex] = updatedItem;
            return updateExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload.id);
        default:
            return state;            
    }
}

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, dummyExpenses);

    function addExpense({expenseData}) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense({id, expenseData}) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData  } });
    }

    function updateExpense({id}) {
        dispatch({ type: 'DELETE', payload: id });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;