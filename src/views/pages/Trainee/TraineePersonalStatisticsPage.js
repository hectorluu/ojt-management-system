import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { OverviewBudget } from "views/components/chart/OverviewBudget";
import { OverviewTasksProgress } from "views/components/chart/OverviewTasksProgress";
import { OverviewTotalCustomers } from "views/components/chart/OverviewTotalCustomers";
import { OverviewTotalProfit } from "views/components/chart/OverviewTotalProfit";

const TraineePersonalStatisticsPage = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: "100%" }}
              value="$24k"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: "100%" }}
              value="1.6k"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
          </Grid>
          <Grid xs={12} lg={12}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TraineePersonalStatisticsPage;
