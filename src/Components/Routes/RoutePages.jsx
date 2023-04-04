import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Body/Home";
import Hero from "../Body/Hero/Hero";
import Register from "../Body/Register/Register";
import Login from "../Body/Login/Login";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import Cart from "../Cart/Cart";
import Products from "../Products/Products";
import DetailedProduct from "../Products/DetailedProduct";
const RoutePages = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/cart-items" element={<Cart />} />
      </Route>
      <Route path="/sign-up" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<DetailedProduct />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/" element={<Hero />} />
    </Routes>
  );
};

export default RoutePages;
