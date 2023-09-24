import Gap from "views/components/common/Gap";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { trainerTaskPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  accomplishedTaskStatusOptions,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import MainCard from "views/components/cards/MainCard";
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import SubCard from "views/components/cards/SubCard";
import { toast } from "react-toastify";
import TaskCardDisplay from "views/modules/task/TaskCardDisplay";
import TaskGrid from "views/modules/task/TaskGrid";
import TaskCardSkeleton from "views/modules/task/TaskCardSkeleton";
import { useTheme } from "@emotion/react";

const TrainerTaskCertifyPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [totalItem, setTotalItem] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [status, setStatus] = useState("");
  const [boardId, setBoardId] = useState("");
  const [boardList, setBoardList] = useState([]);
  const [isApprove, setIsApprove] = useState(false);
  const [selected, setSelected] = useState({}); // New selected state
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
      const response = await axiosPrivate.get(
        trainerTaskPath.GET_ACCOMPLISHED_TASK_LIST_BY_BOARD.replace(
          "{boardId}",
          boardId
        ) +
          "?PageIndex=" +
          page +
          "&PageSize=" +
          rowsPerPage +
          "&status=" +
          status
      );
      setTaskList(response.data.data);
      setTotalItem(response.data.totalItem);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  };

  const fetchBoardList = async () => {
    try {
      const response = await axiosPrivate.get(
        trainerTaskPath.GET_OPEN_BOARD_LIST
      );
      setBoardList(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  // Modal Delete
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (isApprove, item) => {
    setSelected(item);
    setIsApprove(isApprove);
    setIsModalOpen(true);
  };

  const handleCertify = async (item) => {
    try {
      if (isApprove) {
        await axiosPrivate.put(
          trainerTaskPath.APPROVE_TASK + item.id
        );
      } else {
        await axiosPrivate.put(
          trainerTaskPath.REJECT_TASK + item.id
        );
      }
      fetchAccomplishedTask();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const theme = useTheme();

  return (
    <MainCard title={`Duyệt công việc`}>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            borderRadius: "0.5rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 200,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <button
            className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-1 top-1 text-text1"
            onClick={handleCloseModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="text-center">
            <h2 className="font-bold text-[25px]">Xử lí công việc</h2>

            <div className="text-text1 text-base flex justify-center my-auto h-24 items-center">
              Bạn có chắc muốn {isApprove ? "chấp thuận" : "huỷ bỏ"} công việc
              &nbsp;
              <strong className="text-text1">{selected.name}</strong>
              &nbsp; ?
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "space-between",
            }}
            className="space-x-2"
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark, // Color on hover
                },
              }}
              component="label"
              className="flex items-center justify-center cursor-pointer w-1/2 h-11 text-text1 rounded-md"
              onClick={handleCloseModal}
            >
              <span className="text-white">Hủy</span>
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: isApprove
                  ? theme.palette.success.dark // Use success color when isApprove is true
                  : theme.palette.error.main, // Use error color when isApprove is false
                "&:hover": {
                  backgroundColor: isApprove
                    ? "#009e47" // Hover color for success
                    : theme.palette.error.dark, // Hover color for error
                },
              }}
              component="label"
              className="flex items-center justify-center cursor-pointer w-1/2 h-11 text-text1 rounded-md"
              onClick={() => handleCertify(selected)}
            >
              <span className="text-white">Xác nhận</span>
            </Button>
          </Box>
        </Box>
      </Modal>
      <SubCard>
        <div className="flex flex-wrap items-start gap-3">
          <div className="flex flex-wrap items-start max-w-[500px] w-full">
            <Autocomplete
              disablePortal={false}
              id="combo-box-demo"
              options={boardList}
              getOptionLabel={(option) => option.boardName}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Chọn bảng Trello" />
              )}
              onChange={(event, newValue) => {
                if (newValue) {
                  setBoardId(newValue.boardTrelloId);
                } else {
                  setBoardId("");
                }
              }}
              isOptionEqualToValue={(option, value) =>
                option.boardTrelloId === value.boardTrelloId
              }
            />
          </div>
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
          {boardId ? (
            isLoading ? ( // Render skeleton loading when loading is true
              // Use the animate-pulse class for skeleton effect
              <>
                <TaskCardSkeleton />
                <TaskCardSkeleton />
                <TaskCardSkeleton />
              </>
            ) : taskList.length !== 0 ? (
              taskList.map((item) => (
                <TaskCardDisplay
                  task={item}
                  key={item.id}
                  onClickProcess={handleOpenModal}
                />
              ))
            ) : (
              <>Không có công việc nào được tìm thấy.</>
            )
          ) : (
            <Typography variant="h3" color="text.secondary" sx={{ mb: 2 }}>
              Vui lòng chọn bảng Trello
            </Typography>
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

export default TrainerTaskCertifyPage;
