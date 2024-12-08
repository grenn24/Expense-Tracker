import "./App.css";
import AddExpense from "./components/AddExpense";
import ViewExpenses from "./components/ViewExpenses";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import { initialCategories } from "./components/InitialCategories.js";

function App() {
	interface Expense {
		id: number;
		description: string;
		amount: string;
		category: (typeof categories)[number];
		date: string;
		time: string;
	}

	//Initialise the categories state variable with the value in local storage or the initial categories
	const [categories, setCategories] = useState<ReadonlyArray<String>>(
		localStorage.getItem("categories")
			? JSON.parse(localStorage.getItem("categories") as string)
			: initialCategories
	);

	//Initialise the expenses state variable with the value in local storage or []
	const [expenses, setExpenses] = useState<Expense[]>(
		localStorage.getItem("expenses")
			? JSON.parse(localStorage.getItem("expenses") as string)
			: []
	);

	//Function for updating categories in state variable and local storage
	const updateCategories = (newCategories: ReadonlyArray<String>) => {
		localStorage.setItem("categories", JSON.stringify(newCategories));
		setCategories(newCategories);
	};

	//Function for updating expenses in state variable and local storage
	const updateExpenses = (newExpenses: Expense[]) => {
		localStorage.setItem("expenses", JSON.stringify(newExpenses));
		setExpenses(newExpenses);
	};

	//Delete expense in state variable and local storage
	const deleteExpenses = (index: number) =>
		updateExpenses(expenses.filter((_, i) => i !== index));

	return (
		<>
			<AddExpense
				addExpenses={(expense: Expense) => {
					expense.id = expenses.length;
					updateExpenses([...expenses, expense]);
				}}
				updateExpenses={updateExpenses}
				categories={categories}
				updateCategories={updateCategories}
			/>
			<br />
			<br />
			<br />
			<ViewExpenses
				expenses={expenses}
				deleteExpense={deleteExpenses}
				categories={categories}
			/>
		</>
	);
}

export default App;
