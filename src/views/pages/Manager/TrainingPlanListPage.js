import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import {
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
  useTheme,
} from "@mui/material";
import {
  defaultPageSize,
  defaultPageIndex,
  trainingPlanStatus,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import ModalTrainingPlanDetailManager from "views/components/modal/ModalTrainingPlanDetailManager";
import { trainingPlanPath } from "logic/api/apiUrl";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SearchIcon from "@mui/icons-material/Search";
import useOnChange from "logic/hooks/useOnChange";

const TrainingPlanListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [trainingplans, setTrainingplans] = useState([]);
  const [totalTrainingPlans, setTotalTrainingPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);

  useEffect(() => {
    async function fetchTrainingPlans() {
      try {
        const response = await axiosPrivate.get(
          trainingPlanPath.GET_TRAINING_PLAN_LIST +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage +
            "&nameSearch=" +
            `${searchTerm === null ? "" : searchTerm}` +
            "&status=" +
            trainingPlanStatus.ACTIVE
        );
        setTrainingplans(response.data.data);
        setTotalItem(response.data.totalItem);
      } catch (error) {
        console.log("fetchTrainingPlans ~ error", error);
      }
    }
    fetchTrainingPlans();

    async function fetchTotalTrainingPlans() {
      try {
        const response = await axiosPrivate.get(
          trainingPlanPath.GET_TRAINING_PLAN_LIST + "?PageSize=" + 1000000
        );
        setTotalTrainingPlans(response.data.data);
      } catch (error) {
        console.log("fetchTrainingPlans ~ error", error);
      }
    }
    fetchTotalTrainingPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [isTraingingPlanDetailModalOpen, setIsTrainingPlanDetailModalOpen] =
    useState(false);

  const theme = useTheme();

  return (
    <MainCard
      title={`Danh sách kế hoạch đào tạo (${totalTrainingPlans.length})`}
    >
      <ModalTrainingPlanDetailManager
        isOpen={isTraingingPlanDetailModalOpen}
        onRequestClose={() => setIsTrainingPlanDetailModalOpen(false)}
      ></ModalTrainingPlanDetailManager>

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
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" width={"25%"}>
                  Tên kế hoạch
                </StyledTableCell>
                <StyledTableCell align="left" width={"25%"}>
                  Người tạo
                </StyledTableCell>
                <StyledTableCell align="center" width={"20%"}>
                  Ngày gửi
                </StyledTableCell>
                <StyledTableCell align="right" width={"15%"}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainingplans.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right" width={"15%"}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark, // Color on hover
                        },
                      }}
                      component="label"
                      className="flex items-center justify-center cursor-pointer w-3/4 h-8 text-text1 rounded-md"
                      onClick={() => setIsTrainingPlanDetailModalOpen(true)}
                    >
                      <span className="text-white">Chi tiết</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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

export default TrainingPlanListPage;
