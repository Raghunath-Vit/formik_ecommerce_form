import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
//  import "./EditCategory.css";

const EditCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateCategory } = useOutletContext();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/categories/${id}`)
      .then((response) => {
        setCategory(response.data.category);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/categories/${id}`,
        category
      );
      updateCategory(response.data.category);
      navigate("/admin/category");
    } catch (err) {
      alert(
        "An error occurred: " +
          (err.message || "Unable to update the category.")
      );
      console.error(err);
    }
  };

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="edit-category-container">
      <h1 className="form-title">Edit Category</h1>
      <form onSubmit={handleSubmit} className="category-form">
        <input
          name="name"
          value={category.name}
          onChange={handleChange}
          placeholder="Category Name"
          className="form-input"
        />{" "}
        <br />
        <textarea
          name="description"
          value={category.description}
          onChange={handleChange}
          placeholder="Category Description"
          className="form-textarea"
        />{" "}
        <br />
        <button type="submit" className="submit-button">
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
