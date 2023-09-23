import Gap from "views/components/common/Gap";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { traineeTaskPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  accomplishedTaskStatusOptions,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import MainCard from "views/components/cards/MainCard";
import { Autocomplete, TextField } from "@mui/material";
import SubCard from "views/components/cards/SubCard";
import { toast } from "react-toastify";
import TaskGrid from "views/modules/task/TaskGrid";
import TaskCardSkeleton from "views/modules/task/TaskCardSkeleton";
import TraineeTaskCardDisplay from "views/modules/task/TraineeTaskCardDisplay";

const TraineeTaskListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [totalItem, setTotalItem] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [status, setStatus] = useState("");
  const [taskList, setTaskList] = useState([]); // New task list state
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    fetchAccomplishedTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, rowsPerPage, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const fetchAccomplishedTask = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get(
        traineeTaskPath.GET_ACCOMPLISHED_TASK_LIST +
          "?PageIndex=" +
          page +
          "&PageSize=" +
          rowsPerPage +
          "&status=" +
          status
      );
      setTaskList(response.data.data);
      setTotalItem(response.data.totalItem);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  };

  return (
    <MainCard title="Công việc">
      <SubCard>
        <div className="flex flex-wrap items-start gap-3">
          <div className="flex flex-wrap items-start max-w-[200px] w-full">
            <Autocomplete
              disablePortal={false}
              id="combo-box-demo"
              options={accomplishedTaskStatusOptions}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Trạng thái" />
              )}
              onChange={(event, newValue) => {
                if (newValue) {
                  setStatus(newValue.value);
                } else {
                  setStatus("");
                }
              }}
            />
          </div>
        </div>
        <Gap></Gap>
        <TaskGrid>
          {isLoading ? ( // Render skeleton loading when loading is true
            // Use the animate-pulse class for skeleton effect
            <>
              <TaskCardSkeleton />
              <TaskCardSkeleton />
              <TaskCardSkeleton />
            </>
          ) : taskList.length !== 0 ? (
            taskList.map((item) => (
              <TraineeTaskCardDisplay task={item} key={item.id} />
            ))
          ) : (
            <>Không có công việc nào được tìm thấy.</>
          )}
        </TaskGrid>
        <TablePagination
          labelRowsPerPage="Số dòng"
          component="div"
          count={totalItem}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`
          }
        />
      </SubCard>
    </MainCard>
  );
};

export default TraineeTaskListPage;
