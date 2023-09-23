import * as React from "react";
import Card from "@mui/material/Card";
import { CardActions, CardContent, CardHeader, Skeleton } from "@mui/material";

export default function TaskCardSkeleton() {
  return (
    <Card
      className="rounded-2xl border-0 py-3 pb-1 hover:shadow-xl transition duration-500 ease-in-out border-solid border-2 border-slate-200"
      sx={{ maxWidth: 345, height: "fit-content" }}>
      <CardHeader
        // titleTypographyProps={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        avatar={<Skeleton variant="circular" width={40} height={40} animation="wave" />}
        title={<Skeleton animation="wave" />}
        subheader={<Skeleton animation="wave" />}
      />
      <CardContent>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </CardContent>
      <CardActions disableSpacing>
        <Skeleton variant="circular" width={30} height={30} animation="wave" />
        <Skeleton variant="circular" width={30} height={30} animation="wave" />
        <Skeleton variant="circular" width={30} height={30} animation="wave" />
      </CardActions>
    </Card>
  );
}
