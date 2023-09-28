import PropTypes from "prop-types";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography } from "@mui/material";

// project imports

// assets
import SkeletonEarningCard from "./Skeleton/SkeletonEarningCard";
import MainCard from "./MainCard";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userPath } from "logic/api/apiUrl";
import { useNavigate } from "react-router-dom";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
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
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
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

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TotalTrainerCard = ({ isLoading }) => {
  const theme = useTheme();
  const axiosProvate = useAxiosPrivate();
  const [totalTrainer, setTotalTrainer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getTotalTrainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTotalTrainer = async () => {
    try {
      const response = await axiosProvate.get(userPath.GET_TRAINER_LIST + "?PageSize=" + 100000 + "&PageIndex=" + 1);
      setTotalTrainer(response.data.totalItem);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false} onClick={() => navigate("/trainer-list")}>
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
                        backgroundColor: theme.palette.secondary[800],
                        mt: 1,
                      }}
                    >
                      <SupportAgentIcon />
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
                      {totalTrainer}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: theme.palette.secondary[100],
                  }}
                >
                  Tổng số đào tạo viên
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalTrainerCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalTrainerCard;
