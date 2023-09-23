import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { taskPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  traineeTaskStatus,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
import useOnChange from "logic/hooks/useOnChange";
import Chip from "views/components/chip/Chip";
import MainCard from "views/components/cards/MainCard";
import SearchIcon from "@mui/icons-material/Search";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SubCard from "views/components/cards/SubCard";
import CustomTabPanel from "views/components/tabpanel/CustomTabPanel";

const TraineeTaskListPage = () => {
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
        taskPath.GET_TASK_LIST +
          "?PageSize=" +
          rowsPerPage +
          "&PageIndex=" +
          page
      );
      setTasks(response.data.data);
      setTotalItem(response.data.totalItem);
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.log("fetchTasks ~ error", error);
      setIsLoading(false); // Set loading to false after fetching data
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

  // Create tab
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard title="Công việc">
      <Box sx={{ width: "100%", mt: -2 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Đang thực hiện" {...a11yProps(0)} />
            <Tab label="Đã hoàn thành" {...a11yProps(1)} />
            <Tab label="Quá hạn" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {/*Inprogress task*/}
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
                    <StyledTableCell align="left" width={"30%"}>
                      Tên công việc
                    </StyledTableCell>
                    <StyledTableCell align="center" width={"20%"}>
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
                        <TableCell width={"30%"} animation="wave">
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
                        <TableCell width={"10%"} animation="wave">
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width={"30%"} animation="wave">
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
                        <TableCell width={"10%"} animation="wave">
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width={"30%"} animation="wave">
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
                        <TableCell width={"10%"} animation="wave">
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    </>
                  ) : tasks.length !== 0 ? (
                    tasks.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell align="left" width={"30%"}>
                          {item.name}
                        </TableCell>
                        <TableCell align="center" width={"20%"}>
                          {moment(item.startTime).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell align="center" width={"20%"}>
                          {moment(item.endTime).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell align="center" width={"20%"}>
                          <Chip
                            color={
                              item.status === 3
                                ? "warning"
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SubCard></SubCard>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <SubCard></SubCard>
        </CustomTabPanel>
      </Box>
    </MainCard>
  );
};

export default TraineeTaskListPage;
