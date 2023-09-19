import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import {
  Button,
  CardActions,
  Unstable_Grid2 as Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EarningCard from "views/components/cards/EarningCard";
import TotalOrderLineChartCard from "views/components/cards/TotalOrderLineChartCard";
import TotalIncomeDarkCard from "views/components/cards/TotalIncomeDarkCard";
import TotalIncomeLightCard from "views/components/cards/TotalIncomeLightCard";
import TotalGrowthBarChart from "views/components/chart/TotalGrowthBarChart";

const ManagerDashboardPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      <Grid container spacing={2}>
        {/* Card Part */}
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <EarningCard isLoading={isLoading} />
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <TotalOrderLineChartCard isLoading={isLoading} />
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalIncomeDarkCard isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={12} mt={2}>
            <TotalIncomeLightCard isLoading={isLoading} />
          </Grid>
        </Grid>

        {/* Chart Part */}
        <Grid item xs={12} md={12}>
          <TotalGrowthBarChart isLoading={isLoading} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ManagerDashboardPage;
