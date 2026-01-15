import React, { Children } from "react";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import useAuth from "../Hook/useAuth";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (!user) 
  return (<Navigate to="/login" state={location.pathname} replace="true"/>)
  return children;
};

export default PrivateRoute;
// state={location.pathname} replace="true" 