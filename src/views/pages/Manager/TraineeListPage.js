import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import {
  Button,
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
  useTheme,
} from "@mui/material";
import { userPath } from "logic/api/apiUrl";
import { defaultPageSize, defaultPageIndex } from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import ModalTraineeDetailManager from "views/components/modal/ModalTraineeDetailManager";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SearchIcon from "@mui/icons-material/Search";
import useOnChange from "logic/hooks/useOnChange";

const TraineeListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(
          userPath.GET_TRAINEE_LIST +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage +
            "&keyword=" +
            `${searchTerm === null ? "" : searchTerm}`
        );

        setUsers(response.data.data);
        setTotalItem(response.data.totalItem);
        setIsLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.log("fetchUsers ~ error", error);
        setIsLoading(false); // Set loading to false after fetching data
      }
    }
    fetchUsers();

    async function fetchTotalUsers() {
      try {
        const response = await axiosPrivate.get(
          userPath.GET_TRAINEE_LIST + "?PageSize=" + 1000000
        );

        setTotalUsers(response.data.data);
        // setPage(response.data.pageIndex);
        // console.log("fetchUsers ~ response", response);
      } catch (error) {
        console.log("Error", error);
      }
    }
    fetchTotalUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [isTraineeDetailModalOpen, setIsTraineeDetailModalOpen] =
    useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const theme = useTheme();

  return (
    <MainCard title={`Thực tập sinh (${totalUsers.length})`}>
      <ModalTraineeDetailManager
        isOpen={isTraineeDetailModalOpen}
        onRequestClose={() => setIsTraineeDetailModalOpen(false)}
        traineeSelected={selectedItem}
      ></ModalTraineeDetailManager>

      <SubCard>
        <div className="flex flex-wrap items-start gap-3">
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
        </div>

        <TableContainer sx={{ width: 1, mt: 2, mb: -2, borderRadius: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  width={"8%"}
                  className="min-w-fit"
                >
                  {" "}
                </StyledTableCell>
                <StyledTableCell align="left" width={"34%"}>
                  Họ và tên
                </StyledTableCell>
                <StyledTableCell align="left" width="30%">
                  Email
                </StyledTableCell>
                <StyledTableCell align="center" width={"15%"}>
                  Vai trò
                </StyledTableCell>
                <StyledTableCell align="right" width={"15%"}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>
                  <TableRow>
                    <TableCell width={"6%"}>
                      <Skeleton
                        variant="circular"
                        width={40}
                        height={40}
                        animation="wave"
                      />
                    </TableCell>
                    <TableCell width={"39%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"6%"}>
                      <Skeleton
                        variant="circular"
                        width={40}
                        height={40}
                        animation="wave"
                      />
                    </TableCell>
                    <TableCell width={"39%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"6%"}>
                      <Skeleton
                        variant="circular"
                        width={40}
                        height={40}
                        animation="wave"
                      />
                    </TableCell>
                    <TableCell width={"39%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                </>
              ) : users.length !== 0 ? (
                users.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-20">
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src="logo.png"
                        alt=""
                      />
                    </TableCell>
                    <TableCell align="left">
                      {item.firstName + " " + item.lastName}
                    </TableCell>
                    <TableCell align="left">{item.email}</TableCell>
                    <TableCell align="center">{item.positionName}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark, // Color on hover
                          },
                        }}
                        component="label"
                        className="flex items-center justify-center cursor-pointer w-full h-8 text-text1 rounded-md"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsTraineeDetailModalOpen(true);
                        }}
                      >
                        <span className="text-white">Chi tiết</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Không có thực tập sinh nào được tìm thấy.
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

export default TraineeListPage;
