import React, { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  useOutletContext,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { fetchOrders } = useOutletContext();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/orders/${orderId}`)
      .then((response) => {
        setOrder(response.data.order);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch order details");
        setLoading(false);
      });
  }, [orderId]);

  const handleDeleteOrder = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/orders/${id}`)
      .then(() => {
        fetchOrders();
        navigate("/AdminPage");
      })
      .catch(() => {
        setError("Failed to delete order");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return <p>No order found</p>;

  return (
    <div className="OrderDetailsPage">
      <h2>Order Details</h2>
      <h3>Order Name: {order.serial}</h3>
      <ul>
        {order.orderItems.map((item) => (
          <li key={item._id}>
            {console.log(item)}
            <div>Product Name: {item.product?.name || "N/A"}</div>
            <div>Product Price: ${item.product?.price || "N/A"}</div>
            <div>Product Quantity: {item.qty}</div>
          </li>
        ))}
      </ul>
      <button onClick={() => handleDeleteOrder(order._id)}>Delete Order</button>
      <button onClick={() => navigate("/AdminPage")}>Close</button>
      <Outlet />
    </div>
  );
};

export default OrderDetails;
