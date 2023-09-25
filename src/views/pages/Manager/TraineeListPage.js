import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
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
  TextField,
  useTheme,
} from "@mui/material";
import { positionPath, userPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  defaultUserIcon,
  positionStatus,
  traineeWorkingStatus,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import ModalTraineeDetailManager from "views/components/modal/ModalTraineeDetailManager";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SearchIcon from "@mui/icons-material/Search";
import useOnChange from "logic/hooks/useOnChange";
import { toast } from "react-toastify";
import Chip from "views/components/chip/Chip";
import TraineeListSkeleton from "views/modules/TraineeListSkeleton";

const TraineeListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [position, setPosition] = useState("");
  const [positionList, setPositionList] = useState([]);

  const fetchPositions = async () => {
    try {
      const response = await axiosPrivate.get(
        positionPath.GET_POSITION_LIST +
        "?PageIndex=" +
        1 +
        "&PageSize=" +
        100000 +
        "&filterStatus=" +
        positionStatus.ACTIVE
      );
      setPositionList(response.data.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        userPath.GET_TRAINEE_LIST +
        "?PageIndex=" +
        page +
        "&PageSize=" +
        rowsPerPage +
        "&keyword=" +
        `${searchTerm === null ? "" : searchTerm}` +
        "&position=" +
        `${position === null ? "" : position}`
      );
      setUsers(response.data.data);
      setTotalItem(response.data.totalItem);
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, position, rowsPerPage, page]);

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

  const theme = useTheme();

  return (
    <MainCard title={`Thực tập sinh `}>
      {isTraineeDetailModalOpen ?
        <ModalTraineeDetailManager
          isOpen={isTraineeDetailModalOpen}
          onRequestClose={() => setIsTraineeDetailModalOpen(false)}
          traineeSelected={selectedItem}
        ></ModalTraineeDetailManager>
        : null}
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
          <div className="flex flex-wrap items-start max-w-[200px] w-full">
            <Autocomplete
              disablePortal={false}
              id="combo-box-demo"
              options={positionList}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Vị trí" />}
              onChange={(event, newValue) => {
                if (newValue) {
                  setPosition(newValue.id);
                } else {
                  setPosition("");
                }
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
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
                >
                  {" "}
                </StyledTableCell>
                <StyledTableCell align="left" width={"25%"}>
                  Họ và tên
                </StyledTableCell>
                <StyledTableCell align="left" width="25%">
                  Email
                </StyledTableCell>
                <StyledTableCell align="center" width={"15%"}>
                  Vai trò
                </StyledTableCell>
                <StyledTableCell align="center" width={"15%"}>
                  Trạng thái
                </StyledTableCell>
                <StyledTableCell align="right" width={"10%"}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TraineeListSkeleton />
              ) : users.length !== 0 ? (
                users.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell width={"10%"}>
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src={item.avatarURL || defaultUserIcon}
                        alt=""
                      />
                    </TableCell>
                    <TableCell align="left" width={"25%"}>
                      {item.firstName + " " + item.lastName}
                    </TableCell>
                    <TableCell align="left" width={"25%"}>{item.email}</TableCell>
                    <TableCell align="center" width={"15%"}>{item.positionName}</TableCell>
                    <StyledTableCell align="center" width={"15%"}>
                      <Chip color={item.status === 1 ? "warning" : "success"}>
                        {
                          traineeWorkingStatus.find(
                            (label) => label.value === item.status
                          ).label
                        }
                      </Chip>
                    </StyledTableCell>
                    <TableCell align="right" width={"10%"}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark, // Color on hover
                          },
                        }}
                        component="label"
                        className="flex items-center justify-center cursor-pointer w-full h-8 text-text1 rounded-md"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsTraineeDetailModalOpen(true);
                        }}
                      >
                        <span className="text-white">Chi tiết</span>
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
