import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { addCategoryValidation } from "./AddCategoryValidation";
import "./AddCategory.css";

const initialValues = {
  name: "",
  description: "",
};

function AddCategory() {
  const navigate = useNavigate();
  const { addCategory } = useOutletContext();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/categories",
        values
      );
      addCategory(response.data.category);
      resetForm();
      navigate("/admin/category");
    } catch (err) {
      alert("An error occurred: " + (err.message || "Unable to add the item."));
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-category-container">
      <h1 className="form-title">Add New Category</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={addCategoryValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="category-form">
            <Field
              name="name"
              placeholder="Category Name"
              className="form-input"
            />
            {touched.name && errors.name && <small>{errors.name}</small>}
            <br />
            <Field
              name="description"
              placeholder="Category Description"
              as="textarea"
              className="form-textarea"
            />
            {touched.description && errors.description && <small>{errors.description}</small>}
            <br />
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              Add Category
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddCategory;