import Overlay from "components/common/Overlay";
import TrainerDashboardSidebar from "modules/dashboard/TrainerDashboardSidebar";
import DashboardTopbar from "modules/dashboard/DashboardTopbar";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { permissions } from "constants/permissions";

const LayoutTrainer = () => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.permissions || [];
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !user.email && !userRole.includes(permissions.TRAINER)) {
      navigate("/login");
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
