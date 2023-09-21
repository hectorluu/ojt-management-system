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
import ModalTraineeDetailManager from "views/components/modal/ModalTraineeDetailManager";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SearchIcon from "@mui/icons-material/Search";
import useOnChange from "logic/hooks/useOnChange";

const TraineeListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosPrivate.get(
          userPath.GET_TRAINEE_LIST +
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
          userPath.GET_TRAINEE_LIST + "?PageSize=" + 1000000
        );

        setTotalUsers(response.data.data);
        // setPage(response.data.pageIndex);
        // console.log("fetchUsers ~ response", response);
      } catch (error) {
        console.log("Error", error);
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

  const [isTraineeDetailModalOpen, setIsTraineeDetailModalOpen] =
    useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <MainCard title={`Thực tập sinh (${totalUsers.length})`}>
      <ModalTraineeDetailManager
        isOpen={isTraineeDetailModalOpen}
        onRequestClose={() => setIsTraineeDetailModalOpen(false)}
        traineeSelected={selectedItem}
      ></ModalTraineeDetailManager>

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
                <StyledTableCell width="25%">Email</StyledTableCell>
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
                          setIsTraineeDetailModalOpen(true);
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
                    Không có thực tập sinh nào được tìm thấy.
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

export default TraineeListPage;
