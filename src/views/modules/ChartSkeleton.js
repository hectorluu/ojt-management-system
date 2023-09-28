import React from "react";
import Skeleton from "@mui/material/Skeleton";

const ChartSkeleton = () => {
  return (
    <div>
      {/* Chart Title Skeleton */}
      <Skeleton variant="text" height={20} width="60%" />

      {/* Chart Body Skeleton */}
      <Skeleton variant="rectangular" height={200} width="100%" />
    </div>
  );
};

export default ChartSkeleton;
