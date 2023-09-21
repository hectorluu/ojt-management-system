import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
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
import ModalTrainerDetailManager from "views/components/modal/ModalTrainerDetailManager";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SearchIcon from "@mui/icons-material/Search";
import useOnChange from "logic/hooks/useOnChange";

const TrainerListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);

  const [isTrainerDetailModalOpen, setIsTrainerDetailModalOpen] =
    useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosPrivate.get(
          userPath.GET_TRAINER_LIST +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage +
            "&keyword=" +
            `${searchTerm === null ? "" : searchTerm}`
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
          userPath.GET_TRAINER_LIST + "?PageSize=" + 1000000
        );
        setTotalUsers(response.data.data);
      } catch (error) {
        console.log("fetchUsers ~ error", error);
      }
    }
    fetchTotalUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <MainCard title={`Đào tạo viên (${totalUsers.length})`}>
      <ModalTrainerDetailManager
        isOpen={isTrainerDetailModalOpen}
        onRequestClose={() => setIsTrainerDetailModalOpen(false)}
        selectedTrainer={selectedItem}
      ></ModalTrainerDetailManager>

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
        </div>

        <TableContainer sx={{ width: 1, mt: 2, mb: -2, borderRadius: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Họ và tên</StyledTableCell>
                <StyledTableCell width="20%">Email</StyledTableCell>
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
                    <TableCell align="right" width={"10%"}>
                      <Button
                        className=""
                        type="button"
                        kind="ghost"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsTrainerDetailModalOpen(true);
                        }}
                      >
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Không có đào tạo viên nào được tìm thấy.
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

export default TrainerListPage;
