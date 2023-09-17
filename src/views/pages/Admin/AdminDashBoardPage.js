import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import CampaignFeature from "views/modules/campaign/CampaignFeature";
import { Fragment } from "react";
import { useEffect } from "react";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { OverviewUniversities } from "views/components/chart/OverviewUniversities";

const AdminDashBoardPage = () => {
  const axiosPrivate = useAxiosPrivate();

  return (
    <Fragment>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} lg={12}>
              <OverviewUniversities sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <CampaignFeature></CampaignFeature>
      <Gap></Gap>
      <Heading number={10}>Current Available Courses </Heading>

      <Gap></Gap>
    </Fragment>
  );
};

export default AdminDashBoardPage;
