import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ShowProducts() {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    displayProducts();
  }, []);

  useEffect(() => {
    if (id) {
      viewProductDetails(id);
    }
  }, [id]);

  const displayProducts = () => {
    const url = "http://localhost:3000/api/v1/products";
    axios.get(url)
      .then(response => {
        setData(response.data.products);
      })
      .catch(error => {
        console.error(error);
        alert("Error fetching products.");
      });
  };

  const viewProductDetails = (productId) => {
    axios.get(`http://localhost:3000/api/v1/products/${productId}`)
      .then(response => {
        setSelectedProduct(response.data.product);
        navigate(`/ShowProducts/${productId}`);
      })
      .catch(error => {
        console.error(error);
      })
  };

  const deleteData = (productId) => {
    axios.delete(`http://localhost:3000/api/v1/products/${productId}`)
      .then(() => {
        displayProducts();
        setSelectedProduct(null);
        navigate('/ShowProducts');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='outer'>
      <h1>Display All Products</h1>
      <div className='content'>
        <div className='product-list'>
          {data.map(value => (
            <div className='product-item' key={value._id}>
              <p><b>Name:</b> {value.name}</p>
              <p><b>Price:</b> {value.price}</p>
              <button onClick={() => viewProductDetails(value._id)}>View Details</button>
            </div>
          ))}
        </div>
        <div className='product-details-container'>
          {selectedProduct && (
            <div className="product-details">
              <h1>Product Details</h1>
              <p><b>Code:</b> {selectedProduct.code}</p>
              <p><b>Name:</b> {selectedProduct.name}</p>
              <p><b>Excerpt:</b> {selectedProduct.excerpt}</p>
              <p><b>Category:</b> {selectedProduct.category.name}</p>
              <p><b>Status:</b> {selectedProduct.status ? 'True' : 'False'}</p>
              <p><b>Price:</b> {selectedProduct.price}</p>
              <button onClick={() => deleteData(selectedProduct._id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowProducts;