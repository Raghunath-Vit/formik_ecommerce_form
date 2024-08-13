import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { editCategoryValidation } from "./EditCategoryValidation";

const EditCategory = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateCategory } = useOutletContext();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/categories/${id}`)
      .then((response) => {
        setInitialValues(response.data.category);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/categories/${id}`,
        values
      );
      updateCategory(response.data.category);
      navigate("/admin/category");
    } catch (err) {
      alert(
        "An error occurred: " +
          (err.message || "Unable to update the category.")
      );
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="edit-category-container">
      <h1 className="form-title">Edit Category</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={editCategoryValidation}
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
              Update Category
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCategory;