// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";

import { IconDashboard } from "@tabler/icons";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DvrIcon from "@mui/icons-material/Dvr";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import PasswordIcon from '@mui/icons-material/Password';

//items
const iconsDaskboard = { IconDashboard };
const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "admin-dashboard",
      title: "Dashboard",
      type: "item",
      url: "/admin-dashboard",
      icon: iconsDaskboard.IconDashboard,
      breadcrumbs: false,
    },
  ],
};

const iconsPages = {
  ManageAccountsIcon,
  DvrIcon,
  SensorOccupiedIcon,
  KeyboardIcon,
  SettingsIcon,
  SchoolIcon,
  PasswordIcon,
};

const pages = {
  id: "pages",
  title: "Quản lý",
  type: "group",
  children: [
    {
      id: "default",
      title: "Tài khoản",
      type: "item",
      url: "/account-list",
      icon: iconsPages.ManageAccountsIcon,
      breadcrumbs: false,
    },
    {
      id: "course-list",
      title: "Khóa học",
      type: "item",
      url: "/course-list",
      icon: iconsPages.DvrIcon,
      breadcrumbs: false,
    },
    {
      id: "skill-list",
      title: "Kỹ năng",
      type: "item",
      url: "/skill-list",
      icon: iconsPages.SensorOccupiedIcon,
      breadcrumbs: false,
    },
    {
      id: "position-list",
      title: "Vị trí",
      type: "item",
      url: "/position-list",
      icon: iconsPages.KeyboardIcon,
      breadcrumbs: false,
    },
    {
      id: "university-list",
      title: "Trường đại học",
      type: "item",
      url: "/university-list",
      icon: iconsPages.SchoolIcon,
      breadcrumbs: false,
    },
    {
      id: "change-password",
      title: "Đổi mật khẩu",
      type: "item",
      url: "/change-password",
      icon: iconsPages.PasswordIcon,
      breadcrumbs: false,
    },
    {
      id: "config",
      title: "Cài đặt",
      type: "item",
      url: "/config",
      icon: iconsPages.SettingsIcon,
      breadcrumbs: false,
    },
  ],
};

const menuItems = {
  items: [dashboard, pages],
};

// ==============================|| SIDEBAR MENU LIST ||============================== //

const AdminMenuList = () => {
  const navItems = menuItems.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default AdminMenuList;
