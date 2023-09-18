import PropTypes from "prop-types";
import GroupsIcon from "@mui/icons-material/Groups";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { defaultUniversityImage } from "logic/constants/global";
import { fDate } from "logic/utils/formatTime";

export const CourseCard = (props) => {
  const { course } = props;
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minWidth: "23.5rem",
        borderStyle: "solid",
        borderWidth: "2px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar
            src={course.imgURL || defaultUniversityImage}
            onError={(e) => {
              e.target.src = defaultUniversityImage;
            }}
            sx={{
              cursor: "pointer",
            }}
            variant="square"
            className="w-fit h-[200px] border-4 border-white pointer-events-none"
          />
        </Box>
        <Typography align="center" gutterBottom variant="h5">
          {course.name}
        </Typography>
        <Typography align="center" variant="body1">
          {course.address}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <AccessTimeIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            Ngày liên kết: {fDate(course.joinDate)}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <GroupsIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {course.ojtTrainees} OJTs
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

CourseCard.propTypes = {
  university: PropTypes.object.isRequired,
};
