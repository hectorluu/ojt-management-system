import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { userPath } from "logic/api/apiUrl";
import { defaultPageSize, defaultPageIndex } from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "views/components/button";
import ModalTraineeDetailManager from "views/components/modal/ModalTraineeDetailManager";
import MainCard from "views/components/cards/MainCard";

const TraineeListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosPrivate.get(
          userPath.GET_TRAINEE_LIST +
          "?PageIndex=" +
          page +
          "&PageSize=" +
          rowsPerPage
        );

        setUsers(response.data.data);
        setTotalItem(response.data.totalItem);
        // setPage(response.data.pageIndex);
        // console.log("fetchUsers ~ response", response);
      } catch (error) {
        console.log("fetchUsers ~ error", error);
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

  const [isTraineeDetailModalOpen, setIsTraineeDetailModalOpen] =
    useState(false);

  return (
    <MainCard title="Thực tập sinh">
      <ModalTraineeDetailManager
        isOpen={isTraineeDetailModalOpen}
        onRequestClose={() => setIsTraineeDetailModalOpen(false)}
      ></ModalTraineeDetailManager>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell width="25%">Email</TableCell>
              <TableCell align="center">Vai trò</TableCell>
              <TableCell align="right" width={"10%"}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="w-20">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="logo.png"
                    alt=""
                  />
                </TableCell>
                <TableCell>{item.firstName + " " + item.lastName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell align="center">{item.positionName}</TableCell>
                <TableCell align="right" width={"10%"}>
                  <Button
                    className=""
                    type="button"
                    kind="ghost"
                    onClick={() => setIsTraineeDetailModalOpen(true)}
                  >
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

export default TraineeListPage;
