import { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";

// project imports
import MainCard from "views/components/cards/MainCard";
import Transitions from "views/components/extended/Transitions";

// assets
import { IconLogout, IconSettings, IconUser } from "@tabler/icons";

import { defaultUserIcon, roleExchange } from "logic/constants/global";
import { authLogOut } from "logic/store/auth/auth-slice";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(authLogOut());
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || "";
  const userAvatar = user?.avatarURL || defaultUserIcon;

  const handleClickProfileTrainer = () => {
    setOpen(false);
    navigate("/trainer-profile");
  };

  const handleClickProfileTrainee = () => {
    setOpen(false);
    navigate("/trainee-profile");
  };

  const handleClickProfileManager = () => {
    setOpen(false);
    navigate("/manager-profile");
  };

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: "#E3F2FD",
          backgroundColor: "#E3F2FD",
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: "#2196F3",
            background: `${"#2196F3"}!important`,
            color: "#E3F2FD",
            "& svg": {
              stroke: "#E3F2FD",
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={userAvatar}
            onError={(e) => {
              e.target.src = defaultUserIcon;
            }}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ px: 2, pt: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography
                          component="span"
                          variant="h3"
                          sx={{ fontWeight: 600, pb: 1 }}
                        >
                          {user.firstName + " " + user.lastName}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle1">{user.email}</Typography>
                    </Stack>
                  </Box>

                  <Box sx={{ px: 2, pt: 1 }}>
                    <Divider />
                    <List
                      component="nav"
                      sx={{
                        width: "100%",
                        maxWidth: 350,
                        minWidth: 170,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "10px",
                        [theme.breakpoints.down("md")]: {
                          minWidth: "100%",
                        },
                        "& .MuiListItemButton-root": {
                          mt: 0.5,
                        },
                      }}
                    >
                      {userRole === roleExchange.TRAINER && (
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          onClick={handleClickProfileTrainer}
                        >
                          <ListItemIcon>
                            <IconUser stroke={2} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="body2">
                                    Hồ sơ cá nhân
                                  </Typography>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                      )}
                      {userRole === roleExchange.TRAINEE && (
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          onClick={handleClickProfileTrainee}
                        >
                          <ListItemIcon>
                            <IconUser stroke={2} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="body2">
                                    Hồ sơ cá nhân
                                  </Typography>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                      )}
                      {userRole === roleExchange.MANAGER && (
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                          }}
                          onClick={handleClickProfileManager}
                        >
                          <ListItemIcon>
                            <IconUser stroke={2} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="body2">
                                    Hồ sơ cá nhân
                                  </Typography>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                      )}
                      <ListItemButton
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                        }}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <IconLogout stroke={2} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">Đăng xuất</Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
