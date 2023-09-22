import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import {
  Button,
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

import { defaultPageSize, defaultPageIndex } from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import StyledTableCell from "views/modules/table/StyledTableCell";
// import SearchIcon from "@mui/icons-material/Search";
// import useOnChange from "logic/hooks/useOnChange";
import { trainerPath } from "logic/api/apiUrl";
import { useNavigate } from "react-router-dom";

const AssignedTraineeListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosPrivate.get(
          trainerPath.GET_TRAINEE_LIST +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage
        );

        setUsers(response.data.data);
        setTotalItem(response.data.totalItem);
      } catch (error) {
        console.log("fetchUsers ~ error", error);
      }
    }
    fetchUsers();

    async function fetchTotalUsers() {
      try {
        const response = await axiosPrivate.get(
          trainerPath.GET_TRAINEE_LIST + "?PageSize=" + 1000000
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
    <MainCard title={`Thực tập sinh (${totalUsers.length})`}>
      {/* <ModalTraineeDetailManager
        isOpen={isTraineeDetailModalOpen}
        onRequestClose={() => setIsTraineeDetailModalOpen(false)}
      ></ModalTraineeDetailManager> */}

      <SubCard>
        <TableContainer sx={{ width: 1, mt: 2, mb: -2, borderRadius: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Họ và tên</StyledTableCell>
                <StyledTableCell width="25%">Email</StyledTableCell>
                <StyledTableCell align="center">Vai trò</StyledTableCell>
                <StyledTableCell align="right" width={"10%"}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length !== 0 ? (
                users.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-20">
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src="logo.png"
                        alt=""
                      />
                    </TableCell>
                    <TableCell>
                      {item.firstName + " " + item.lastName}
                    </TableCell>
                    <TableCell>{item.email}</TableCell>
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
