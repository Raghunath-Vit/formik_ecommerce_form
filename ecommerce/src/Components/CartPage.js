import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import "./CartPage.css";

const CartPage = () => {
  const location = useLocation();
  const { cart, totalPrice } = location.state;
  const [ordName, setordName] = useState("");
  const navigate = useNavigate();

  function changedordName(e) {
    setordName(e.target.value);
  }

  function placeOrder() {
    let newdata = {
      serial: ordName,
      total: totalPrice,
      orderItems: cart.map(function (val) {
        return {
          product: val._id,
          qty: val.quantity,
        };
      }),
    };
    axios
      .post("http://localhost:3000/api/v1/orders", newdata)
      .then((response) => {
        console.log(response.data);
        alert("Order Placed");
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
    navigate(`/Adminpage`);
  }

  return (
    <div className="CartPage">
      <h2>Cart Items</h2>
      <input
        type="text"
        value={ordName}
        onChange={changedordName}
        required
        placeholder="Enter Order Name"
      ></input>
      {cart.map((item) => (
        <div key={item._id} className="CartItem">
          <p>
            <b>Name:</b> {item.name}
          </p>
          <p>
            <b>Quantity:</b> {item.quantity}
          </p>
          <p>
            <b>Price:</b> {item.price}
          </p>
        </div>
      ))}
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      <button onClick={placeOrder} disabled={!ordName.trim()}>
        Place Order
      </button>
    </div>
  );
};

export default CartPage;
