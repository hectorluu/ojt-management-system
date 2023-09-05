// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";

import { IconDashboard } from "@tabler/icons";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import FaceIcon from "@mui/icons-material/Face";
import SummarizeIcon from "@mui/icons-material/Summarize";
import DescriptionIcon from "@mui/icons-material/Description";
import CalculateIcon from "@mui/icons-material/Calculate";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import ApprovalIcon from "@mui/icons-material/Approval";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
//items
const iconsDaskboard = { IconDashboard };
const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "manager-dashboard",
      title: "Dashboard",
      type: "item",
      url: "/manager-dashboard",
      icon: iconsDaskboard.IconDashboard,
      breadcrumbs: false,
    },
  ],
};

const iconsPages = {
  PersonIcon,
  AssignmentIndIcon,
  SupportAgentIcon,
  FaceIcon,
  SummarizeIcon,
  DescriptionIcon,
  CalculateIcon,
  CalendarMonthIcon,
  EditCalendarIcon,
  ApprovalIcon,
  PermContactCalendarIcon,
  StickyNote2Icon,
};

const pages = {
  id: "pages",
  title: "Quản lý",
  type: "group",
  children: [
    {
      id: "accounts",
      title: "Tài khoản",
      type: "collapse",
      icon: iconsPages.PersonIcon,
      children: [
        {
          id: "trainer-list",
          title: "Đào tạo viên",
          type: "item",
          url: "/trainer-list",
          icon: iconsPages.SupportAgentIcon,
          breadcrumbs: false,
        },
        {
          id: "trainee-list",
          title: "Thực tập sinh",
          type: "item",
          url: "/trainee-list",
          icon: iconsPages.FaceIcon,
          breadcrumbs: false,
        },
        {
          id: "trainer-assignment",
          title: "Phân công đào tạo",
          type: "item",
          url: "/trainer-assignment",
          icon: iconsPages.AssignmentIndIcon,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "accounts",
      title: "Báo cáo",
      type: "collapse",
      icon: iconsPages.StickyNote2Icon,
      children: [
        {
          id: "manager-report-list",
          title: "Danh sách báo cáo",
          type: "item",
          url: "/manager-report-list",
          icon: iconsPages.SummarizeIcon,
          breadcrumbs: false,
        },
        {
          id: "list-template",
          title: "Mẫu báo cáo",
          type: "item",
          url: "/list-template",
          icon: iconsPages.DescriptionIcon,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "trainingplan",
      title: "Kế hoạch đào tạo",
      type: "collapse",
      icon: iconsPages.CalendarMonthIcon,
      children: [
        {
          id: "training-plan-list",
          title: "Danh sách",
          type: "item",
          url: "/training-plan-list",
          icon: iconsPages.EditCalendarIcon,
          breadcrumbs: false,
        },
        {
          id: "training-plan-certify",
          title: "Phê duyệt",
          type: "item",
          url: "/training-plan-certify",
          icon: iconsPages.ApprovalIcon,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "attendance",
      title: "Điểm danh",
      type: "item",
      url: "/attendance",
      icon: iconsPages.PermContactCalendarIcon,
      breadcrumbs: false,
    },
    {
      id: "list-formula",
      title: "Công thức tính điểm",
      type: "item",
      url: "/list-formula",
      icon: iconsPages.CalculateIcon,
      breadcrumbs: false,
    },
  ],
};

const menuItems = {
  items: [dashboard, pages],
};

// ==============================|| SIDEBAR MENU LIST ||============================== //

const ManagerMenuList = () => {
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

export default ManagerMenuList;
