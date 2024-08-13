import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/${id}`
        );
        setProduct(response.data.product);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching the product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${id}`);
      navigate("/Home"); // Redirect to the product list
    } catch (err) {
      setError(err.message || "An error occurred while deleting the product.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  const { name, price, description, category, stock } = product;

  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <h2>{name}</h2>
        <p>Price: ${price}</p>
        <p>Description: {description}</p>
        <p>Category: {category ? category.name : "No category"}</p>
        <p>Stock: {stock}</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default ProductDetails;
