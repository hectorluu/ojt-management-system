import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequiredAuthPage = ({ allowRole = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.permissions || [];
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return userRole?.find((p) => allowRole?.includes(p)) ? (
    <Outlet>{console.log("allowRole", allowRole)}</Outlet>
  ) : user && user.id ? (
    (console.log("userRole", userRole),
    console.log("allowRole", allowRole),
    (<Navigate to="/unauthorize" state={{ from: location }} replace />))
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuthPage;
