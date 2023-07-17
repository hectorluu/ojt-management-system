import Overlay from "components/common/Overlay";
import ManagerDashboardSidebar from "modules/dashboard/ManagerDashboardSidebar";
import DashboardTopbar from "modules/dashboard/DashboardTopbar";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LayoutManager = () => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.permissions || [];
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !user.email && !userRole.includes("manager")) {
      navigate("/login");
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="min-h-screen p-10 bg-lite">
      <Overlay></Overlay>
      <DashboardTopbar></DashboardTopbar>
      <div className="flex items-start gap-x-10">
        <ManagerDashboardSidebar></ManagerDashboardSidebar>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default LayoutManager;
