import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { userPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  accountStatus,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "views/components/button";
import ModalTrainerDetailManager from "views/components/modal/ModalTrainerDetailManager";

const TrainerListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [isTrainerDetailModalOpen, setIsTrainerDetailModalOpen] = useState(false);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosPrivate.get(
          userPath.GET_TRAINER_LIST +
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-green-500";
      default:
        return "bg-gray-500"; // You can set a default color class if needed
    }
  };

  return (
    <Fragment>
      <ModalTrainerDetailManager
        isOpen={isTrainerDetailModalOpen}
        onRequestClose={() => setIsTrainerDetailModalOpen(false)}
      ></ModalTrainerDetailManager>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">Đào tạo viên</Heading>
        </div>
      </div>
      <Gap></Gap>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell width="20%">Email</TableCell>
              <TableCell align="center">Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
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
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell align="center">
                  {item.positionName}
                </TableCell>
                <TableCell
                  align="center"
                  className="flex items-center justify-center"
                >
                  {/* <div
                    className={`rounded-full m-auto text-white h-7 w-32 flex items-center justify-center ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {
                      accountStatus.find((label) => label.value === item.status)
                        .label
                    }
                  </div> */}
                </TableCell>
                <TableCell align="right" width={"10%"}>
                  <Button
                    className=""
                    type="button"
                    kind="ghost"
                    onClick={() => setIsTrainerDetailModalOpen(true)}
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
        />
      </TableContainer>
    </Fragment>
  );
};

export default TrainerListPage;
