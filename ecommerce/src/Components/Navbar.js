import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
      <li className="navbar-item">
          <Link to="/" className="navbar-link">
            ShowProducts
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/AdminPage" className="navbar-link">
            AdminPage
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/ShowUsers" className="navbar-link">
            ShowUsers
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/AddUsers" className="navbar-link">
            AddUsers
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/AddRole" className="navbar-link">
            AddRole
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/category" className="nav-link">
            Category List
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin/category/add" className="nav-link">
            Add Category
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/Products" className="navbar-link">
            Products
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/addproducts" className="navbar-link">
            Add Products
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
