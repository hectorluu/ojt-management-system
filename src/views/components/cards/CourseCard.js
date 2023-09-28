import PropTypes from "prop-types";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { defaultCourseImage } from "logic/constants/global";
import { useNavigate } from "react-router-dom";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

export const CourseCard = (props) => {
  const { course } = props;
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minWidth: "15rem",
        borderStyle: "solid",
        borderWidth: "2px",
      }}
      className="hover:shadow-xl transition duration-300 ease-in-out border-slate-500"
      onClick={() => {
        navigate("/course-list/" + course.id);
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
            px: -5,
          }}
        >
          <Avatar
            src={course?.imageURL || defaultCourseImage}
            onError={(e) => {
              e.target.src = defaultCourseImage;
            }}
            sx={{
              cursor: "pointer",
              mx: -2,
            }}
            variant="square"
            className="w-fit h-[10rem] border-4 border-white pointer-events-none"
          />
        </Box>
        <Typography
          align="left"
          gutterBottom
          variant="h5"
          sx={{ mt: -2, display: "flex", alignItems: "center", overflow: "hidden" }}
          className="truncate"
        >
          <FolderOpenIcon className="mr-2" />{" "}
          {course.courseSkills.map((skill, index) => (
            <span key={skill.skillId} style={{ marginRight: "0.5rem" }}>
              {skill.skillName}
              {index < course.courseSkills.length - 1 ? ", " : " "}
            </span>
          ))}
        </Typography>
        <Typography align="left" gutterBottom variant="h5" className="line-clamp-2">
          <span className="font-bold text-xl">{course.name}</span>
        </Typography>
        <Typography align="left" variant="body1" className="mb-2 overflow-ellipsis overflow-hidden line-clamp-5">
          {course.description}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          className="mb-4"
        >
          {/* totalActiveEnrollment */}
          <div className="text-left">
            <span className="font-bold text-xl">
              {course.totalActiveEnrollment}
            </span>{" "}
            <br />
            <span className="text-left">
              Số học viên đang học
            </span>
          </div>

          {/* totalEnrollment */}
          <div className="text-left">
            <span className="font-bold text-xl">
              {course.totalEnrollment}
            </span>{" "}
            <br />
            <span className="text-left">
              Tổng số lượt học
            </span>
          </div>
        </Box>
        <Typography align="left" variant="body1" className="line-clamp-1">
          Nền tảng:{" "}
          <span className="font-extrabold">{course.platformName}</span>
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
    </Card>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};
