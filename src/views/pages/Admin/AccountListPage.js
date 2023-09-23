import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  OutlinedInput,
  Popover,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";

import { userPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  accountStatus,
  signalRMessage,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import { roleOptions } from "logic/constants/global";

import useOnChange from "logic/hooks/useOnChange";
import { defaultUserIcon } from "logic/constants/global";
import signalRService from "logic/utils/signalRService";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MainCard from "views/components/cards/MainCard";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import Chip from "views/components/chip/Chip";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SubCard from "views/components/cards/SubCard";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountListSkeleton from "views/modules/account/AccountListSkeleton";

const AccountListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [role, setRole] = useState("");

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
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.log("fetchUsers ~ error", error);
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    signalRService.on(signalRMessage.USER.CREATE, (message) => {
      fetchUsers();
    });
    signalRService.on(signalRMessage.USER.UPDATE, (message) => {
      fetchUsers();
    });

    return () => {
      signalRService.off(signalRMessage.USER.CREATE);
      signalRService.off(signalRMessage.USER.UPDATE);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, role, rowsPerPage, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // Modal
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleClickUserDetail = (userId) => {
    navigate("/account-list/" + userId);
    setOpen(null);
  };

  const handleCloseDeleteModal = () => {
    setIsModalDeleteOpen(false);
    setOpen(null);
  };

  const handleOpenDeleteModal = (userId) => {
    setIsModalDeleteOpen(true);
    setOpen(null);
  };

  // Popover
  const [open, setOpen] = useState(null); // use for AnchorEl
  const [userSelected, setUserSelected] = useState(null);

  const handleOpenMenu = (event, user) => {
    setOpen(event.currentTarget);
    setUserSelected(user);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <MainCard
      title={`Tài khoản`}
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          to="/create-new-account"
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Thêm mới
        </Button>
      }
    >
      {/* Modal Delete and Popover*/}
      <Modal open={isModalDeleteOpen} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            borderRadius: "0.5rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 200,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <button
            className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-1 top-1 text-text1"
            onClick={handleCloseDeleteModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="text-center">
            <h2 className="font-bold text-[25px]">Vô hiệu hóa tài khoản</h2>

            <div className="text-text1 text-base flex justify-center my-auto h-24 items-center">
              Bạn có chắc muốn vô hiệu hóa tài khoản &nbsp;
              <strong className="text-text1">{userSelected?.email}</strong>
              &nbsp; ?
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "space-between",
            }}
            className="space-x-2"
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark, // Color on hover
                },
              }}
              component="label"
              className="flex items-center justify-center cursor-pointer w-1/2 h-11 text-text1 rounded-md"
              onClick={handleCloseDeleteModal}
            >
              <span className="text-white">Hủy</span>
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.error.main,
                "&:hover": {
                  backgroundColor: theme.palette.error.dark, // Color on hover
                },
              }}
              component="label"
              className="flex items-center justify-center cursor-pointer w-1/2 h-11 text-text1 rounded-md"
              onClick={() => {
                // Handle the second button click
              }}
            >
              <span className="text-white">Xác nhận</span>
            </Button>
          </Box>
        </Box>
      </Modal>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 120,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => handleClickUserDetail(userSelected)}>
          <ModeEditOutlineIcon sx={{ mr: 2 }} />
          Sửa
        </MenuItem>

        <MenuItem onClick={() => handleOpenDeleteModal(userSelected)}>
          <DeleteIcon sx={{ mr: 2, color: theme.palette.error.main }} />
          <span style={{ color: theme.palette.error.main }}>Xóa</span>
        </MenuItem>
      </Popover>

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

          <div className="flex flex-wrap items-start max-w-[180px] w-full">
            <Autocomplete
              disablePortal={false}
              id="combo-box-demo"
              options={roleOptions}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Vai trò" />
              )}
              onChange={(event, newValue) => {
                if (newValue) {
                  setRole(newValue.value);
                } else {
                  setRole("");
                }
              }}
            />
          </div>
        </div>

        <TableContainer sx={{ width: 1, mt: 2, mb: -2, borderRadius: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  width={"10%"}
                  className="min-w-fit"
                ></StyledTableCell>
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
                <StyledTableCell align="right" width={"10%"}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? ( // Render skeleton loading when loading is true
                // Use the animate-pulse class for skeleton effect
                <AccountListSkeleton />
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
                    <TableCell align="center">
                      {
                        roleOptions.find((label) => label.value === item.role)
                          .label
                      }
                    </TableCell>
                    <TableCell align="center">
                      <Chip color={item.status === 1 ? "error" : "success"}>
                        {
                          accountStatus.find(
                            (label) => label.value === item.status
                          ).label
                        }
                      </Chip>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="large"
                        onClick={(event) => handleOpenMenu(event, item)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
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
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`
            }
          />
        </TableContainer>
      </SubCard>
    </MainCard>
  );
};

export default AccountListPage;
