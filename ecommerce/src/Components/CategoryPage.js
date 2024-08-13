import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// import './AdminPage.css';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/categories")
      .then((response) => {
        setCategories(response.data.categories);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/categories/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (err) {
      setError(err.message || "An error occurred while deleting the category.");
    }
  };

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    );
  };

  const showCategoryList = !location.pathname.includes("/admin/category/add");

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="admin-page">
      <Outlet context={{ addCategory, updateCategory }} />
      {showCategoryList && (
        <div className="category-list">
          <h1 className="page-title">Category List</h1>
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category._id} className="category-item">
                <h2 className="category-name">{category.name}</h2>
                <p className="category-description">{category.description}</p>
                <Link
                  to={`/admin/category/edit/${category._id}`}
                  className="edit-button"
                >
                  Edit
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="no-categories">No categories available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
