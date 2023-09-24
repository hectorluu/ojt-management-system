import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
// @mui
import { Box, Card, CardHeader } from "@mui/material";
// utils
import useChart from "./useChart";
import { fNumber } from "logic/utils/formatNumber";
// components

// ----------------------------------------------------------------------

HorizontalLineChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function HorizontalLineChart({
  title,
  subheader,
  chartData,
  ...other
}) {
  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => `${fNumber(seriesName)} thực tập sinh`,
        title: {
          formatter: () => "",
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: "28%", borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
