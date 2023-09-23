import React from "react";
import classNames from "logic/utils/classNames";

const headingStyle = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const CertificateName = ({ children, className = "mb-1 font-semibold" }) => {
  return <h3 className={classNames("text-text1", className)} style={headingStyle}>{children}</h3>;
};

export default CertificateName;