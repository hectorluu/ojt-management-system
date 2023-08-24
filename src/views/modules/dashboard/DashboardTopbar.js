import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { permissions } from "logic/constants/permissions";
import { useDispatch } from "react-redux";
import { authLogOut } from "logic/store/auth/auth-slice";
import { defaultUserIcon } from "logic/constants/global";

const DashboardTopbar = () => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || "";
  const userAvatar = user?.avatarURL || defaultUserIcon;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const handleMenuCloseLogout = () => {
    setAnchorEl(null);
    dispatch(authLogOut());
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center flex-1 gap-x-10"></div>
      <div className="flex items-center justify-end flex-1 gap-x-4">
        {/* User Dropdown */}
        <div style={{ position: "relative" }}>
          <Avatar
            srcSet={userAvatar}
            alt="ojt-management-system"
            onClick={handleMenuOpen}
            style={{ cursor: "pointer" }}
            onError={(e) => { e.target.src = defaultUserIcon }}
          />
        </div>

        {/* User Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          getcontentanchorel={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {userRole === permissions.TRAINEE ? (
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to="/trainee-profile"
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              User Profile
            </MenuItem>
          ) : userRole === permissions.TRAINER ? (
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to="/trainer-profile"
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              User Profile
            </MenuItem>
          ) : (
            []
          )}

          <MenuItem onClick={handleMenuClose} component={Link}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleMenuCloseLogout} component={Link}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default DashboardTopbar;
