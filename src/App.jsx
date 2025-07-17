import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PublicLayout from "./layouts/publicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Register from "./pages/authPages/Register";
import Login from "./pages/authPages/Login";
import Home from "./pages/CorePages/Home";
import Products from "./Components/Products";
import "./App.css";
import ProductCard from "./Components/ProductCard";
import Overview from "./pages/Dashboard/Overview";
import ProtectedRoutes from "./layouts/protectedRoutes";
import Profile from "./User/Profile";
import Header from "./Components/Header";
import ProductList from "./pages/Dashboard/ProductLists";
import UsersList from "./pages/Dashboard/UsersList";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import CategoryProducts from "./Components/CategoryProducts";
import Cart from "./Components/Cart";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes with header */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductCard />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route
            path="/category/:categoryName"
            element={<CategoryProducts />}
          />
        </Route>
        {/* <Route path="/brand/:brandName" element={<BrandPage />} /> */}

        {/* Admin route without header */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <DashboardLayout />
            </ProtectedRoutes>
          }
        >
          <Route index path="overview" element={<Overview />} />
          <Route path="productList" element={<ProductList />} />
          <Route path="userslist" element={<UsersList />} />
        </Route>
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoutes allowedRoles={["user"]}>
              <Header />
              <Profile />
            </ProtectedRoutes>
          }
        ></Route>
        <Route path="/unauthorized" element={<h2>Unauthorized Access</h2>} />
      </Routes>
    </>
  );
}

export default App;
