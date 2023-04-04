import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { ContextProvider } from "../../../context/ContextAPI";

const PrivateRoute = (props) => {
  const cxtState = useContext(ContextProvider);
  return cxtState.logState ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
