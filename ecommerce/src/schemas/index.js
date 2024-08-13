import * as Yup from "yup";

export const addRoleSchema=Yup.object({
    name:Yup.string().min(2).max(25).required("Please Enter the role"),
    status:Yup.boolean()
})