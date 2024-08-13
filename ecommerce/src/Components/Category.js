import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/categories")
      .then((response) => {
        if (Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const newCategory = { name, description: description };

    axios
      .post("http://localhost:3000/api/v1/categories", newCategory)
      .then((response) => {
        setCategories([...categories, response.data.category]);
        setName("");
        setDescription("");
      })
      .catch((error) => console.error("Error adding category:", error))
      .finally(alert("Product added"));
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3000/api/v1/categories/${id}`)
      .then(() => {
        setCategories(categories.filter((category) => category._id !== id));
      })
      .catch((error) => console.error("Error deleting category:", error))
      .finally(alert(`product deleted ${id}`));
  }

  return (
    <>
      <div className="catlog">
        <h1>Product Category</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="category name"
            />
          </div>
          <div>
            <h2>Description</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="type description"
            />
          </div>
          <div className="button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div className="abcd">
        <h3>Product Cart</h3>
        <ul className="bullet">
          {categories.map((category) => (
            <li key={category._id}>
              {category.name} - {category.description}
              <button onClick={() => handleDelete(category._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Category;
