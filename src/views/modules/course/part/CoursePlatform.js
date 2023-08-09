import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import React from "react";
import classNames from "logic/utils/classNames";

const CoursePlatform = ({ text = "Coursera", className = "text-xs" }) => {
  return (
    <span className={classNames("fflex items-baseline mb-4 font-medium gap-x-3 text-text3", className)}>
      <LayersOutlinedIcon />
      <span>
        {text}
      </span>
    </span>
  );
};

export default CoursePlatform;
