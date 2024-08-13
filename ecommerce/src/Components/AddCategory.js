import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import "./AddCategory.css";

function AddCategory() {
  const [category, setCategory] = useState({ name: "", description: "" });
  const navigate = useNavigate();
  const { addCategory } = useOutletContext();

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/categories",
        category
      );
      addCategory(response.data.category);
      setCategory({ name: "", description: "" });
      navigate("/admin/category");
    } catch (err) {
      alert("An error occurred: " + (err.message || "Unable to add the item."));
      console.error(err);
    }
  };

  return (
    <div className="add-category-container">
      <h1 className="form-title">Add New Category</h1>
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
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
