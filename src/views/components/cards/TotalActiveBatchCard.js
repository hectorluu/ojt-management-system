import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import Groups3Icon from '@mui/icons-material/Groups3';

// assets
import MainCard from "./MainCard";
import SkeletonEarningCard from "./Skeleton/SkeletonEarningCard";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { ojtBatchPath } from "logic/api/apiUrl";
import { toast } from "react-toastify";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalActiveBatchCard = ({ isLoading }) => {
  const theme = useTheme();
  const axiosProvate = useAxiosPrivate();
  const [totalBatch, setTotalBatch] = useState(0);

  useEffect(() => {
    getTotalBatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTotalBatch = async () => {
    try {
      const response = await axiosProvate.get(ojtBatchPath.GET_ACTIVE_BATCH + "?PageSize=" + 100000 + "&PageIndex=" + 1);
      setTotalBatch(response.data.totalItem);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
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
                        backgroundColor: theme.palette.warning.light,
                        color: theme.palette.warning.dark,
                        mt: 1,
                      }}
                    >
                      <Groups3Icon />
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
                      {totalBatch}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: theme.palette.grey[500],
                  }}
                >
                  Tổng số khoá thực tập
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper >
      )}
    </>
  );
};

TotalActiveBatchCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalActiveBatchCard;
