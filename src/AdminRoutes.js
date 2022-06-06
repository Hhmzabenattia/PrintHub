import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


function AdminRoutes({ children }) {
    let token = window.localStorage.getItem("userInfo");
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    console.log(userInfo)



    return  userInfo.user.role==="admin" ? children : <Navigate to ="/admin/login"/>;
   
}

export default AdminRoutes;
