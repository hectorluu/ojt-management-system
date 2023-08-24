import Overlay from "views/components/common/Overlay";
import TrainerDashboardSidebar from "views/modules/dashboard/TrainerDashboardSidebar";
import DashboardTopbar from "views/modules/dashboard/DashboardTopbar";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutTrainer = () => {
  return (
    <div className="min-h-screen p-10 bg-lite">
      <Overlay></Overlay>
      <DashboardTopbar></DashboardTopbar>
      <div className="flex items-start gap-x-10">
        <TrainerDashboardSidebar></TrainerDashboardSidebar>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default LayoutTrainer;
