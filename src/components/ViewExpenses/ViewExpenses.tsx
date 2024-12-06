import { MdDeleteForever } from "react-icons/md";
import { useForm } from "react-hook-form";

interface Expense {
	description: string;
	amount: number;
	category: string;
}

interface Prop {
	expenses: Expense[];
	deleteExpense: (index: number) => void;
}
const ViewExpenses = ({ expenses, deleteExpense }: Prop) => {
	const { register, watch } = useForm();
   const watchFilter = watch("filter");
  
  const filteredExpenses = expenses.filter((x: Expense) =>
		watchFilter === "All" ? true : x.category === watchFilter
	);

  let totalAmount = 0;

  for (let i = 0 ; i < filteredExpenses.length ; i++) {
    totalAmount += Number(filteredExpenses[i].amount);
  }

	return (
		<>
			<div className="mb-3">
				<select
					className="form-select"
					aria-label="Default select example"
					id="filter"
					{...register("filter")}
				>
					<option selected>All</option>
					<option value="Transport">Transport</option>
					<option value="Food">Food</option>
					<option value="Entertainment">Entertainment</option>
					<option value="Utilities">Utilities</option>
					<option value="Travel">Travel</option>
				</select>
			</div>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Description</th>
						<th scope="col">Amount</th>
						<th scope="col">Category</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{filteredExpenses.map((expense, index) => (
						<tr key={index}>
							<th scope="row">{index + 1}</th>
							<td>{expense.description}</td>
							<td>{`\$${expense.amount}`}</td>
							<td>{expense.category}</td>
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
						<td>{`\$${totalAmount}`}</td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default ViewExpenses;
