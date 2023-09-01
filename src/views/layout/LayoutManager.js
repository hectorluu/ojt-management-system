import Overlay from "views/components/common/Overlay";
import ManagerDashboardSidebar from "views/modules/dashboard/ManagerDashboardSidebar";
import DashboardTopbar from "views/modules/dashboard/DashboardTopbar";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutManager = () => {
  return (
    <div className="min-h-screen p-2 bg-lite">
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
