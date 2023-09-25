import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import {
  Unstable_Grid2 as Grid,
} from "@mui/material";
import ChartSkeleton from "views/modules/ChartSkeleton";
import ColumnAndLineChart from "views/components/chart/ColumnAndLineChart";
import { chartPath } from "logic/api/apiUrl";
import TotalTrainerCard from "views/components/cards/TotalTrainerCard";
import TotalTraineeCard from "views/components/cards/TotalTraineeCard";
import TotalActiveBatchCard from "views/components/cards/TotalActiveBatchCard";

const ManagerDashboardPage = () => {
  const axiosPrivate = useAxiosPrivate();
  // eslint-disable-next-line no-unused-vars
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Fetch chart
    fetchBatchAndTrainee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentYear]);

  const [batchAndTrainee, setBatchAndTrainee] = useState([
    {
      name: "Thực tập sinh",
      type: "column",
      fill: "solid",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Đợt OJT",
      type: "line",
      fill: "solid",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);
  const tempChartBatchAndTraineeLabels = [
    "01/01/2003",
    "01/02/2003",
    "01/03/2003",
    "01/04/2003",
    "01/05/2003",
    "01/06/2003",
    "01/07/2003",
    "01/08/2003",
    "01/09/2003",
    "01/10/2003",
    "01/11/2003",
    "01/12/2003",
  ];

  // Replace the year part in each label with the currentYear using string manipulation
  const chartBatchAndTraineeLabels = tempChartBatchAndTraineeLabels.map(
    (label) => {
      // Assuming the date format is always "DD/MM/YYYY"
      const yearIndex = label.lastIndexOf("/") + 1; // Find the index of the last '/'
      return label.substring(0, yearIndex) + currentYear;
    }
  );

  const fetchBatchAndTrainee = async () => {
    try {
      setIsLoading(true);
      // First get data of current year
      const response = await axiosPrivate.get(
        chartPath.GET_BATCH_AND_TRAINEE + currentYear
      );
      // Get 5 courses

      // turn it into the format that chart can read
      setBatchAndTrainee([
        {
          name: "Thực tập sinh",
          type: "column",
          fill: "solid",
          data: response.data.numberofTrainees,
        },
        {
          name: "Đợt OJT",
          type: "line",
          fill: "solid",
          data: response.data.numberOfOjtBatches,
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };


  return (
    <Fragment>
      <Grid container spacing={2}>
        {/* Card Part */}
        <Grid lg={4} md={6} sm={6} xs={12}>
          <TotalTrainerCard isLoading={isLoading} />
        </Grid>
        <Grid lg={4} md={6} sm={6} xs={12}>
          <TotalTraineeCard isLoading={isLoading} />
        </Grid>
        <Grid lg={4} md={12} sm={12} xs={12}>
          <TotalActiveBatchCard isLoading={isLoading} />
        </Grid>

        {/* ... Chart Part */}
        <Grid xs={12} md={12}>
          {isLoading ? <ChartSkeleton /> :
            <ColumnAndLineChart
              title="Tổng đợt OJT và thực tập sinh theo tháng"
              chartLabels={chartBatchAndTraineeLabels}
              chartData={batchAndTrainee}
            />
          }
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ManagerDashboardPage;
