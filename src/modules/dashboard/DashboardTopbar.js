import { Button } from "components/button";
import React from "react";
import { Link } from "react-router-dom";
import DashboardFund from "./DashboardFund";
import DashboardSearch from "./DashboardSearch";

const DashboardTopbar = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center flex-1 gap-x-10">
        <Link to="/admin-dashboard" className="inline-block">
          <img srcSet="/logo.png 2x" alt="ojt-management-system" />
        </Link>
        {/* <div className=" max-w-[600px] w-full">
          <DashboardSearch></DashboardSearch>
        </div> */}
      </div>
      <div className="flex items-center justify-end flex-1 gap-x-10">
        {/* <DashboardFund></DashboardFund>
        <Button
          className="px-7"
          type="button"
          href="/start-campaign"
          kind="secondary"
        >
          Start a campaign
        </Button> */}
        <img
          srcSet="/logo.png 2x"
          alt="ojt-management-system"
          className="object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default DashboardTopbar;
