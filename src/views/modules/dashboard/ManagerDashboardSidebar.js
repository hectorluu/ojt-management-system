import React from "react";
import { NavLink } from "react-router-dom";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";

const sidebarLinks = [
  {
    icon: <SpaceDashboardOutlinedIcon />,
    title: "Manager Dashboard",
    url: "/manager-dashboard",
  },
  {
    icon: <SupervisorAccountOutlinedIcon />,
    title: "Trainer List",
    url: "/trainer-list",
  },
  {
    icon: <SupervisedUserCircleOutlinedIcon />,
    title: "Trainee List",
    url: "/trainee-list",
  },
  {
    icon: <AssignmentIndOutlinedIcon />,
    title: "Trainer Assignment",
    url: "/trainer-assignment",
  },
  {
    icon: <FormatListNumberedOutlinedIcon />,
    title: "Training Plan List",
    url: "/training-plan-list",
  },
  {
    icon: <AddTaskOutlinedIcon />,
    title: "Training Certify",
    url: "/training-plan-certify",
  },
  {
    icon: <EditCalendarOutlinedIcon />,
    title: "Attendance",
    url: "/attendance",
  },
  {
    icon: <SummarizeOutlinedIcon />,
    title: "Manager Report List",
    url: "/manager-report-list",
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
