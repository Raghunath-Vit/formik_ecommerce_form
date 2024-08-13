import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductsAPI.css";

function ProductsAPI() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addedProducts, setAddedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    displayProducts();
  }, []);

  const displayProducts = () => {
    const url = "http://localhost:3000/api/v1/products";
    axios
      .get(url)
      .then((response) => {
        setData(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToCart = (product) => {
    let newCart = [...cart];
    const productIndex = newCart.findIndex((item) => item._id === product._id);

    if (productIndex === -1) {
      newCart.push({ ...product, quantity: 1 });
      setCount(count + 1);
      setAddedProducts([...addedProducts, product._id]);
    } else {
      newCart[productIndex].quantity += 1;
    }

    setCart(newCart);
    setTotalPrice(totalPrice + product.price);
  };

  const updateQuantity = (productId, amount) => {
    let newCart = [...cart];
    const productIndex = newCart.findIndex((item) => item._id === productId);

    if (productIndex !== -1) {
      const newQuantity = newCart[productIndex].quantity + amount;
      if (newQuantity > 0) {
        newCart[productIndex].quantity = newQuantity;
        setTotalPrice(totalPrice + newCart[productIndex].price * amount);
      } else {
        setTotalPrice(
          totalPrice -
            newCart[productIndex].price * newCart[productIndex].quantity
        );
        newCart = newCart.filter((item) => item._id !== productId);
        setCount(count - 1);
      }
    }

    setCart(newCart);
  };

  const goToCart = () => {
    navigate("/CartPage", { state: { cart, totalPrice } });
  };

  return (
    <div className="ProductsAPI">
      <button className="cartButton" onClick={goToCart}>
        <p>Cart</p>
        <p>{count}</p>
      </button>
      <div className="ProductsCard">
        {data.map((value) => (
          <div className="inner" key={value._id}>
            <p>
              <b>Name:</b> {value.name}
            </p>
            <br />
            <p>
              <b>Excerpt:</b> {value.excerpt}
            </p>
            <br />
            <p>
              <b>Price:</b> {value.price}
            </p>
            <br />
            <button
              onClick={() => addToCart(value)}
              disabled={addedProducts.includes(value._id)}
            >
              {addedProducts.includes(value._id) ? "Added" : "Add to Cart"}
            </button>
            <button onClick={() => updateQuantity(value._id, 1)}>+</button>
            <button onClick={() => updateQuantity(value._id, -1)}>-</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsAPI;
