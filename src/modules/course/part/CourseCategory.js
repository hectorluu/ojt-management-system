import React from "react";
import classNames from "utils/classNames";
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';

const CourseCategory = ({ text = "BE", className = "text-xs", link }) => {
  return (
    <span className={classNames("fflex items-baseline mb-4 font-medium gap-x-3 text-text3", className)}>
      <LayersOutlinedIcon />
      <span>
        {text}
      </span>
    </span>
  );
};

export default CourseCategory;
