import React, { Fragment } from "react";
import Avatar from "@mui/material/Avatar";
import { Badge, Box, IconButton, Stack, SvgIcon, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { defaultUserIcon } from "logic/constants/global";
import { usePopover } from "logic/hooks/usePopOver";
import { alpha } from "@mui/material/styles";
import { AccountPopover } from "./AccountPopover";
import NotificationsIcon from "@mui/icons-material/Notifications";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

const DashboardTopbar = () => {
  const { user } = useSelector((state) => state.auth);
  const userAvatar = user?.avatarURL || defaultUserIcon;

  const accountPopover = usePopover();

  return (
    <Fragment>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `100%`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}></Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge badgeContent={4} color="success" variant="dot">
                  <SvgIcon fontSize="small">
                    <NotificationsIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
              }}
              srcSet={userAvatar}
              style={{ cursor: "pointer" }}
              onError={(e) => {
                e.target.src = defaultUserIcon;
              }}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </Fragment>
  );
};

export default DashboardTopbar;
