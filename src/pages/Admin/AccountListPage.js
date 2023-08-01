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
import { userPath } from "api/apiUrl";
import { defaultPageSize, defaultPageIndex } from "constants/global";
import TablePagination from "@mui/material/TablePagination";
import { roleOptions } from "constants/global";
import SearchBar from "modules/SearchBar";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import ModalUserDetailAdmin from "components/modal/ModalUserDetailAdmin";
import useOnChange from "hooks/useOnChange";

const AccountListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [role, setRole] = useState("");
  const [roleFiltered, setRoleFilter] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axiosPrivate.get(
        userPath.GET_USER_LIST +
          "?PageSize=" +
          rowsPerPage +
          "&PageIndex=" +
          page +
          "&searchTerm=" +
          `${searchTerm === null ? "" : searchTerm}` +
          "&role=" +
        role
      );
      setUsers(response.data.data);
      setTotalItem(response.data.totalItem);
    } catch (error) {
      console.log("fetchUsers ~ error", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, role, rowsPerPage, page]);

  useEffect(() => {
    const allRole = [{ value: "", label: "Tất cả" }];
    const roles = roleOptions.slice();
    roles.unshift(...allRole);
    setRoleFilter(roles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const getDropdownLabel = (
    name,
    options = [{ value: "", label: "" }],
    defaultValue = ""
  ) => {
    const value = name || defaultValue;
    const label = options.find((label) => label.value === value);
    return label ? label.label : defaultValue;
  };

  const handleSelectRoleDropdownOption = (value) => {
    setRole(value);
  };

  const [isUserDetailModalOpen, setIsUserDetailModalOpen] = useState(false);
  const [userModalId, setUserModalId] = useState(0);

  const handleClickUserModal = (userModalId) => {
    setIsUserDetailModalOpen(true);
    setUserModalId(userModalId);
  };

  return (
    <Fragment>
      <ModalUserDetailAdmin
        isOpen={isUserDetailModalOpen}
        onRequestClose={() => setIsUserDetailModalOpen(false)}
        userIdClicked={userModalId}
      ></ModalUserDetailAdmin>
      <div className="flex flex-wrap items-center justify-between">
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
      <div className="flex flex-wrap items-start gap-5 mt-5">
        <div className=" max-w-[600px] w-full">
          <SearchBar onChangeSearch={setSearchTerm}></SearchBar>
        </div>
        <div className="flex flex-wrap items-start max-w-[200px] w-full">
          <Dropdown className="bg-white">
            <Dropdown.Select
              placeholder={getDropdownLabel(role, roleFiltered, "Phân quyền")}
            ></Dropdown.Select>
            <Dropdown.List>
              {roleFiltered.map((personRole) => (
                <Dropdown.Option
                  key={personRole.value}
                  onClick={() =>
                    handleSelectRoleDropdownOption(personRole.value)
                  }
                >
                  <span className="capitalize">{personRole.label}</span>
                </Dropdown.Option>
              ))}
            </Dropdown.List>
          </Dropdown>
        </div>
      </div>
      <Gap></Gap>
      <TableContainer sx={{ width: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={"10%"}></TableCell>
              <TableCell align="left" width={"25%"}>
                Họ và tên
              </TableCell>
              <TableCell align="left" width={"35%"}>
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
                <TableCell className="w-20">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="logo.png"
                    alt=""
                  />
                </TableCell>
                <TableCell align="left">{item.fullName}</TableCell>
                <TableCell align="left">{item.address}</TableCell>
                <TableCell align="center">
                  {roleOptions.find((label) => label.value === item.role).label}
                </TableCell>
                <TableCell align="right">
                  <Button
                    className=""
                    type="button"
                    kind="ghost"
                    onClick={() => handleClickUserModal(item.id)}
                  >
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
