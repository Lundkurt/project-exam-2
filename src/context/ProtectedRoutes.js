import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Login from "../components/login/Login";
import AuthContext from "./AuthProvider";

function ProtectedRoutes() {
  const [auth] = useContext(AuthContext);
  const isAuth = auth;
  return isAuth ? <Outlet /> : <Login />;
}

export default ProtectedRoutes;
