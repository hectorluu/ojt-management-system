import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import CampaignFeature from "views/modules/campaign/CampaignFeature";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { OverviewUniversities } from "views/components/chart/OverviewUniversities";
import TotalGrowthBarChart from "views/components/chart/TotalGrowthBarChart";

const AdminDashBoardPage = () => {
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <CampaignFeature></CampaignFeature>
      <Gap></Gap>
      <Heading number={10}>Current Available Courses </Heading>

      <Gap></Gap>
    </Fragment>
  );
};

export default AdminDashBoardPage;
