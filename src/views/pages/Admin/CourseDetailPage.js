import { coursePath } from "logic/api/apiUrl";
import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CourseImage from "views/modules/course/part/CourseImage";
import CourseName from "views/modules/course/part/CourseName";
import CourseDesc from "views/modules/course/part/CourseDesc";
import CoursePlatform from "views/modules/course/part/CoursePlatform";

const CourseDetailPage = () => {
  const { courseId } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    async function fetchCourseDetail() {
      try {
        const response = await axiosPrivate.get(
          coursePath.GET_COURSE + courseId
        );
        setCourse(response.data);
      } catch (error) {}
    }
    fetchCourseDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Heading>Chi tiết khóa học {courseId}</Heading>
      <Card sx={{ display: "flex" }}>
        <CardActionArea sx={{ display: "flex" }}>
          <div className="flex items-center gap-x-[30px] w-full">
            <CourseImage className="h-[266px] flex-1"></CourseImage>
            <div className="flex-1 ">
              <CourseName className="mb-4 text-xl font-bold">
                {course.name}
              </CourseName>
              <CourseDesc className="mb-6 text-sm">
                {course.description}
              </CourseDesc>
              <div className="w-full rounded-full bg-[#EFEFEF] h-[5px] mb-6">
                <div className="w-4/4 h-full rounded-full bg-primary"></div>
              </div>
              <CoursePlatform
                text={course.platformName}
                className="text-sm"
              ></CoursePlatform>
            </div>
          </div>
        </CardActionArea>
      </Card>
      <div className="flex items-start gap-x-6 mt-10">
        <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-secondary bg-opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h1 className="text-[22px] font-semibold mb-2">Create Your Cert</h1>
          <p className="mb-2 text-sm text-text3">Jump right into this</p>
          <a href="/" className="text-sm text-primary">
            Jump right into this
          </a>
        </div>
      </div>
      <Gap></Gap>
    </Fragment>
  );
};

export default CourseDetailPage;
