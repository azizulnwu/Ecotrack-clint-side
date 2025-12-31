import React, { Children } from "react";
import { useAuth } from "../Hook/useAuth";
import { useLocation } from "react-router";

const PrivateRoute = ({ Children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (user) return Children;
  return <Navigate to="/login" state={location.pathname} replace="true" />;
};

export default PrivateRoute;
