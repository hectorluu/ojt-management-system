import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { userPath } from "api/apiUrl";
import { defaultPageSize, defaultPageIndex } from "constants/global";
import { Button } from "components/button";
import TablePagination from "@mui/material/TablePagination";
import { roleOptions } from "constants/global";

const AccountListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosPrivate.get(
          userPath.GET_USER_LIST +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage
        );
        setUsers(response.data.data);
        setTotalItem(response.data.totalItem);
        // setPage(response.data.pageIndex);
        console.log("fetchUsers ~ response", response);
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

  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">Tài khoản</Heading>
        </div>

        <Button
          className="px-7"
          type="button"
          href="/create-new-account"
          kind="secondary"
        >
          Thêm tài khoản mới
        </Button>
      </div>
      <Gap></Gap>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left" width={"25%"}>
                Họ và tên
              </TableCell>
              <TableCell align="left" width={"45%"}>
                Địa chỉ
              </TableCell>
              <TableCell align="center" width={"20%"}>
                Phân quyền
              </TableCell>
              <TableCell align="right" width={"10%"}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="left" width={"25%"}>
                  {item.fullName}
                </TableCell>
                <TableCell align="left" width={"45%"}>
                  {item.location}
                </TableCell>
                <TableCell align="center" width={"20%"}>
                  {roleOptions.find((label) => label.value === item.role).label}
                </TableCell>
                <TableCell align="right" width={"10%"}>
                  <Button className="" type="button" href="/" kind="ghost">
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

export default AccountListPage;
