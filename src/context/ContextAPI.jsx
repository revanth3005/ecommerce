import axios from "axios";
import React, { useEffect, useState } from "react";

export const ContextProvider = React.createContext();

const ContextAPI = (props) => {
  const [logState, setLogState] = useState(false);
  const [productTypes, setProductTypes] = useState("products");
  const [productTypeRes, setProductTypeRes] = useState([]);

  useEffect(() => {
    let timer;
    const fetchProduct = async () => {
      const productResponse = await axios.get(
        `https://dummyjson.com/products/category/${productTypes}`
      );
      console.log(
        `cxt data by category-${productTypes}`,
        productResponse.data.products
      );
      timer =setTimeout(()=>{
        setProductTypeRes(productResponse.data.products);
      },1000)
    };
    fetchProduct();
    return ()=>clearTimeout(timer)
  }, [productTypes]);
  console.log(productTypes);

  const cxtValues = {
    logState,
    setLogState,
    productTypes,
    setProductTypes,
    productTypeRes,
    setProductTypeRes,
  };
  return (
    <ContextProvider.Provider value={cxtValues}>
      {props.children}
    </ContextProvider.Provider>
  );
};

export default ContextAPI;
