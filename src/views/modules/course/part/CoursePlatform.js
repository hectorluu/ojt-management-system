import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import React from "react";
import classNames from "logic/utils/classNames";

const headingStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const CoursePlatform = ({ text = "Coursera", className = "text-xs" }) => {
  return (
    <span
      className={classNames(
        "fflex items-baseline mb-4 font-medium gap-x-3 text-text3",
        className
      )}
      style={headingStyle}
    >
      <LayersOutlinedIcon className="mr-2" />
      <span>{text}</span>
    </span>
  );
};

export default CoursePlatform;
