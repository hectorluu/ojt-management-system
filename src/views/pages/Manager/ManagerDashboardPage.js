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
      </Grid>
    </Fragment>
  );
};

export default ManagerDashboardPage;
