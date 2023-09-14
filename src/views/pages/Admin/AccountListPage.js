import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Card,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Popover,
  Skeleton,
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

import ModalUserDetailAdmin from "views/components/modal/ModalUserDetailAdmin";
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
  const [isUserDetailModalOpen, setIsUserDetailModalOpen] = useState(false);
  const [userModalId, setUserModalId] = useState(0);

  const handleClickUserDetail = (userId) => {
    // setIsUserDetailModalOpen(true);
    // setUserModalId(userModalId);
    navigate("/account-list/" + userId);
    setOpen(null);
  };

  const handleClickDeleteModal = (userModalId) => {
    setOpen(null);
  };

  // Popover
  const [open, setOpen] = useState(null); // use for AnchorEl
  const [idSeclected, setIdSeclected] = useState(0);

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setIdSeclected(id);
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
      {/* Modal and Popover */}
      <ModalUserDetailAdmin
        isOpen={isUserDetailModalOpen}
        onRequestClose={() => setIsUserDetailModalOpen(false)}
        userIdClicked={userModalId}
      ></ModalUserDetailAdmin>

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
        <MenuItem onClick={() => handleClickUserDetail(idSeclected)}>
          <ModeEditOutlineIcon sx={{ mr: 2 }} />
          Sửa
        </MenuItem>

        <MenuItem onClick={() => handleClickDeleteModal(idSeclected)}>
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
                <>
                  <TableRow>
                    <TableCell width={"10%"}>
                      <Skeleton variant="circular" width={40} height={40} />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"10%"}>
                      <Skeleton variant="circular" width={40} height={40} />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"10%"}>
                      <Skeleton variant="circular" width={40} height={40} />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"}>
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
                        onClick={(event) => handleOpenMenu(event, item.id)}
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
