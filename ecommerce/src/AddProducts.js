import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProducts.css";
function AddProducts() {
  const [product, setProduct] = useState({
    code: "",
    name: "",
    excerpt: "",
    stock: "",
    category: "",
    price: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/v1/products", product);
      alert("Item Added Successfully");
      setProduct({
        code: "",
        name: "",
        excerpt: "",
        stock: "",
        category: "",
        price: "",
      });
      navigate("/Home");
    } catch (err) {
      alert("An error occurred: " + (err.message || "Unable to add the item."));
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          name="code"
          value={product.code}
          onChange={handleChange}
          placeholder="Product Code"
        />{" "}
        <br />
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
        />{" "}
        <br />
        <input
          name="excerpt"
          value={product.excerpt}
          onChange={handleChange}
          placeholder="Product Excerpt"
        />{" "}
        <br />
        <input
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Product Stock"
        />{" "}
        <br />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Product Category"
        >
          <option value="66aa03ca12354b0f244c6eef">Clothes</option>
          <option value="66aa03ed12354b0f244c6ef0">Electronics</option>
          <option value="66aa042e12354b0f244c6ef1">Jewellery</option>
        </select>{" "}
        <br />
        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        />{" "}
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProducts;
