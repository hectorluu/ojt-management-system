import Heading from "views/components/common/Heading";
//import { Button } from "components/button";
import Gap from "views/components/common/Gap";
import React, { Fragment } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const TrainingPlanCertifyPage = () => {
  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">
            Phê duyệt kế hoạch đào tạo
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
          {/* <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="left" width={"25%"}>
                  {item.fullName}
                </TableCell>
                <TableCell align="left" width={"45%"}>
                  {item.location}
                </TableCell>
                <TableCell align="center" width={"20%"}>
                  {roleOptions.find((label) => label.value === item.role).label}
                </TableCell>
                <TableCell align="right" width={"10%"}>
                  <Button className="" type="button" href="/" kind="ghost">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
        {/* <TablePagination
          component="div"
          count={totalItem}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`}
        /> */}
      </TableContainer>
    </Fragment>
  );
};

export default TrainingPlanCertifyPage;
