// material-ui
import { useTheme, styled } from "@mui/material/styles";
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";

// assets
import {
  IconChecks
} from "@tabler/icons";

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

export default function SyncBoardList({ boardList = [], isLoading = false }) {
  const theme = useTheme();

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
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Skeleton width={250} />
                <Skeleton width={250} />
                <Skeleton width={250} />
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
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Skeleton width={250} />
                <Skeleton width={250} />
                <Skeleton width={250} />
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
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Skeleton width={250} />
                <Skeleton width={250} />
                <Skeleton width={250} />
              </Grid>
            </Grid>
          </ListItemWrapper>
        </>
      ) : boardList.length > 0 ? (
        boardList.map((board, index) => (
          <span key={index}>
            <ListItemWrapper>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <Avatar>
                    <IconChecks />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={board.boardName} />
              </ListItem>
              <Grid container direction="column" className="list-container">
                <Grid item xs={12} sx={{ pb: 2 }}>
                  <Typography variant="subtitle2">
                    {board.boardURL}
                  </Typography>
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
                <Typography variant="subtitle2">
                  Không có bảng nào cần đồng bộ
                </Typography>
              </Grid>
            </Grid>
          </ListItemWrapper>
        </>
      }
    </List>
  );
};
