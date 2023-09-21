import React from "react";

const TaskGrid = ({ children }) => {
  return <div className="grid grid-cols-3 gap-4">{children}</div>;
};

export default TaskGrid;
