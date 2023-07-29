import { coursePath } from "api/apiUrl";
import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { defaultPageSize, defaultPageIndex } from "constants/global";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CourseImage from "modules/course/part/CourseImage";
import CourseName from "modules/course/part/CourseName";
import CourseDesc from "modules/course/part/CourseDesc";
import CoursePlatform from "modules/course/part/CoursePlatform";

const CourseDetailPage = () => {
  const courseId = useParams();

  const [page] = React.useState(defaultPageIndex);
  const [rowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    async function fetchCourseDetail() {
      try {
        const response = await axiosPrivate.get(
          coursePath.GET_COURSE +
            courseId +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage
        );
        setCourse(response.data.data);
        console.log(response.data.data);
      } catch (error) {}
    }
    fetchCourseDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Heading>Course Id: {courseId}</Heading>
      <Card sx={{ display: "flex" }}>
        <CardActionArea sx={{ display: "flex" }}>
          <div className="flex items-center gap-x-[30px] w-full">
            <CourseImage className="h-[266px] flex-1"></CourseImage>
            <div className="flex-1 ">
              <CourseName className="mb-4 text-xl font-bold">
                {course.course.name}
              </CourseName>
              <CourseDesc className="mb-6 text-sm">
                {course.course.description}
              </CourseDesc>
              <div className="w-full rounded-full bg-[#EFEFEF] h-[5px] mb-6">
                <div className="w-4/4 h-full rounded-full bg-primary"></div>
              </div>
              <CoursePlatform
                text={course.course.platformName}
                className="text-sm"
              ></CoursePlatform>
            </div>
          </div>
        </CardActionArea>
      </Card>
      <Gap></Gap>
    </Fragment>
  );
};

export default CourseDetailPage;
