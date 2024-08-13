import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Link,
} from "react-router-dom";
import Category from "./Components/Category";
import AddProduct from "./AddProducts";
import ShowDetails from "./Components/UserDetails";
import UserDetails from "./Components/UserDetails";
import ShowUsers from "./Components/ShowUsers";
import AddUsers from "./Components/AddUsers";
import AdminPage from "./Components/AdminPage";
import OrderDetails from "./Components/OrderDetails";
import Navbar from "./Components/Navbar";
import CategoryPage from "./Components/CategoryPage";
import AddCategory from "./Components/AddCategory";
import EditCategory from "./Components/EditCategory";
import AddProducts from "./AddProducts";
import Home from "./Components/Home";
import ProductDetails from "./Components/ProductDetails";
import ProductsAPI from "./Components/ProductsAPI";
import CartPage from "./Components/CartPage";
import RoleForm from "./Components/RoleForm";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/admin/category" element={<CategoryPage />}>
            <Route path="add" element={<AddCategory />} />
            <Route path="edit/:id" element={<EditCategory />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserDetails />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/ShowUsers" element={<ShowUsers />}>
            <Route path=":userId" element={<ShowUsers />}></Route>
          </Route>
          <Route path="/AddUsers" element={<AddUsers />} />
          <Route path="/AdminPage" element={<AdminPage />}>
            <Route path=":orderId" element={<OrderDetails />} />
          </Route>
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/Home" element={<Home />}>
            <Route path=":id" element={<ProductDetails />} />
          </Route>
          <Route path="/Products" element={<ProductsAPI />} />
          <Route path="/cartPage" element={<CartPage />} />
          <Route path="/AddRole" element={<RoleForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
