import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import {
  Button,
  Skeleton,
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
import { fDate } from "logic/utils/formatTime";
import { toast } from "react-toastify";

const TrainingPlanCertifyPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [totalItem, setTotalItem] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [trainingplans, setTrainingplans] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
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

  async function fetchTrainingPlans() {
    try {
      setIsLoading(true);
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
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false); // Set loading to false after fetching data
    }
  }

  const [isTraingingPlanCertifyModalOpen, setIsTrainingPlanCertifyModalOpen] =
    useState(false);

  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleApprovePlan = async () => {
    try {
      const response = await axiosPrivate.put(
        trainingPlanPath.APPROVE_PLAN + selectedItem.id
      );
      toast.success(response.data);
      setIsTrainingPlanCertifyModalOpen(false);
      fetchTrainingPlans();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleRejectPlan = async () => {
    try {
      const response = await axiosPrivate.put(
        trainingPlanPath.DENY_PLAN + selectedItem.id
      );
      toast.success(response.data);
      setIsTrainingPlanCertifyModalOpen(false);
      fetchTrainingPlans();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <MainCard title="Phê duyệt kế hoạch đào tạo">
      <ModalTrainingPlanCertifyManager
        isOpen={isTraingingPlanCertifyModalOpen}
        onRequestClose={() => setIsTrainingPlanCertifyModalOpen(false)}
        selectedTrainingPlan={selectedItem}
        handleApprove={handleApprovePlan}
        handleDeny={handleRejectPlan}
      ></ModalTrainingPlanCertifyManager>

      <SubCard>
        <TableContainer sx={{ width: 1, mb: -2, borderRadius: 4 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" width={"40%"}>
                  Tên kế hoạch
                </StyledTableCell>
                <StyledTableCell align="left" width={"25%"}>
                  Người tạo
                </StyledTableCell>
                <StyledTableCell align="center" width={"20%"}>
                  Ngày tạo
                </StyledTableCell>
                <StyledTableCell align="right" width={"15%"}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <>
                  <TableRow>
                    <TableCell width={"40%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"40%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"40%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"} animation="wave">
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                </>
              ) : trainingplans.length !== 0 ? (
                trainingplans.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="left">
                      {item.firstName + " " + item.lastName}
                    </TableCell>
                    <TableCell align="center">
                      {fDate(item.createDate)}
                    </TableCell>
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
                        onClick={() => {
                          setSelectedItem(item);
                          setIsTrainingPlanCertifyModalOpen(true);
                        }}
                      >
                        <span className="text-white">Chi tiết</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Không có kế hoạch đào tạo nào để duyệt.
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

export default TrainingPlanCertifyPage;
