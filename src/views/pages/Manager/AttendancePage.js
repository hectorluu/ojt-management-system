import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Skeleton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { attendancePath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  accountStatus,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import { roleOptions } from "logic/constants/global";

import { defaultUserIcon } from "logic/constants/global";

import MainCard from "views/components/cards/MainCard";

import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Chip from "views/components/chip/Chip";
import StyledTableCell from "views/modules/table/StyledTableCell";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import SubCard from "views/components/cards/SubCard";

const AttendancePage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // New loading state

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      let response = await axiosPrivate.get(attendancePath.GET_ATTENDANCE_FILE);
      setUsers(response.data.data);
      setTotalItem(response.data.totalItem);
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.log("fetchUsers ~ error", error);
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleOpenMenu = (event, id) => {};

  return (
    <MainCard
      title="Điểm danh"
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
          Tải lên file điểm danh
        </Button>
      }
    >
      <SubCard>
        <TableContainer sx={{ width: 1, mb: -2, borderRadius: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  width={"10%"}
                  className="min-w-fit"
                ></StyledTableCell>
                <StyledTableCell align="left" width={"35%"}>
                  Họ và tên
                </StyledTableCell>
                <StyledTableCell align="left" width={"25%"}>
                  Email
                </StyledTableCell>
                <StyledTableCell align="center" width={"20%"}>
                  Phân quyền
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
                    <TableCell width={"35%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"10%"}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"10%"}>
                      <Skeleton variant="circular" width={40} height={40} />
                    </TableCell>
                    <TableCell width={"35%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"10%"}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"10%"}>
                      <Skeleton variant="circular" width={40} height={40} />
                    </TableCell>
                    <TableCell width={"35%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"10%"}>
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

export default AttendancePage;
