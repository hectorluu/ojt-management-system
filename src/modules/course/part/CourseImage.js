import { defaultCourseImage } from "constants/global";
import React from "react";

const CourseImage = ({ className = "h-[158px]", image = defaultCourseImage }) => {
  return (
    <div className={className}>
      <img
        src={image}
        alt=""
        className="object-contain w-full h-full rounded-2xl"
      />
    </div>
  );
};

export default CourseImage;
