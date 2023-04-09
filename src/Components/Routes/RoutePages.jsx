import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "../Body/Hero/Hero";
import Register from "../Body/Register/Register";
import Login from "../Body/Login/Login";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import Cart from "../Cart/Cart";
import Products from "../Products/Products";
import DetailProduct from "../Products/DetailProduct";
import CheckoutForm from "../Checkout/CheckoutForm";
import Contact from "../Help/Contact";
import Order from "../Order/Order";
import Wishlist from "../wishlist/Wishlist";
import Pay from "../pay/Pay";
const RoutePages = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/payment" element={<Pay />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout-Form" element={<CheckoutForm />} />
      </Route>

      <Route path="products/:id" element={<DetailProduct />} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Hero />} />
      <Route path="/cart-items" element={<Cart />} />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default RoutePages;
