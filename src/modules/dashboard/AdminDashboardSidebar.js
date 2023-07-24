import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authLogOut } from "store/auth/auth-slice";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
const sidebarLinks = [
  {
    icon: <SpaceDashboardOutlinedIcon/>,
    title: "Admin Dashboard",
    url: "/admin-dashboard",
  },
  {
    icon: <AccountCircleOutlinedIcon/>,
    title: "Account List",
    url: "/account-list",
  },
  {
    icon: <SchoolOutlinedIcon/>,
    title: "Course List",
    url: "/course-list",
  },
  {
    icon: <CodeOutlinedIcon/>,
    title: "Skill List",
    url: "/skill-list",
  },
  {
    icon: <ApartmentOutlinedIcon/>,
    title: "University List",
    url: "/university-list",
  },
  {
    icon: <LogoutOutlinedIcon/>,
    title: "Logout",
    url: "/logout",
  },
];
const DashboardSidebar = () => {
  const navlinkClass =
    "flex items-center gap-x-5 md:w-12 md:h-12 md:justify-center md:rounded-lg md:mb-8  last:mt-auto last:bg-white last:shadow-sdprimary";
  const dispatch = useDispatch();
  return (
    <div className="w-full md:w-[76px] rounded-3xl bg-white shadow-[10px_10px_20px_rgba(218,_213,_213,_0.15)] px-[14px] py-10 flex flex-col flex-shrink-0">
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
