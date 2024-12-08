import { MdDeleteForever } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { FaSort } from "react-icons/fa";

interface Expense {
	id: number;
	description: string;
	amount: string;
	category: any;
	customCategory?: string;
	date: string;
	time: string;
}

interface Prop {
	expenses: Expense[];
	deleteExpense: (index: number) => void;
	categories: ReadonlyArray<String>;
	currencySymbol: string;
}

const ViewExpenses = ({ expenses, deleteExpense, categories, currencySymbol }: Prop) => {
	const { register, watch } = useForm();

	const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);

	useEffect(() => {
		const sortedExpenses =
			watch("sort") === "most recent"
				? expenses.sort((a, b) => b.id - a.id)
				: watch("sort") === "amount"
				? expenses.sort((a, b) => Number(a.amount) - Number(b.amount))
				: watch("sort") === "category"
				? expenses.sort((a, b) => a.category.localeCompare(b.category))
				: expenses.sort(
						(a, b) =>
							new Date(a.date + " " + a.time).getTime() -
							new Date(b.date + " " + b.time).getTime()
				  );
		setFilteredExpenses(
			sortedExpenses.filter((expense) =>
				watch("filter") === "All" ? true : expense.category === watch("filter")
			)
		);
	}, [watch("filter"), expenses, watch("sort")]);

	let totalAmount = 0;

	for (let i = 0; i < filteredExpenses.length; i++) {
		totalAmount += Number(filteredExpenses[i].amount);
	}

	return (
		<>
			<div className="row">
				<div className="mb-3 d-flex col">
					<IoFilterSharp className="h-auto w-30 d-inline-block me-3 p-0" />
					<select
						className="form-select d-inline-block"
						aria-label="Default select example"
						id="filter"
						{...register("filter")}
						defaultValue="All"
					>
						<option>All</option>
						{categories.map((category, index) => (
							<option key={index} value={category as string}>
								{category}
							</option>
						))}
					</select>
				</div>
				<div className="mb-3 d-flex col">
					<FaSort className="h-auto w-5 d-inline-block me-3 p-0" />
					<select
						className="form-select d-inline-block"
						aria-label="Default select example"
						id="filter"
						{...register("sort")}
						defaultValue="most recent"
					>
						<option key="most recent" value="most recent">
							Most Recent
						</option>
						<option key="amount" value="amount">
							Amount
						</option>
						<option key="category" value="category">
							Category
						</option>
						<option key="date" value="date">
							Date | Time
						</option>
					</select>
				</div>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col"></th>
						<th scope="col">Description</th>
						<th scope="col">Amount</th>
						<th scope="col">Category</th>
						<th scope="col">Date | Time</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{filteredExpenses.map((expense, index) => (
						<tr key={index}>
							<th scope="row">{index + 1}.</th>
							<td>{expense.description}</td>
							<td>{`${currencySymbol} ${expense.amount}`}</td>
							<td>{expense.category}</td>
							<td>{`${expense.date} | ${expense.time}`}</td>
							<td>
								<button onClick={() => deleteExpense(index)} className="btn">
									<MdDeleteForever />
								</button>
							</td>
						</tr>
					))}
					<tr key={-1}>
						<th scope="row">Total</th>
						<td></td>
						<td>{`${currencySymbol} ${totalAmount}`}</td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default ViewExpenses;
