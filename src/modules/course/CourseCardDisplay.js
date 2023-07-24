import * as React from "react";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CourseImage from "./part/CourseImage";
import CourseCategory from "./part/CourseCategory";
import CourseName from "./part/CourseName";
import CourseDesc from "./part/CourseDesc";
import CoursePlatform from "./part/CoursePlatform";

export default function CourseCardDisplay() {
  return (
      <Card sx={{ display: "flex" }}>
        <CardActionArea sx={{ display: 'flex' }}>
          <div className="flex items-center gap-x-[30px] w-full">
            <CourseImage className="h-[266px] flex-1"></CourseImage>
            <div className="flex-1 ">
              <CourseCategory text="BE" className="text-sm"></CourseCategory>
              <CourseName className="mb-4 text-xl font-bold">
                Remake - We Make architecture exhibition
              </CourseName>
              <CourseDesc className="mb-6 text-sm">
                Remake - We Make: an exhibition about architecture's social agency in
                the face of urbanisation
              </CourseDesc>
              <div className="w-full rounded-full bg-[#EFEFEF] h-[5px] mb-6">
                <div className="w-4/4 h-full rounded-full bg-primary"></div>
              </div>
              <CoursePlatform text="Coursera" className="text-sm"></CoursePlatform>
            </div>
          </div>
        </CardActionArea>
      </Card >
  );
}
