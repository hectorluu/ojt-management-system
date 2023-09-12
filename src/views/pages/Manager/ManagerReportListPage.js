import React, { useEffect, useState } from "react";
import { notificationPath, ojtBatchPath, reportPath } from "logic/api/apiUrl";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import MainCard from "views/components/cards/MainCard";
import { Card, InputAdornment, OutlinedInput, Skeleton, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import StyledTableCell from "views/modules/table/StyledTableCell";
import { defaultPageIndex, defaultPageSize, reportStatus, reportStatusOptions } from "logic/constants/global";
import SubCard from "views/components/cards/SubCard";
import { GridSearchIcon } from "@mui/x-data-grid";
import useOnChange from "logic/hooks/useOnChange";
import { LoadingButton } from "@mui/lab";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Chip from "views/components/chip/Chip";
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import { storage } from "logic/config/firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { generalNoti, reportNoti } from "logic/constants/notification";

const ManagerReportListPage = () => {
  const [reports, setReports] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [exportLoading, setExportLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, page, rowsPerPage]);

  async function fetchReports() {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        ojtBatchPath.GET_BATCH_EXPORT_STATUS +
        "?PageSize=" +
        rowsPerPage +
        "&PageIndex=" +
        page +
        "&searchTerm=" +
        `${searchTerm === null ? "" : searchTerm}`
      );
      setReports(response.data.data);
      setTotalItem(response.data.totalItem);
      setIsLoading(false);
    } catch (error) {
      toast.error(generalNoti.ERROR.SERVER_ERROR);
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onClickExport = async (item) => {
    setExportLoading(true);
    if (item.status === reportStatus.CAN) {
      getDownloadURL(ref(storage, item.url))
        .then(async (path) => {
          const response = await axiosPrivate.put(reportPath.EXPORT_REPORT,
            {
              batchId: item.id,
              url: path,
            }, { responseType: "blob" });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = `${item.universityName}-${item.name}-${item.startTime}-${item.endTime}.xlsx`;
          // Trigger the click event to initiate the download
          a.click();
          setExportLoading(false);
          toast.success(reportNoti.SUCCESS.EXPORT);
        })
        .catch((error) => {
          toast.error(generalNoti.ERROR.SERVER_ERROR);
          setExportLoading(false);
          console.log(error);
        });
    } else {
      try {
        await axiosPrivate.post(notificationPath.CREATE_EVALUATION_NOTIFICATION + item.id);
        setExportLoading(false);
        toast.success(reportNoti.SUCCESS.NOTI);
      } catch (error) {
        toast.error(generalNoti.ERROR.SERVER_ERROR);
        setExportLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <MainCard title="Xuất báo cáo">
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
                  Đợt thực tập
                </StyledTableCell>
                <StyledTableCell align="left" width={"25%"}>
                  Trường
                </StyledTableCell>
                <StyledTableCell align="left" width={"25%"}>
                  Thời gian thực tập
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
              ) : reports.length > 0 ? (
                reports.map((item) => (
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
                      <Chip color={item.status === reportStatus.CANNOT ? "error" : "success"}>
                        {
                          reportStatusOptions.find(
                            (label) => label.value === item.status
                          ).label
                        }
                      </Chip>
                    </TableCell>
                    <TableCell align="right">
                      <LoadingButton
                        component="label"
                        variant="contained"
                        onClick={() => onClickExport(item)}
                        loading={exportLoading}
                        startIcon={item.status === reportStatus.CAN ? <FileOpenIcon /> : <EditNotificationsIcon />}
                      >
                        {item.status === reportStatus.CAN ? "Xuất báo cáo" : "Nhắc nhở"}
                      </LoadingButton>
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
    </MainCard>
  );
};

export default ManagerReportListPage;
