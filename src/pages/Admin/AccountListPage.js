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

const AccountListPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosPrivate.get(userPath.GET_USER_LIST + "?" + defaultPageIndex + "&" + defaultPageSize);
        setUsers(response.data.data);
        console.log("fetchUsers ~ response", response);
      } catch (error) {
        console.log("fetchUsers ~ error", error);
      }
    }
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default AccountListPage;
