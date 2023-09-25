import { Skeleton, Stack } from "@mui/material";

const AdminDashBoardSkeleton = () => {

  return (
    <Stack direction={"row"} height={"300px"} spacing={2}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="w-full">
          <Skeleton width="100%" height="100%" animation="wave" />
        </div>
      ))}
    </Stack>
  );
};

export default AdminDashBoardSkeleton;