import * as React from "react";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CourseImage from "./part/CourseImage";
import CourseCategory from "./part/CourseCategory";
import CourseName from "./part/CourseName";
import CourseDesc from "./part/CourseDesc";
import CoursePlatform from "./part/CoursePlatform";
import { useNavigate } from "react-router-dom";
import { defaultCourseImage } from "logic/constants/global";

export default function TraineeCourseCardDisplay(course) {
  const coursePosition = (course) => {
    let text = course.course.coursePositions[0]?.positionName;
    for (let i = 1; i < course.course.coursePositions.length; i++) {
      text = text + "," + course.course.coursePositions[i]?.positionName;
    }
    return text;
  };

  const navigate = useNavigate();

  return (
    <Card
      sx={{ display: "flex" }}
      className="rounded-2xl hover:shadow-xl transition duration-500 ease-in-out"
    >
      <CardActionArea
        sx={{ display: "flex" }}
        size="small"
        onClick={() => {
          navigate("/trainee-course-detail/" + course.course.id);
        }}
      >
        <div className="flex items-center gap-x-[5px] w-full">
          <CourseImage
            className="h-[266px] flex-1"
            image={course.course.imageURL || defaultCourseImage}
          ></CourseImage>
          <div className="flex-auto max-w-[600px]">
            <CourseCategory
              text={coursePosition(course)}
              className="text-sm"
            ></CourseCategory>
            <CourseName className="mb-4 text-xl font-bold">
              {course.course.name}
            </CourseName>
            <CourseDesc className="mb-6 text-sm">
              {course.course.description}
            </CourseDesc>
            <div className="w-4/4 rounded-full bg-primary h-[5px] mb-6"></div>
            <CoursePlatform
              text={course.course.platformName}
              className="text-sm"
            ></CoursePlatform>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
}
