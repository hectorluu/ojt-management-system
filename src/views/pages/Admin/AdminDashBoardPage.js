import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import CampaignFeature from "views/modules/campaign/CampaignFeature";
import CampaignGrid from "views/modules/campaign/CampaignGrid";
import CampaignItem from "views/modules/campaign/CampaignItem";
import { Fragment } from "react";
import { useEffect } from "react";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { OverviewSales } from "views/components/chart/OverviewSales";

const AdminDashBoardPage = () => {
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await axiosPrivate.get("/api/campaigns");
        console.log("fetchCampaigns ~ response", response);
      } catch (error) {
        console.log("fetchCampaigns ~ error", error);
      }
    }
    fetchCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} lg={12}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This year",
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                  },
                  {
                    name: "Last year",
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Heading number={2}>Affiliated Universities </Heading>
      <CampaignFeature></CampaignFeature>
      <Gap></Gap>
      <Heading number={10}>Current Available Courses </Heading>

      <Gap></Gap>
    </Fragment>
  );
};

export default AdminDashBoardPage;
