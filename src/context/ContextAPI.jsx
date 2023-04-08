import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

export const ContextProvider = React.createContext();

const ContextAPI = (props) => {
  const [logState, setLogState] = useState(false);
  const [productTypes, setProductTypes] = useState("");
  const [load, setLoad] = useState(false);
  const [productTypeRes, setProductTypeRes] = useState([]);
  const [outlet, setOutlet] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishList] = useState([]);
  const [checkout, setCheckout] = useState({});
  const [checkoutUserDetails, setCheckoutUserDetails] = useState({});
  const [orderedList, setOrderedList] = useState([]);
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState({ name: "", email: "" });

  const addToCart = useMemo(
    () => (product) => {
      const productExist = cart.find((item) => item.id === product.id);
      if (productExist) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...productExist, quantity: productExist.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    },
    [cart]
  );
  const removeFromCart = useMemo(
    () => (product) => {
      const mealExist = cart.find((item) => item.id === product.id);
      if (mealExist.quantity === 1) {
        setCart(cart.filter((item) => item.id !== product.id));
      } else {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...mealExist, quantity: mealExist.quantity - 1 }
              : item
          )
        );
      }
    },
    [cart]
  );
  const addToCheckout = useMemo(
    () => (product) => {
      setCheckout({ ...product });
    },
    []
  );
  const addToWishlist = useMemo(
    () => (product) => {
      const productExist = wishlist.find((item) => item.id === product.id);
      if (productExist) {
        setWishList(
          wishlist.map((item) =>
            item.id === product.id
              ? { ...productExist, quantity: productExist.quantity + 1 }
              : item
          )
        );
      } else {
        setWishList([...wishlist, { ...product, quantity: 1 }]);
      }
    },
    [wishlist]
  );
  const removeFromWishlist = useMemo(
    () => (product) => {
      const mealExist = wishlist.find((item) => item.id === product.id);
      if (mealExist.quantity === 1) {
        setWishList(wishlist.filter((item) => item.id !== product.id));
      } else {
        setWishList(
          wishlist.map((item) =>
            item.id === product.id
              ? { ...mealExist, quantity: mealExist.quantity - 1 }
              : item
          )
        );
      }
    },
    [wishlist]
  );
  const addToOrders = useMemo(
    () => (product) => {
      const findOrderedItem = orderedList.find(
        (item) => item.id === product.id
      );
      if (findOrderedItem) {
        setOrderedList(
          orderedList.map((item) =>
            item.id === product.id ? { ...findOrderedItem } : item
          )
        );
      } else {
        setOrderedList([...orderedList, { ...product }]);
      }
    },
    [orderedList]
  );
  useEffect(() => {
    let timer;
    const fetchProduct = async () => {
      if (productTypes === "All") {
        try {
          const productResponse = await axios.get(
            `https://dummyjson.com/products?limit=100`
          );
          timer = setTimeout(() => {
            setProductTypeRes(productResponse.data.products);
            setLoad(false);
          }, 1000);
        } catch (error) {
          console.log(error);
          setError(true);
        }
      } else {
        try {
          const productResponse = await axios.get(
            `https://dummyjson.com/products/category/${productTypes}`
          );
          console.log(
            `cxt data by category-${productTypes}`,
            productResponse.data.products
          );
          timer = setTimeout(() => {
            setProductTypeRes(productResponse.data.products);
            setLoad(false);
          }, 1000);
        } catch (error) {
          console.log(error);
          setError(true);
        }
      }
    };
    fetchProduct();
    return () => clearTimeout(timer);
  }, [load, productTypes]);

  const cxtStateValues = useMemo(() => {
    return {
      logState,
      setLogState,
      productTypes,
      setProductTypes,
      productTypeRes,
      setProductTypeRes,
      outlet,
      setOutlet,
      load,
      setLoad,
      cart,
      setCart,
      addToCart,
      removeFromCart,
      wishlist,
      setWishList,
      checkout,
      setCheckout,
      addToCheckout,
      addToWishlist,
      removeFromWishlist,
      checkoutUserDetails,
      setCheckoutUserDetails,
      orderedList,
      setOrderedList,
      addToOrders,
      userName,
      setUserName,
    };
  }, [
    logState,
    productTypeRes,
    productTypes,
    outlet,
    cart,
    load,
    wishlist,
    addToCart,
    removeFromCart,
    checkout,
    addToCheckout,
    addToWishlist,
    removeFromWishlist,
    checkoutUserDetails,
    orderedList,
    addToOrders,
    userName,
  ]);

  return (
    <ContextProvider.Provider value={cxtStateValues}>
      {props.children}
    </ContextProvider.Provider>
  );
};

export default ContextAPI;
