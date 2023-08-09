import { IconDashboard, IconFolder } from "views/components/icons";
import React from "react";
import { NavLink } from "react-router-dom";

const sidebarLinks = [
  {
    icon: <IconDashboard></IconDashboard>,
    title: "Trainer Dashboard",
    url: "/trainer-dashboard",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "Assigned Trainee List",
    url: "/assigned-trainee-list",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "Certificate Certify",
    url: "/certificate-certify",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "Manage Training Plan",
    url: "/manage-training-plan",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "OJT Evaluation",
    url: "/ojt-evaluation",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "OJT Statistics",
    url: "/ojt-statistics",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "Trainer Report List",
    url: "/trainer-report-list",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "Trainer Training Plan",
    url: "/trainer-training-plan",
  },
];
const DashboardSidebar = () => {
  const navlinkClass =
    "flex items-center gap-x-5 md:w-12 md:h-12 md:justify-center md:rounded-lg md:mb-8  last:mt-auto last:bg-white last:shadow-sdprimary";
  return (
    <div className="w-full md:w-[76px] rounded-3xl bg-white drop-shadow-2xl shadow-[10px_10px_20px_rgba(218,_213,_213,_0.15)] px-[14px] py-10 flex flex-col flex-shrink-0">
      {sidebarLinks.map((link) => {
        return (
          <NavLink
            to={link.url}
            key={link.title}
            className={({ isActive }) =>
              isActive
                ? `${navlinkClass} text-primary bg-primary bg-opacity-20`
                : `${navlinkClass} text-icon-color`
            }
          >
            <span>{link.icon}</span>
            <span className="md:hidden">{link.title}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default DashboardSidebar;
