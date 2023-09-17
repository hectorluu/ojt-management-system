import * as React from "react";
import Card from "@mui/material/Card";
import { Skeleton } from "@mui/material";

export default function CertificateSkeleton() {
  return (
    <Card
      sx={{ display: "flex" }}
      className="rounded-2xl hover:shadow-xl transition duration-500 ease-in-out"
    >
      <div className="flex items-center gap-x-[5px] w-full">
        <div className="flex-auto">
          <Skeleton variant="rectangular" height={158} />
        </div>
        <div className="flex-auto">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <div className="w-4/4 rounded-full bg-primary h-[5px] mb-6 pr-10 mr-10"></div>
          <Skeleton />
        </div>
      </div>
    </Card>
  );
}
