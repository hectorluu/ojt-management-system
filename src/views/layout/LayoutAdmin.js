import Overlay from "views/components/common/Overlay";
import AdminDashboardSidebar from "views/modules/dashboard/AdminDashboardSidebar";
import DashboardTopbar from "views/modules/dashboard/DashboardTopbar";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div className="min-h-screen p-2 bg-lite">
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
