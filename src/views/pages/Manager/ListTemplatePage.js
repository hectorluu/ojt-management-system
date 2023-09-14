import React, { useEffect, useState } from "react";
import { Card, SvgIcon, Button, OutlinedInput, InputAdornment, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Skeleton, TablePagination } from "@mui/material";
import { Link } from "react-router-dom";

import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { templatePath } from "logic/api/apiUrl";
import MainCard from "views/components/cards/MainCard";
import AddIcon from "@mui/icons-material/Add";
import SubCard from "views/components/cards/SubCard";
import { GridSearchIcon } from "@mui/x-data-grid";
import StyledTableCell from "views/modules/table/StyledTableCell";
import { LoadingButton } from "@mui/lab";
import { defaultPageIndex, defaultPageSize } from "logic/constants/global";

const ListTemplatePage = () => {
  const [templateList, setTemplateList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        const response = await axiosPrivate.get(templatePath.GET_TEMPLATE_LIST +
          "?PageSize=" +
          rowsPerPage +
          "&PageIndex=" +
          page +
          "&searchTerm=" +
          `${searchTerm === null ? "" : searchTerm}`);
        setTemplateList(response.data.data);
        setTotalItem(response.data.totalItem);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <MainCard
      title={`Danh sách mẫu báo cáo (${templateList.length})`}
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          to="/manager-define-new-report"
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Thêm file báo cáo mới
        </Button>
      }
    >
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
                    <GridSearchIcon />
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
                <StyledTableCell align="left" width={"15%"}>
                  Mẫu đánh giá
                </StyledTableCell>
                <StyledTableCell align="left" width={"25%"}>
                  Trường
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
                <>
                  <TableRow>
                    <TableCell width={"15%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"15%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"15%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Skeleton />
                    </TableCell>
                    <TableCell width={"20%"}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                </>
              ) : templateList.length > 0 ? (
                templateList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-20" align="left">
                      {item.name}
                    </TableCell>
                    <TableCell align="left">
                      {item.universityName}
                    </TableCell>
                    <TableCell align="left">
                      {item.startTime + " - " + item.endTime}
                    </TableCell>
                    <TableCell align="center">
                      {/* <Chip color={item.status === reportStatus.CANNOT ? "error" : "success"}>
                        {
                          reportStatusOptions.find(
                            (label) => label.value === item.status
                          ).label
                        }
                      </Chip> */}
                    </TableCell>
                    <TableCell align="right">
                      {/* <LoadingButton
                        component="label"
                        variant="contained"
                        onClick={() => onClickExport(item)}
                        loading={exportLoading}
                        startIcon={item.status === reportStatus.CAN ? <FileOpenIcon /> : <EditNotificationsIcon />}
                      >
                        {item.status === reportStatus.CAN ? "Xuất báo cáo" : "Nhắc nhở"}
                      </LoadingButton> */}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Không có báo cáo nào được tìm thấy.
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
        </TableContainer>
      </SubCard>
      {/* {template.map((item) => (
        <Card
          sx={{ display: "flex" }}
          className="rounded-2xl border-0 py-3 pb-1"
          key={item.id}
        >
          <div className="flex items-center space-x-96 gap-x-6 ml-5 w-full">
            <div className="flex-1">
              <h1 className="text-[22px] font-semibold mb-2">{item.name}</h1>
              <p className="mb-2 text-sm text-text2">
                Tên trường đại học: {item.universityName}
              </p>
              <p className="mb-2 text-sm text-text2">
                URL: <Link underline="always">{item.url}</Link>
              </p>
            </div>
            <div className="flex items-center justify-center text-white rounded-full w-fit bg-opacity-60">
              <Button
                className="px-7 hover:shadow-xl transition duration-500 ease-in-out mr-5"
                type="button"
                kind="secondary"
                variant="outlined"
              >
                Chọn
              </Button>
            </div>
          </div>
        </Card>
      ))} */}
    </MainCard>
  );
};

export default ListTemplatePage;
