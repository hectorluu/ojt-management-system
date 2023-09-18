// @mui
import PropTypes from "prop-types";
import { Card, Typography, CardHeader, CardContent } from "@mui/material";
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from "@mui/lab";
// utils
import { fDate } from "logic/utils/formatTime";
// ----------------------------------------------------------------------

TrainingPlanTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function TrainingPlanTimeline({
  title,
  subheader,
  list,
  ...other
}) {
  if (!list || !Array.isArray(list)) {
    // Handle the case where 'list' is not provided or not an array
    return null; // Or you can return some default content or error message
  }

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: -3, mt: 2 }} />

      <CardContent
        sx={{
          "& .MuiTimelineItem-missingOppositeContent:before": {
            display: "none",
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <OrderItem
              key={index}
              item={item}
              isLast={index === list.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    startDay: PropTypes.instanceOf(Date),
    endDay: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};

function OrderItem({ item, isLast }) {
  const { title, description, startDay, endDay } = item;
  return (
    <TimelineItem className="mb-4">
      <TimelineSeparator>
        <TimelineDot
          color={"primary" || "success" || "info" || "warning" || "error"}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">
          <span className="font-bold">{title}</span>
        </Typography>

        <Typography variant="caption" sx={{ color: "text.primary" }}>
          {description}
        </Typography>
        <br />
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {fDate(startDay)} - {fDate(endDay)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
