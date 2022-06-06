import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRouter({ children }) {
  let token = window.localStorage.getItem("userInfo");
  return token ? children : <Navigate to ="/login"/>;
   
}

export default PrivateRouter;
