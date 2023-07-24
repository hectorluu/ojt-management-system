import { IconDashboard, IconFolder, IconLogout } from "components/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authLogOut } from "store/auth/auth-slice";
const sidebarLinks = [
  {
    icon: <IconDashboard></IconDashboard>,
    title: "Manager Dashboard",
    url: "/manager-dashboard",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "Attendance",
    url: "/attendance",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "Manager Report List",
    url: "/manager-report-list",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "Trainee List",
    url: "/trainee-list",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "Trainer List",
    url: "/trainer-list",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "Trainer Assignment",
    url: "/trainer-assignment",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "Training Plan List",
    url: "/training-plan-list",
  },
  {
    icon: <IconFolder></IconFolder>,
    title: "Training Certify",
    url: "/training-plan-certify",
  },
  {
    icon: <IconLogout></IconLogout>,
    title: "Logout",
    url: "/logout",
  },
];
const DashboardSidebar = () => {
  const navlinkClass =
    "flex items-center gap-x-5 md:w-12 md:h-12 md:justify-center md:rounded-lg md:mb-8  last:mt-auto last:bg-white last:shadow-sdprimary";
  const dispatch = useDispatch();
  return (
    <div className="w-full md:w-[76px] rounded-3xl bg-white drop-shadow-2xl shadow-[10px_10px_20px_rgba(218,_213,_213,_0.15)] px-[14px] py-10 flex flex-col flex-shrink-0">
      {sidebarLinks.map((link) => {
        if (link.url === "/logout") {
          return (
            <button
              onClick={() => dispatch(authLogOut())}
              className={navlinkClass}
              key={link.title}
            >
              <span>{link.icon}</span>
              <span className="md:hidden">{link.title}</span>
            </button>
          );
        }
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
