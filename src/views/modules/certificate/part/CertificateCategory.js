import React from "react";
import classNames from "logic/utils/classNames";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

const headingStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const CertificateCategory = ({ text = "BE", className = "text-xs", link }) => {
  return (
    <span
      className={classNames(
        "flex items-middle mb-4 font-medium gap-x-3 text-text3",
        className
      )}
      style={headingStyle}
    >
      <FolderOpenOutlinedIcon />
      <span className="mt-1">{text}</span>
    </span>
  );
};

export default CertificateCategory;
