import { useForm } from "react-hook-form";
import { initialCategories } from "../InitialCategories.js";

interface Prop {
	addExpenses: (expense: Expense) => void;
	updateExpenses: (expenses: Expense[]) => void;
	categories: ReadonlyArray<String>;
	updateCategories: (newCategory: ReadonlyArray<String>) => void;
}
interface Expense {
	id: number;
	description: string;
	amount: string;
	category: any;
	customCategory?: string;
	date: string;
	time: string;
}

const AddExpense = ({
	addExpenses,
	categories,
	updateCategories,
	updateExpenses,
}: Prop) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<Expense>();

	return (
		<>
			<form
				onSubmit={handleSubmit((data) => {
					if (data.customCategory !== undefined) {
						updateCategories([...categories, data.customCategory] as const);
						data.category = data.customCategory;
						delete data.customCategory;
					}
					addExpenses({ ...data });
					console.log(data);
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
									minLength: (value: string) => value.length >= 3,
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
						<div className="input-group has-validation">
							<span className="input-group-text" id="inputGroupPrepend">
								$
							</span>
							<input
								{...register("amount", {
									required: true,
									validate: {
										isNumber: (value) => /^\d+$/.test(value),
									},
								})}
								type="tel"
								className={"form-control"}
								id="amount"
								autoComplete="new-password"
								aria-describedby="inputGroupPrepend"
							/>
						</div>
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
								validate: {
									isEmpty: (value) => value !== "empty",
								},
							})}
							defaultValue="empty"
						>
							<option value="empty" disabled></option>
							{categories.map((category, index) => (
								<option key={index} value={category as string}>
									{category}
								</option>
							))}
							<option key={categories.length} value="Custom">
								Custom
							</option>
						</select>
						{errors.category?.type === "isEmpty" ? (
							<span style={{ color: "red" }}>
								The category field is required
							</span>
						) : null}
						{(watch("category") as string) === "Custom" ? (
							<>
								<div>
									<input
										{...register("customCategory", {
											required: true,
										})}
										type="text"
										className="form-control"
										id="customCategory"
										placeholder="Add a custom category"
									/>
								</div>
								{errors?.customCategory?.type === "required" ? (
									<span style={{ color: "red" }}>
										Please enter a custom category
									</span>
								) : null}
							</>
						) : null}
					</div>
					<div className="row">
						<div className="mb-3 col">
							<label htmlFor="date" className="form-label">
								Date
							</label>
							<input
								{...register("date", {
									required: true,
								})}
								type="date"
								className={"form-control"}
								id="date"
								autoComplete="new-password"
							></input>
							{errors.date?.type === "isEmpty" ? (
								<span style={{ color: "red" }}>The date field is required</span>
							) : null}
						</div>
						<div className="mb-3 col">
							<label htmlFor="time" className="form-label">
								Time
							</label>
							<input
								{...register("time", {
									required: true,
								})}
								type="time"
								className={"form-control"}
								id="time"
								autoComplete="new-password"
							></input>
							{errors.date?.type === "isEmpty" ? (
								<span style={{ color: "red" }}>The time field is required</span>
							) : null}
						</div>
					</div>

					<br />
					<div
						className="btn-toolbar d-flex justify-content-center"
						role="toolbar"
					>
						<button
							className={`btn btn-primary me-3 w-auto`}
							type="submit"
							onClick={() => {}}
						>
							Submit Expense
						</button>
						<button
							className={`btn btn-primary me-3 w-auto`}
							type="button"
							onClick={() => {
								updateExpenses([]);
							}}
						>
							Reset Expenses
						</button>
						<button
							className={`btn btn-primary me-3 w-auto`}
							type="button"
							onClick={() => {
								updateCategories(initialCategories);
							}}
						>
							Reset Categories
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default AddExpense;
