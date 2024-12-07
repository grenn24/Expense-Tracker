export let categories: ReadonlyArray<string> = [
	"Transport",
	"Food",
	"Entertainment",
	"Utilities",
	"Travel",
] as const;

export const setCategories = (newCategories: ReadonlyArray<string>) =>
	(categories = newCategories);