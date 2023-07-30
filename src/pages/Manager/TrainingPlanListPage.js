import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { defaultPageSize, defaultPageIndex } from "constants/global";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "components/button";
import ModalTrainingPlanDetailManager from "components/modal/ModalTrainingPlanDetailManager";
import { trainingPlanPath } from "api/apiUrl";

const TrainingPlanListPage = () => {
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
            rowsPerPage
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

  const [isTraingingPlanDetailModalOpen, setIsTrainingPlanDetailModalOpen] =
    useState(false);

  return (
    <Fragment>
      <ModalTrainingPlanDetailManager
        isOpen={isTraingingPlanDetailModalOpen}
        onRequestClose={() => setIsTrainingPlanDetailModalOpen(false)}
      ></ModalTrainingPlanDetailManager>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">
            Danh sách kế hoạch đào tạo
          </Heading>
        </div>
      </div>
      <Gap></Gap>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left" width={"25%"}>
                Tên kế hoạch
              </TableCell>
              <TableCell align="left" width={"25%"}>
                Người tạo
              </TableCell>
              <TableCell align="center" width={"20%"}>
                Ngày gửi
              </TableCell>
              <TableCell align="right" width={"10%"}></TableCell>
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
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalItem}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Fragment>
  );
};

export default TrainingPlanListPage;
