import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { UserObj } from "../store/loginSlice";

function ProtectLoginRoute() {
  const user: UserObj = JSON.parse(localStorage.getItem("user") || "{}");

  if(Object.keys(user).length !== 0){
    console.log(user)
    return <Navigate to={'/home'} replace />
  }
  return <Outlet />;
}

export default ProtectLoginRoute;
