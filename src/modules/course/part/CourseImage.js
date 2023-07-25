import defaultImage from "../../../default_image/default_course.jpg";
import React from "react";

const CourseImage = ({ className = "h-[158px]", image = defaultImage }) => {
  return (
    <div className={className}>
      <img
        src={image}
        alt=""
        className="object-cover w-full h-full rounded-2xl"
      />
    </div>
  );
};

export default CourseImage;
