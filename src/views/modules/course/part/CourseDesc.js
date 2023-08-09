import React from "react";
import classNames from "logic/utils/classNames";

const CourseDesc = ({ children, className = "mb-4 text-xs" }) => {
  return (
    <p className={classNames("font-normal text-text3", className)}>
      {children}
    </p>
  );
};

export default CourseDesc;
