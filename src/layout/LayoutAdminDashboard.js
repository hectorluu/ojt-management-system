import Overlay from "components/common/Overlay";
import AdminDashboardSidebar from "modules/dashboard/AdminDashboardSidebar";
import DashboardTopbar from "modules/dashboard/DashboardTopbar";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutDashboard = () => {
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

export default LayoutDashboard;
