import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import {
  Button,
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
import { trainingPlanPath } from "logic/api/apiUrl";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import StyledTableCell from "views/modules/table/StyledTableCell";
import ModalTrainingPlanCertifyManager from "views/components/modal/ModalTrainingPlanCertifyManager";

const TrainingPlanCertifyPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [trainingplans, setTrainingplans] = useState([]);
  useEffect(() => {
    async function fetchTrainingPlans() {
      try {
        const response = await axiosPrivate.get(
          trainingPlanPath.GET_TRAINING_PLAN_LIST +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage +
            "&status=" +
            trainingPlanStatus.PENDING
        );
        setTrainingplans(response.data.data);
        setTotalItem(response.data.totalItem);
        // setPage(response.data.pageIndex);
        // console.log("fetchUsers ~ response", response);
      } catch (error) {
        console.log("fetchTrainingPlans ~ error", error);
      }
    }
    fetchTrainingPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [isTraingingPlanCertifyModalOpen, setIsTrainingPlanCertifyModalOpen] =
    useState(false);

  const theme = useTheme();

  return (
    <MainCard title="Phê duyệt kế hoạch đào tạo">
      <ModalTrainingPlanCertifyManager
        isOpen={isTraingingPlanCertifyModalOpen}
        onRequestClose={() => setIsTrainingPlanCertifyModalOpen(false)}
      ></ModalTrainingPlanCertifyManager>

      <SubCard>
        <TableContainer sx={{ width: 1, mb: -2, borderRadius: 4 }}>
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
                      onClick={() => setIsTrainingPlanCertifyModalOpen(true)}
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

export default TrainingPlanCertifyPage;
