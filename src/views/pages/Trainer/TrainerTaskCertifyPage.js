import Gap from "views/components/common/Gap";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { trainerTaskPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  accomplishedTaskStatusOptions,
} from "logic/constants/global";
import CourseCardDisplay from "views/modules/course/CourseCardDisplay";
import CourseGrid from "views/modules/course/CourseGrid";
import TablePagination from "@mui/material/TablePagination";
import CourseCardSkeleton from "views/modules/course/CourseCardSkeleton";
import MainCard from "views/components/cards/MainCard";
import {
  Autocomplete,
  TextField,
  Typography,
} from "@mui/material";
import SubCard from "views/components/cards/SubCard";
import { toast } from "react-toastify";

const TrainerTaskCertifyPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [totalItem, setTotalItem] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [status, setStatus] = useState("");
  const [boardId, setBoardId] = useState("");
  const [boardList, setBoardList] = useState([]);
  const [taskList, setTaskList] = useState([]); // New task list state

  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    fetchAccomplishedTask();
    fetchBoardList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, status, rowsPerPage, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const fetchAccomplishedTask = async () => {
    if (!boardId) return;
    setIsLoading(true);
    try {
      const response = await axiosPrivate.get(trainerTaskPath.GET_ACCOMPLISHED_TASK_LIST_BY_BOARD.replace("{boardId}", boardId) +
        "?PageIndex=" +
        page +
        "&PageSize=" +
        rowsPerPage +
        "&status=" +
        status);
      setTaskList(response.data.data);
      setTotalItem(response.data.totalItem);
      console.log(response.data)
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  };

  const fetchBoardList = async () => {
    try {
      const response = await axiosPrivate.get(trainerTaskPath.GET_OPEN_BOARD_LIST);
      setBoardList(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <MainCard
      title={`Duyệt công việc`}
    >
      <SubCard>
        <div className="flex flex-wrap items-start gap-3">
          <div className="flex flex-wrap items-start max-w-[500px] w-full">
            <Autocomplete
              disablePortal={false}
              id="combo-box-demo"
              options={boardList}
              getOptionLabel={(option) => option.boardName}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Chọn bảng Trello" />}
              onChange={(event, newValue) => {
                if (newValue) {
                  setBoardId(newValue.boardTrelloId);
                } else {
                  setBoardId("");
                }
              }}
              isOptionEqualToValue={(option, value) => option.boardTrelloId === value.boardTrelloId}
            />
          </div>
          <div className="flex flex-wrap items-start max-w-[200px] w-full">
            <Autocomplete
              disablePortal={false}
              id="combo-box-demo"
              options={accomplishedTaskStatusOptions}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Trạng thái" />}
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
        <CourseGrid type="secondary">
          {boardId ? isLoading ? ( // Render skeleton loading when loading is true
            // Use the animate-pulse class for skeleton effect
            <>
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
            </>
          ) : taskList.length !== 0 ? (
            taskList.map((item) => (
              <CourseCardSkeleton />
            ))
          ) : (
            <>Không có công việc nào được tìm thấy.</>
          ) :
            <Typography variant="h3" color="text.secondary" sx={{ mb: 2 }}>
              Vui lòng chọn bảng Trello
            </Typography>}
        </CourseGrid>
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

export default TrainerTaskCertifyPage;
