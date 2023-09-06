import Gap from "views/components/common/Gap";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { taskPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  traineeTaskStatus,
} from "logic/constants/global";
import { Button } from "views/components/button";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
import useOnChange from "logic/hooks/useOnChange";
import Chip from "views/components/chip/Chip";
import MainCard from "views/components/cards/MainCard";
import SearchIcon from "@mui/icons-material/Search";

const TraineeTaskListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);

  const fetchTasks = async () => {
    try {
      const response = await axiosPrivate.get(
        taskPath.GET_TASK_LIST +
          "?PageSize=" +
          rowsPerPage +
          "&PageIndex=" +
          page
      );
      setTasks(response.data.data);
      setTotalItem(response.data.totalItem);
    } catch (error) {
      console.log("fetchTasks ~ error", error);
    }
  };

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
    <MainCard title="Công việc">
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
      <Gap></Gap>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left" width={"30%"}>
                Tên công việc
              </TableCell>
              <TableCell align="left" width={"20%"}>
                Ngày giao việc
              </TableCell>
              <TableCell align="center" width={"20%"}>
                Hạn hoàn thành
              </TableCell>
              <TableCell align="center" width={"20%"}>
                Trạng thái
              </TableCell>
              <TableCell align="right" width={"10%"}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="left" width={"30%"}>
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
                <TableCell align="right" width={"10%"}>
                  <Button className="" type="button" kind="ghost">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
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
    </MainCard>
  );
};

export default TraineeTaskListPage;
