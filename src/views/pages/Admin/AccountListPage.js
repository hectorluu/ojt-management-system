import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

import { userPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  accountStatus,
  signalRMessage,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import { roleOptions } from "logic/constants/global";
import SearchBar from "views/modules/SearchBar";
import { Dropdown } from "views/components/dropdown";
import { Button } from "views/components/button";
import ModalUserDetailAdmin from "views/components/modal/ModalUserDetailAdmin";
import useOnChange from "logic/hooks/useOnChange";
import { defaultUserIcon } from "logic/constants/global";
import signalRService from "logic/utils/signalRService";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { styled } from "@mui/material/styles";

const AccountListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [role, setRole] = useState("");
  const [roleFiltered, setRoleFilter] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // New loading state

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      let response = await axiosPrivate.get(
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
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    signalRService.on(signalRMessage.USER, (message) => {
      fetchUsers();
    });

    return () => {
      signalRService.off(signalRMessage.USER);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // style table head
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <Fragment>
      <ModalUserDetailAdmin
        isOpen={isUserDetailModalOpen}
        onRequestClose={() => setIsUserDetailModalOpen(false)}
        userIdClicked={userModalId}
      ></ModalUserDetailAdmin>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-center">
          <Heading className="text-[2.25rem] font-bold pt-6">Tài khoản</Heading>
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
              placeholder={getDropdownLabel(role, roleFiltered, "Tất cả")}
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
              <StyledTableCell align="center" width={"10%"}></StyledTableCell>
              <StyledTableCell align="left" width={"25%"}>
                Họ và tên
              </StyledTableCell>
              <StyledTableCell align="left" width={"25%"}>
                Email
              </StyledTableCell>
              <StyledTableCell align="center" width={"15%"}>
                Phân quyền
              </StyledTableCell>
              <StyledTableCell align="center" width={"15%"}>
                Trạng thái
              </StyledTableCell>
              <StyledTableCell align="right" width={"20%"}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? ( // Render skeleton loading when loading is true
              // Use the animate-pulse class for skeleton effect
              <TableRow>
                <TableCell colSpan={6} className="animate-pulse">
                  <div className="h-7 w-20 bg-gray-300 rounded"></div>
                  <div className="h-7 w-25 bg-gray-300 rounded"></div>
                  <div className="h-7 w-25 bg-gray-300 rounded"></div>
                  <div className="h-7 w-15 bg-gray-300 rounded"></div>
                  <div className="h-7 w-15 bg-gray-300 rounded"></div>
                  <div className="h-7 w-20 bg-gray-300 rounded"></div>
                </TableCell>
              </TableRow>
            ) : users.length !== 0 ? (
              users.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="w-20">
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      src={item.avatarURL || defaultUserIcon}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="left">
                    {item.firstName + " " + item.lastName}
                  </TableCell>
                  <TableCell align="left">{item.email}</TableCell>
                  <TableCell align="center">
                    {
                      roleOptions.find((label) => label.value === item.role)
                        .label
                    }
                  </TableCell>
                  <TableCell
                    align="center"
                    className="flex items-center justify-center"
                  >
                    <div
                      className={`rounded-full m-auto text-white h-7 w-32 flex items-center justify-center ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {
                        accountStatus.find(
                          (label) => label.value === item.status
                        ).label
                      }
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      className=""
                      type="button"
                      kind="ghost"
                      onClick={() => handleClickUserModal(item.id)}
                    >
                      <ModeEditOutlineIcon></ModeEditOutlineIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  Không có tài khoản nào được tìm thấy.
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
        />
      </TableContainer>
    </Fragment>
  );
};

export default AccountListPage;
