// material-ui
import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";

// assets
import {
  IconBrandTelegram,
  IconBuildingStore,
  IconMailbox,
} from "@tabler/icons";

import { defaultUserIcon } from "logic/constants/global";

// styles
const ListItemWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  padding: 16,
  "&:hover": {
    background: theme.palette.primary.light,
  },
  "& .MuiListItem-root": {
    padding: 0,
  },
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

export default function NotificationList({ notiList = [], isLoading = false }) {
  const theme = useTheme();

  const chipSX = {
    height: 24,
    padding: "0 6px",
  };
  const chipErrorSX = {
    ...chipSX,
    color: theme.palette.orange,
    backgroundColor: theme.palette.orange,
    marginRight: "5px",
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light,
  };

  const chipSuccessSX = {
    ...chipSX,
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    height: 28,
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 330,
        py: 0,
        borderRadius: "10px",
        [theme.breakpoints.down("md")]: {
          maxWidth: 300,
        },
        "& .MuiListItemSecondaryAction-root": {
          top: 22,
        },
        "& .MuiDivider-root": {
          my: 0,
        },
        "& .list-container": {
          pl: 7,
        },
      }}
    >
      {isLoading ? (
        <>
          <ListItemWrapper>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              <ListItemText>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={40} />
              </ListItemText>
              <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={40} />
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Skeleton width={250} />
                <Skeleton width={250} />
                <Skeleton width={250} />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={40} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={40} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItemWrapper>
          <Divider />
          <ListItemWrapper>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              <ListItemText>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={40} />
              </ListItemText>
              <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={40} />
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Skeleton width={250} />
                <Skeleton width={250} />
                <Skeleton width={250} />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={40} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={40} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItemWrapper>
          <Divider /><ListItemWrapper>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemAvatar>
              <ListItemText>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={40} />
              </ListItemText>
              <ListItemSecondaryAction>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={40} />
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Skeleton width={250} />
                <Skeleton width={250} />
                <Skeleton width={250} />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={40} />
                  </Grid>
                  <Grid item>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={40} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItemWrapper>
        </>
      ) : notiList.length > 0 ? (
        notiList.map((item, index) => (
          <span key={index}>
            <ListItemWrapper>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <Avatar alt="John Doe" src={defaultUserIcon} />
                </ListItemAvatar>
                <ListItemText primary="John Doe" />
                <ListItemSecondaryAction>
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={12}>
                      <Typography variant="caption" display="block" gutterBottom>
                        2 min ago
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItemSecondaryAction>
              </ListItem>
              <Grid container direction="column" className="list-container">
                <Grid item xs={12} sx={{ pb: 2 }}>
                  <Typography variant="subtitle2">
                    It is a long established fact that a reader will be distracted
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item>
                      <Chip label="Unread" sx={chipErrorSX} />
                    </Grid>
                    <Grid item>
                      <Chip label="New" sx={chipWarningSX} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ListItemWrapper>
            <Divider />
          </span>
        ))) :
        <>
          <ListItemWrapper>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Typography variant="subtitle2" sx={{pl: 5}}>
                  Không có thông báo!!!
                </Typography>
              </Grid>
            </Grid>
          </ListItemWrapper>
        </>}
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="John Doe" src={defaultUserIcon} />
          </ListItemAvatar>
          <ListItemText primary="John Doe" />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">
              It is a long established fact that a reader will be distracted
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Chip label="Unread" sx={chipErrorSX} />
              </Grid>
              <Grid item>
                <Chip label="New" sx={chipWarningSX} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar
              sx={{
                color: theme.palette.success.dark,
                backgroundColor: theme.palette.success.light,
                border: "none",
                borderColor: theme.palette.success.main,
              }}
            >
              <IconBuildingStore stroke={1.5} size="1.3rem" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="subtitle1">
                Store Verification Done
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">
              We have successfully received your request.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Chip label="Unread" sx={chipErrorSX} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar
              sx={{
                color: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.light,
                border: "none",
                borderColor: theme.palette.primary.main,
              }}
            >
              <IconMailbox stroke={1.5} size="1.3rem" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="subtitle1">Check Your Mail.</Typography>
            }
          />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">
              All done! Now check your inbox as you&apos;re in for a sweet
              treat!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Button
                  variant="contained"
                  disableElevation
                  endIcon={<IconBrandTelegram stroke={1.5} size="1.3rem" />}
                >
                  Mail
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
      <Divider />
      <ListItemWrapper>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar alt="John Doe" src={defaultUserIcon} />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="subtitle1">John Doe</Typography>}
          />
          <ListItemSecondaryAction>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12}>
                <Typography variant="caption" display="block" gutterBottom>
                  2 min ago
                </Typography>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
        <Grid container direction="column" className="list-container">
          <Grid item xs={12} sx={{ pb: 2 }}>
            <Typography variant="subtitle2">
              It is a long established fact that a reader will be distracted
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Chip label="Confirmation of Account." sx={chipSuccessSX} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ListItemWrapper>
    </List>
  );
};
