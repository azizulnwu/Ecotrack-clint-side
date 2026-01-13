import React, { Children } from "react";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import useAuth from "../Hook/useAuth";


const PrivateRoute = ({ Children }) => {
  const { user, loading } = useAuth();
  // const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (user) return Children;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
// state={location.pathname} replace="true" 