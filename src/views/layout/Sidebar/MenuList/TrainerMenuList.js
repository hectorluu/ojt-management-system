// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";

import { IconDashboard } from "@tabler/icons";
import FaceIcon from "@mui/icons-material/Face";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import ApprovalIcon from "@mui/icons-material/Approval";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GradingIcon from "@mui/icons-material/Grading";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SendIcon from "@mui/icons-material/Send";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

//items
const iconsDaskboard = { IconDashboard };
const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "trainer-dashboard",
      title: "Dashboard",
      type: "item",
      url: "/trainer-dashboard",
      icon: iconsDaskboard.IconDashboard,
      breadcrumbs: false,
    },
  ],
};

const iconsPages = {
  FaceIcon,
  AssignmentIcon,
  PeopleIcon,
  ApprovalIcon,
  CalendarMonthIcon,
  GradingIcon,
  AnalyticsIcon,
  SendIcon,
  AssignmentTurnedInIcon,
};

const pages = {
  id: "pages",
  title: "Quản lý",
  type: "group",
  children: [
    {
      id: "icons",
      title: "Đào tạo viên",
      type: "collapse",
      icon: iconsPages.FaceIcon,
      children: [
        {
          id: "assigned-trainee-list",
          title: "Danh sách",
          type: "item",
          url: "/assigned-trainee-list",
          icon: iconsPages.PeopleIcon,
          breadcrumbs: false,
        },
        {
          id: "assigned-trainee-task-list",
          title: "Công việc",
          type: "item",
          url: "/assigned-trainee-task-list",
          icon: iconsPages.AssignmentIcon,
          breadcrumbs: false,
        },
        {
          id: "certificate-certify",
          title: "Duyệt chứng chỉ",
          type: "item",
          url: "/certificate-certify",
          icon: iconsPages.ApprovalIcon,
          breadcrumbs: false,
        },
        {
          id: "assign-training-plan",
          title: "Phân kế hoạch",
          type: "item",
          url: "/assign-training-plan",
          icon: iconsPages.SendIcon,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "trainer-training-plan",
      title: "Kế hoạch đào tạo",
      type: "item",
      url: "/trainer-training-plan",
      icon: iconsPages.CalendarMonthIcon,
      breadcrumbs: false,
    },
    {
      id: "task-certify",
      title: "Duyệt công việc",
      type: "item",
      url: "/task-certify",
      icon: iconsPages.AssignmentTurnedInIcon,
      breadcrumbs: false,
    },
    {
      id: "ojt-evaluation",
      title: "Đánh giá OJT",
      type: "item",
      url: "/ojt-evaluation",
      icon: iconsPages.GradingIcon,
      breadcrumbs: false,
    },
    {
      id: "ojt-statistics",
      title: "Thống kê",
      type: "item",
      url: "/ojt-statistics",
      icon: iconsPages.AnalyticsIcon,
      breadcrumbs: false,
    },
  ],
};

const menuItems = {
  items: [dashboard, pages],
};

// ==============================|| SIDEBAR MENU LIST ||============================== //

const TrainerMenuList = () => {
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

export default TrainerMenuList;
