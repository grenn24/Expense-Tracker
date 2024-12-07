import "./App.css";
import AddExpense from "./components/AddExpense";
import ViewExpenses from "./components/ViewExpenses";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import {categories} from "./components/Categories";

interface Expense {
	description: string;
	amount: string;
	category: (typeof categories)[number];
}

function App() {
	const [expenses, setExpenses] = useState<Expense[]>([]);

	const addExpenses = (expense: Expense) => setExpenses([...expenses, expense]);

	const deleteExpenses = (index: number) =>
		setExpenses(expenses.filter((_, i) => i !== index));


	return (
		<>
			<AddExpense addExpense={addExpenses} />
			<br />
			<br />
			<ViewExpenses expenses={expenses} deleteExpense={deleteExpenses} />
		</>
	);
}

export default App;
