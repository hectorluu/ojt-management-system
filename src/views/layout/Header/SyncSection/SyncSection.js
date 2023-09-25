import { useState, useRef, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  useMediaQuery,
} from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import MainCard from "views/components/cards/MainCard";
import Transitions from "views/components/extended/Transitions";

// assets
import { IconRefresh } from "@tabler/icons";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { taskProcessPath } from "logic/api/apiUrl";
import SyncBoardList from "./SyncBoardList";
import { toast } from "react-toastify";

// ==============================|| NOTIFICATION ||============================== //

export default function SyncSection() {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const syncWebhook = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.post(taskProcessPath.SYNC_WEBHOOK);
      setBoardList(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  }

  const handleToggle = () => {
    if (!open) {
      syncWebhook();
    }
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down("md")]: {
            mr: 2,
          },
        }}
      >
        <ButtonBase sx={{ borderRadius: "12px" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: "#EDE7F6",
              color: "#5E35B1",
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: "#5E35B1",
                color: "#EDE7F6",
              },
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <IconRefresh stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
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
                offset: [matchesXs ? 5 : 0, 20],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            position={matchesXs ? "top" : "top-right"}
            in={open}
            {...TransitionProps}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <PerfectScrollbar
                        style={{
                          height: "100%",
                          maxHeight: "calc(100vh - 205px)",
                          overflowX: "hidden",
                        }}
                      >
                        <SyncBoardList boardList={boardList} isLoading={isLoading} />
                      </PerfectScrollbar>
                    </Grid>
                  </Grid>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};
