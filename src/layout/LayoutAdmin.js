import Overlay from "components/common/Overlay";
import { permissions } from "constants/permissions";
import AdminDashboardSidebar from "modules/dashboard/AdminDashboardSidebar";
import DashboardTopbar from "modules/dashboard/DashboardTopbar";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const LayoutAdmin = () => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || "";
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !user.email && !userRole === permissions.ADMIN) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="min-h-screen p-10 bg-lite">
      <Overlay></Overlay>
      <DashboardTopbar></DashboardTopbar>
      <div className="flex items-start gap-x-10">
        <AdminDashboardSidebar></AdminDashboardSidebar>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
