import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import {
  Button,
  Skeleton,
  // Card,
  // InputAdornment,
  // OutlinedInput,
  // SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";

import { defaultPageSize, defaultPageIndex, defaultUserIcon } from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import StyledTableCell from "views/modules/table/StyledTableCell";
// import SearchIcon from "@mui/icons-material/Search";
// import useOnChange from "logic/hooks/useOnChange";
import { trainerPath } from "logic/api/apiUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AssignedTraineeListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(
          trainerPath.GET_TRAINEE_LIST +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage
        );

        setUsers(response.data.data);
        setTotalItem(response.data.totalItem);
        setIsLoading(false); // Set loading to false after fetching data
      } catch (error) {
        toast.error(error.response.data);
        setIsLoading(false); // Set loading to false after fetching data
      }
    }
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const [isTraineeDetailModalOpen, setIsTraineeDetailModalOpen] =
  //   useState(false);

  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <MainCard
      title={`Thực tập sinh`}
    >
      {/* <ModalTraineeDetailManager
        isOpen={isTraineeDetailModalOpen}
        onRequestClose={() => setIsTraineeDetailModalOpen(false)}
      ></ModalTraineeDetailManager> */}

      <SubCard>
        <TableContainer sx={{ width: 1, mb: -2, borderRadius: 4 }}>
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
                <StyledTableCell align="left" width={"32%"}>
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
                        src={item.avatarURL || defaultUserIcon}
                        alt=""
                        onError={(e) => {
                          e.target.src = defaultUserIcon;
                        }}
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
                        className="flex items-center justify-center cursor-pointer w-3/4 h-8 text-text1 rounded-md"
                        onClick={() => {
                          navigate("/trainee/" + item.id);
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

export default AssignedTraineeListPage;
