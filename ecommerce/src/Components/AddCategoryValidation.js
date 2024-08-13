import * as Yup from "yup";

export const addCategoryValidation = Yup.object({
  name: Yup.string().min(3, "Category name must be at least 3 characters long").max(50, "Category name can't be more than 50 characters long").required("Please enter the name of the category"),
  description: Yup.string().min(10, "Description must be at least 10 characters long").optional()
});