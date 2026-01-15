import React from "react";
import useAuth from "../Hook/useAuth";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import { Navigate, useLocation } from "react-router";

const AdminPrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation()
  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (user.roll === "admin") return children;
  return <Navigate state={location.pathname} replace="true"/>
};

export default AdminPrivateRoute;
