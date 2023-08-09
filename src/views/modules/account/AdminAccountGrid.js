import React from "react";

const AdminAccountGrid = ({ children, type = "default" }) => {
  if (type !== "default")
    return <div className="grid grid-cols-1 gap-y-10">{children}</div>;
  return <div className="grid grid-cols-3 gap-x-7">{children}</div>;
};

export default AdminAccountGrid;
