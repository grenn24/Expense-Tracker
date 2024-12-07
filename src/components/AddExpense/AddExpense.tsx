import { useForm } from "react-hook-form";

interface Prop {
	addExpense: (expense: Expense) => void;
}
interface Expense {
	description: string;
	amount: string;
	category: (typeof categories)[number];
}
const categories = [
	"Transport",
	"Food",
	"Entertainment",
	"Utilities",
	"Travel",
] as const;

const AddExpense = ({ addExpense }: Prop) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Expense>();

	return (
		<>
			<form
				onSubmit={handleSubmit((data) => {
					console.log(data);
					addExpense({ ...data });
					reset();
				})}
			>
				<div>
					<div className="mb-3">
						<label htmlFor="description" className="form-label">
							Description
						</label>

						<input
							{...register("description", {
								required: true,
								validate: {
									minLength: (value) => value.length >= 3,
								},
							})}
							type="text"
							className={`form-control`}
							id="description"
							autoComplete="new-password"
						/>
						{errors.description?.type === "required" ? (
							<span style={{ color: "red" }}>
								The description field is required
							</span>
						) : null}
						{errors.description?.type === "minLength" ? (
							<span style={{ color: "red" }}>
								The description must contain at least 3 characters
							</span>
						) : null}
					</div>
					<div className="mb-3">
						<label htmlFor="amount" className="form-label">
							Amount
						</label>
						<input
							{...register("amount", {
								required: true,
								validate: {
									isNumber: (value) => /\d+/.test(value),
								},
							})}
							type="text"
							className={"form-control"}
							id="amount"
							autoComplete="new-password"
						/>
						{errors.amount?.type === "required" ? (
							<span style={{ color: "red" }}>The amount field is required</span>
						) : null}
						{errors.amount?.type === "isNumber" ? (
							<span style={{ color: "red" }}>The amount must be a number</span>
						) : null}
					</div>

					<div className="mb-3">
						<label htmlFor="category" className="form-label">
							Category
						</label>
						<select
							className="form-select"
							aria-label="Default select example"
							id="category"
							{...register("category", {
								required: true,
							})}
						>
							<option selected></option>
							{categories.map((x) => (
								<option value={x}>{x}</option>
							))}
						</select>
						{errors.category?.type === "required" ? (
							<span style={{ color: "red" }}>
								The category field is required
							</span>
						) : null}
					</div>

					<br />
					<button
						className={`btn btn-primary`}
						type="submit"
						onClick={() => {}}
					>
						Submit Expense
					</button>
				</div>
			</form>
		</>
	);
};

export default AddExpense;
