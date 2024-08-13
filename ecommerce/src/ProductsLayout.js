import React from "react";
import { Outlet, Link } from "react-router-dom";

function ProductsLayout() {
  return (
    <div>
      <nav>
        <Link to="/products">Product List</Link>
        <Link to="/products/add">Add Product</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default ProductsLayout;
