import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography } from "@mui/material";

// assets
import MainCard from "./MainCard";
import SkeletonEarningCard from "./Skeleton/SkeletonEarningCard";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { userPath } from "logic/api/apiUrl";
import { toast } from "react-toastify";
import FaceIcon from "@mui/icons-material/Face";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&>div": {
    position: "relative",
    zIndex: 5,
  },
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: "50%",
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalTraineeCard = ({ isLoading }) => {
  const theme = useTheme();
  const axiosProvate = useAxiosPrivate();
  const [totalTrainee, setTotalTrainee] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getTotalTrainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTotalTrainer = async () => {
    try {
      const response = await axiosProvate.get(userPath.GET_TRAINEE_LIST + "?PageSize=" + 100000 + "&PageIndex=" + 1);
      setTotalTrainee(response.data.totalItem);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false} onClick={() => navigate("/trainee-list")}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        mt: 1,
                      }}
                    >
                      <FaceIcon />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      {totalTrainee}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: theme.palette.primary[100],
                  }}
                >
                  Tổng số thực tập sinh
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalTraineeCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalTraineeCard;
