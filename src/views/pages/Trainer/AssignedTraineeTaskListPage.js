import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import {
  Card,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { traineeTaskPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  traineeTaskStatus,
  signalRMessage,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
import useOnChange from "logic/hooks/useOnChange";
import Chip from "views/components/chip/Chip";
import MainCard from "views/components/cards/MainCard";
import SearchIcon from "@mui/icons-material/Search";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SubCard from "views/components/cards/SubCard";
import { toast } from "react-toastify";
import signalRService from "logic/utils/signalRService";

const AssignedTraineeTaskListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        traineeTaskPath.GET_TASK_LIST +
          "?PageSize=" +
          rowsPerPage +
          "&PageIndex=" +
          page
      );
      setTasks(response.data.data);
      setTotalItem(response.data.totalItem);
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    signalRService.on(signalRMessage.TASK.UPDATE_FINISH, (message) => {
      fetchTasks();
    });
    signalRService.on(signalRMessage.TASK.UPDATE_PROCESS, (message) => {
      fetchTasks();
    });

    return () => {
      signalRService.off(signalRMessage.TASK.UPDATE_FINISH);
      signalRService.off(signalRMessage.TASK.UPDATE_PROCESS);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <MainCard title="Công việc của thực tập sinh">
      <SubCard>
        {/*Custom search bar*/}
        <Card className="w-2/5">
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Tìm kiếm ..."
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ maxWidth: 550 }}
            onChange={setSearchTerm}
          />
        </Card>

        <TableContainer sx={{ width: 1, mt: 2, mb: -2, borderRadius: 4 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" width={"40%"}>
                  Tên công việc
                </StyledTableCell>
                <StyledTableCell align="left" width={"20%"}>
                  Ngày giao việc
                </StyledTableCell>
                <StyledTableCell align="center" width={"20%"}>
                  Hạn hoàn thành
                </StyledTableCell>
                <StyledTableCell align="center" width={"20%"}>
                  Trạng thái
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>
                  <TableRow>
                    <TableCell width={"40%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"40%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"40%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                </>
              ) : tasks.length !== 0 ? (
                tasks.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="left" width={"40%"}>
                      {item.name}
                    </TableCell>
                    <TableCell align="left" width={"20%"}>
                      {moment(item.startTime).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="center" width={"20%"}>
                      {moment(item.endTime).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="center" width={"20%"}>
                      <Chip
                        color={
                          item.status === 3
                            ? "yellow"
                            : item.status === 2
                            ? "error"
                            : "success"
                        }
                      >
                        {
                          traineeTaskStatus.find(
                            (label) => label.value === item.status
                          ).label
                        }
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Không có công việc nào được tìm thấy.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
        </TableContainer>
      </SubCard>
    </MainCard>
  );
};

export default AssignedTraineeTaskListPage;
