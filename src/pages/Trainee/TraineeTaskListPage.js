import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { taskPath } from "api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  traineeTaskStatus,
} from "constants/global";
import { Button } from "components/button";
import TablePagination from "@mui/material/TablePagination";
import SearchBar from "modules/SearchBar";
import moment from "moment";
import useOnChange from "hooks/useOnChange";

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
    <Fragment>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-[2.25rem] font-bold pt-6">Công việc</Heading>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between	">
        <div className=" max-w-[600px] w-full">
          <SearchBar onChangeSearch={setSearchTerm}></SearchBar>
        </div>
      </div>
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
                  {
                    traineeTaskStatus.find(
                      (label) => label.value === item.status
                    ).label
                  }
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
          component="div"
          count={totalItem}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Fragment>
  );
};

export default TraineeTaskListPage;
