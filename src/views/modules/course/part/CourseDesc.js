import React from "react";
import classNames from "logic/utils/classNames";

const headingStyle = {
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%', // Optionally set a maximum width
};

const CourseDesc = ({ children, className = "mb-4 text-xs" }) => {
  return (
    <p className={classNames("font-normal text-text3", className)} style={headingStyle}>
      {children}
    </p>
  );
};

export default CourseDesc;
