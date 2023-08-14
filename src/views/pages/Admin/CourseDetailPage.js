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
import classNames from "logic/utils/classNames";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import CourseMeta from "views/modules/course/part/CourseMeta";
import LinkIcon from "@mui/icons-material/Link";
import { Button } from "views/components/button";

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
            <div className="flex-1 mt-5">
              <span
                className={classNames(
                  "flex items-middle mb-4 font-medium gap-x-2 text-text3"
                )}
              >
                <FolderOpenOutlinedIcon className="mt-1" />
                {course.courseSkills?.map((skill, index) => (
                  <span className="mt-1" key={index}>
                    {skill.skillName}
                    {index !== course.courseSkills.length - 1 ? ", " : ""}
                  </span>
                ))}
              </span>
              <CourseName className="mb-4 text-xl font-bold">
                {course.name}
              </CourseName>
              <CourseDesc className="mb-4 text-sm">
                {course.description}
              </CourseDesc>
              <span
                className={classNames(
                  "flex items-middle mb-4 font-medium gap-x-2 text-text3"
                )}
              >
                <LinkIcon /> : &nbsp;
                <span>{course.link}</span>
              </span>
              <div className="w-full rounded-full bg-[#EFEFEF] h-[5px] mb-4">
                <div className="w-4/4 h-full rounded-full bg-primary"></div>
              </div>
              <CoursePlatform
                text={course.platformName}
                className="text-sm mb-2"
              ></CoursePlatform>
              <div className="w-96 flex items-start justify-between mt-2 mb-8 gap-x-3">
                <CourseMeta
                  amount={course.totalEnrollment}
                  text={"Tổng số lượt đăng ký"}
                  size="text-sm"
                ></CourseMeta>
                <CourseMeta
                  amount={course.totalActiveEnrollment}
                  text={"Số lượt đang học"}
                  size="text-sm"
                ></CourseMeta>
              </div>
            </div>
          </div>
        </CardActionArea>
      </Card>
      <div className="flex items-center gap-x-6 mt-10">
        <Button className="w-fit px-10 mx-auto text-white bg-secondary">
          Chỉnh sửa khóa học này
        </Button>
      </div>
      <Gap></Gap>
    </Fragment>
  );
};

export default CourseDetailPage;
