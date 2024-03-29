// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";

import { IconDashboard } from "@tabler/icons";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DvrIcon from "@mui/icons-material/Dvr";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

//items
const iconsDaskboard = { IconDashboard };
const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "trainee-dashboard",
      title: "Dashboard",
      type: "item",
      url: "/trainee-dashboard",
      icon: iconsDaskboard.IconDashboard,
      breadcrumbs: false,
    },
  ],
};

const iconsPages = {
  AssignmentIcon,
  CalendarMonthIcon,
  DvrIcon,
  AnalyticsIcon,
  WorkspacePremiumIcon
};

const pages = {
  id: "pages",
  title: "Trang",
  type: "group",
  children: [
    {
      id: "trainee-task-list",
      title: "Công việc",
      type: "item",
      url: "/trainee-task-list",
      icon: iconsPages.AssignmentIcon,
      breadcrumbs: false,
    },
    {
      id: "trainee-training-plan",
      title: "Kế hoạch đào tạo",
      type: "item",
      url: "/trainee-training-plan",
      icon: iconsPages.CalendarMonthIcon,
      breadcrumbs: false,
    },
    {
      id: "course",
      title: "Khoá Học",
      type: "collapse",
      icon: iconsPages.DvrIcon,
      children: [
        {
          id: "trainee-course-list",
          title: "Khóa học",
          type: "item",
          url: "/trainee-course-list",
          icon: iconsPages.DvrIcon,
          breadcrumbs: false,
        },
        {
          id: "trainee-certificacte_list",
          title: "Chứng chỉ",
          type: "item",
          url: "/trainee-certificate",
          icon: iconsPages.WorkspacePremiumIcon,
          breadcrumbs: false,
        },
      ],
    }
  ],
};

const menuItems = {
  items: [dashboard, pages],
};

// ==============================|| SIDEBAR MENU LIST ||============================== //

const TraineeMenuList = () => {
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

export default TraineeMenuList;
