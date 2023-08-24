import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequiredAuthPage = ({ allowRole = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || "";
  const location = useLocation();

  return userRole === allowRole ? (
    <Outlet></Outlet>
  ) : user && user.id ? (
    <Navigate to="/unauthorize" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuthPage;
