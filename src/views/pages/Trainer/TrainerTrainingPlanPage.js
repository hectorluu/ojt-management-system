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
} from "@mui/material";
import { defaultPageSize, defaultPageIndex } from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";

import { trainingPlanPath } from "logic/api/apiUrl";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SearchIcon from "@mui/icons-material/Search";
import useOnChange from "logic/hooks/useOnChange";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ModalTrainingPlanDetailTrainer from "views/components/modal/ModalTrainingPlanDetailTrainer";

const TrainerTrainingPlanPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [trainingplans, setTrainingplans] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);

  useEffect(() => {
    async function fetchTrainingPlans() {
      try {
        const response = await axiosPrivate.get(
          trainingPlanPath.GET_TRAINING_PLAN_OF_TRAINER +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage +
            "&nameSearch=" +
            `${searchTerm === null ? "" : searchTerm}`
        );
        setTrainingplans(response.data.data);
        setTotalItem(response.data.totalItem);
      } catch (error) {
        console.log("fetchTrainingPlans ~ error", error);
      }
    }
    fetchTrainingPlans();

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

  return (
    <MainCard
      title={`Danh sách kế hoạch đào tạo`}
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          to="/create-new-training-plan"
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Thêm mới
        </Button>
      }
    >
      <ModalTrainingPlanDetailTrainer
        isOpen={isTraingingPlanDetailModalOpen}
        onRequestClose={() => setIsTrainingPlanDetailModalOpen(false)}
      ></ModalTrainingPlanDetailTrainer>

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
                <StyledTableCell align="left" width={"45%"}>
                  Tên kế hoạch
                </StyledTableCell>

                <StyledTableCell align="center" width={"20%"}>
                  Ngày gửi
                </StyledTableCell>
                <StyledTableCell align="center" width={"25%"}>
                  Trạng thái
                </StyledTableCell>
                <StyledTableCell align="right" width={"10%"}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainingplans.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right" width={"10%"}>
                    <Button
                      className=""
                      type="button"
                      kind="ghost"
                      onClick={() => setIsTrainingPlanDetailModalOpen(true)}
                    >
                      Chi tiết
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

export default TrainerTrainingPlanPage;
