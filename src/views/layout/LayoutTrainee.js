import Overlay from "views/components/common/Overlay";
import TraineeDashboardSidebar from "views/modules/dashboard/TraineeDashboardSidebar";
import DashboardTopbar from "views/modules/dashboard/DashboardTopbar";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutTrainee = () => {
  return (
    <div className="min-h-screen p-2 bg-lite">
      <Overlay></Overlay>
      <DashboardTopbar></DashboardTopbar>
      <div className="flex items-start gap-x-10">
        <TraineeDashboardSidebar></TraineeDashboardSidebar>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default LayoutTrainee;
