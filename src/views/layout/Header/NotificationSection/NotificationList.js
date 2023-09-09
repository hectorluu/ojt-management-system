// material-ui
import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
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
  IconCertificate,
  IconCalendarEvent,
  IconBuildingCommunity,
  IconBellRinging
} from "@tabler/icons";
import { notiStyle } from "logic/constants/global";

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

  // const chipSuccessSX = {
  //   ...chipSX,
  //   color: theme.palette.success.dark,
  //   backgroundColor: theme.palette.success.light,
  //   height: 28,
  // };

  const getIcon = (type) => {
    switch (type) {
      case notiStyle.CERTIFICATE_TYPE:
        return <IconCertificate stroke={1.5} size="1.3rem" />;
      case notiStyle.TRAINING_PLAN_TYPE:
        return <IconCalendarEvent stroke={1.5} size="1.3rem" />;
      case notiStyle.BATCH_TYPE:
        return <IconBuildingCommunity stroke={1.5} size="1.3rem" />;
      default:
        return <IconBellRinging stroke={1.5} size="1.3rem" />;
    }
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
                  <Avatar>
                    {getIcon(item.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.title} />
              </ListItem>
              <Grid container direction="column" className="list-container">
                <Grid item xs={12} sx={{ pb: 2 }}>
                  <Typography variant="subtitle2">
                    {item.message}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    {item.isRead ?
                      <Grid item>
                        <Chip label="Đã đọc" sx={chipErrorSX} />
                      </Grid> :
                      <Grid item>
                        <Chip label="Mới" sx={chipWarningSX} />
                      </Grid>}
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
                <Typography variant="subtitle2" align="center">
                  Không có thông báo!!!
                </Typography>
              </Grid>
            </Grid>
          </ListItemWrapper>
        </>}
    </List>
  );
};
