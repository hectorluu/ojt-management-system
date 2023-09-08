import React, { useEffect, useState } from "react";
import { ojtBatchPath, reportPath } from "logic/api/apiUrl";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import MainCard from "views/components/cards/MainCard";

const ManagerReportListPage = () => {
  const [reports, setReports] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    async function fetchReports() {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        const response = await axiosPrivate.get(reportPath.GET_LIST_REPORT);
        setReports(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    }
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainCard title="Xuất báo cáo">
      {/* <TableContainer sx={{ width: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" width={"10%"}></StyledTableCell>
              <StyledTableCell align="left" width={"25%"}>
                Họ và tên
              </StyledTableCell>
              <StyledTableCell align="left" width={"25%"}>
                Email
              </StyledTableCell>
              <StyledTableCell align="center" width={"15%"}>
                Phân quyền
              </StyledTableCell>
              <StyledTableCell align="center" width={"15%"}>
                Trạng thái
              </StyledTableCell>
              <StyledTableCell align="right" width={"20%"}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? ( // Render skeleton loading when loading is true
              // Use the animate-pulse class for skeleton effect
              <TableRow>
                <TableCell colSpan={6} className="animate-pulse">
                  <div className="h-7 w-20 bg-gray-300 rounded"></div>
                  <div className="h-7 w-25 bg-gray-300 rounded"></div>
                  <div className="h-7 w-25 bg-gray-300 rounded"></div>
                  <div className="h-7 w-15 bg-gray-300 rounded"></div>
                  <div className="h-7 w-15 bg-gray-300 rounded"></div>
                  <div className="h-7 w-20 bg-gray-300 rounded"></div>
                </TableCell>
              </TableRow>
            ) : users.length !== 0 ? (
              users.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="w-20">
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      src={item.avatarURL || defaultUserIcon}
                      alt=""
                      onError={(e) => { e.target.src = defaultUserIcon }}
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
                  <TableCell
                    align="center"
                    className="flex items-center justify-center"
                  >
                    <div
                      className={`rounded-full m-auto text-white h-7 w-32 flex items-center justify-center ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {
                        accountStatus.find(
                          (label) => label.value === item.status
                        ).label
                      }
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      className=""
                      type="button"
                      kind="ghost"
                      onClick={() => handleClickUserModal(item.id)}
                    >
                      <ModeEditOutlineIcon></ModeEditOutlineIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
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
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} trong ${count !== -1 ? count : `hơn ${to}`}`}
        />
      </TableContainer> */}
    </MainCard>
  );
};

export default ManagerReportListPage;
