import { useCallback } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authLogOut } from "logic/store/auth/auth-slice";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || "";

  const handleSignOut = useCallback(() => {
    onClose?.();
    dispatch(authLogOut());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, user]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography className="pb-2">
          <span className="font-semibold">
            {user.firstName + " " + user.lastName}
          </span>
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

export default AccountPopover;
