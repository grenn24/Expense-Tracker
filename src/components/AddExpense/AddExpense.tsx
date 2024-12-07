import { useForm } from "react-hook-form";
import { categories, setCategories } from "../Categories";

interface Prop {
	addExpense: (expense: Expense) => void;
}
interface Expense {
	description: string;
	amount: string;
	category: (typeof categories)[number];
	customCategory?: string;
}

const AddExpense = ({ addExpense }: Prop) => {
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
					console.log(data);
					if (data.customCategory !== undefined) {
						setCategories([...categories, data.customCategory]);
						data.category = data.customCategory;
						delete data.customCategory;
					}
					addExpense({ ...data });
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
						<div className="input-group has-validation">
							<span className="input-group-text" id="inputGroupPrepend">
								$
							</span>
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
								<option key={index} value={category}>
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
