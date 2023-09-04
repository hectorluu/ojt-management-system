// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";

import { IconDashboard } from "@tabler/icons";
import { IconKey } from "@tabler/icons";
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
} from "@tabler/icons";
import { IconBrandChrome, IconHelp } from "@tabler/icons";

//items
const iconsDaskboard = { IconDashboard };
const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/dashboard/default",
      icon: iconsDaskboard.IconDashboard,
      breadcrumbs: false,
    },
  ],
};

const iconsPages = {
  IconKey,
};
const pages = {
  id: "pages",
  title: "Pages",
  caption: "Pages Caption",
  type: "group",
  children: [
    {
      id: "authentication",
      title: "Authentication",
      type: "collapse",
      icon: iconsPages.IconKey,

      children: [
        {
          id: "login3",
          title: "Login",
          type: "item",
          url: "/pages/login/login3",
          target: true,
        },
        {
          id: "register3",
          title: "Register",
          type: "item",
          url: "/pages/register/register3",
          target: true,
        },
      ],
    },
  ],
};

const iconsUtilities = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
};

const utilities = {
  id: "utilities",
  title: "Utilities",
  type: "group",
  children: [
    {
      id: "util-typography",
      title: "Typography",
      type: "item",
      url: "/utils/util-typography",
      icon: iconsUtilities.IconTypography,
      breadcrumbs: false,
    },
    {
      id: "util-color",
      title: "Color",
      type: "item",
      url: "/utils/util-color",
      icon: iconsUtilities.IconPalette,
      breadcrumbs: false,
    },
    {
      id: "util-shadow",
      title: "Shadow",
      type: "item",
      url: "/utils/util-shadow",
      icon: iconsUtilities.IconShadow,
      breadcrumbs: false,
    },
    {
      id: "icons",
      title: "Icons",
      type: "collapse",
      icon: iconsUtilities.IconWindmill,
      children: [
        {
          id: "tabler-icons",
          title: "Tabler Icons",
          type: "item",
          url: "/icons/tabler-icons",
          breadcrumbs: false,
        },
        {
          id: "material-icons",
          title: "Material Icons",
          type: "item",
          external: true,
          target: "_blank",
          url: "https://mui.com/material-ui/material-icons/",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

const iconsOthers = { IconBrandChrome, IconHelp };
const other = {
  id: "sample-docs-roadmap",
  type: "group",
  children: [
    {
      id: "sample-page",
      title: "Sample Page",
      type: "item",
      url: "/sample-page",
      icon: iconsOthers.IconBrandChrome,
      breadcrumbs: false,
    },
    {
      id: "documentation",
      title: "Documentation",
      type: "item",
      url: "https://codedthemes.gitbook.io/berry/",
      icon: iconsOthers.IconHelp,
      external: true,
      target: true,
    },
  ],
};

const menuItems = {
  items: [dashboard, pages, utilities, other],
};

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
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

export default MenuList;
