import React, { useEffect, useState } from "react";
import { Card, SvgIcon, Button, OutlinedInput, InputAdornment, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Skeleton, TablePagination, Autocomplete, TextField, Popover, MenuItem, IconButton, Modal, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { templatePath } from "logic/api/apiUrl";
import MainCard from "views/components/cards/MainCard";
import AddIcon from "@mui/icons-material/Add";
import SubCard from "views/components/cards/SubCard";
import { GridSearchIcon } from "@mui/x-data-grid";
import StyledTableCell from "views/modules/table/StyledTableCell";
import { defaultPageIndex, defaultPageSize, signalRMessage, templateStatusOptions } from "logic/constants/global";
import Chip from "views/components/chip/Chip";
import useOnChange from "logic/hooks/useOnChange";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";
import { templateNoti } from "logic/constants/notification";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import signalRService from "logic/utils/signalRService";

const ListTemplatePage = () => {
  const [templateList, setTemplateList] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [status, setStatus] = useState("");
  const axiosPrivate = useAxiosPrivate();
  // Popover
  const [open, setOpen] = useState(null); // use for AnchorEl
  const [selected, setSelected] = useState({});

  const handleOpenMenu = (event, item) => {
    setOpen(event.currentTarget);
    setSelected(item);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const theme = useTheme();
  const navigate = useNavigate();

  const handleClickTemplateDetail = (item) => {
    navigate("/template-detail/" + item.id);
    setOpen(null);
  };

  useEffect(() => {
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, page, rowsPerPage, status]);

  useEffect(() => {
    signalRService.on(signalRMessage.TEMPLATE.CREATED, (message) => {
      fetchTemplates();
    });
    signalRService.on(signalRMessage.TEMPLATE.UPDATED, (message) => {
      fetchTemplates();
    });
    signalRService.on(signalRMessage.TEMPLATE.DELETED, (message) => {
      fetchTemplates();
    });

    return () => {
      signalRService.off(signalRMessage.TEMPLATE.CREATED);
      signalRService.off(signalRMessage.TEMPLATE.UPDATED);
      signalRService.off(signalRMessage.TEMPLATE.DELETED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  async function fetchTemplates() {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      const response = await axiosPrivate.get(templatePath.GET_TEMPLATE_LIST +
        "?PageSize=" +
        rowsPerPage +
        "&PageIndex=" +
        page +
        "&searchTerm=" +
        `${searchTerm === null ? "" : searchTerm}` +
        "&filterStatus=" +
        status);
      setTemplateList(response.data.data);
      setTotalItem(response.data.totalItem);
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data);
      setIsLoading(false);
    }
  }

  const handleClickDeleteTemplate = async (item) => {
    try {
      await axiosPrivate.put(templatePath.DELETE_TEMPLATE + item.id);
      setIsModalDeleteOpen(false);
      fetchTemplates();
      toast.success(templateNoti.SUCCESS.DELETE);
    } catch (e) {
      toast.error(e?.response?.data);
    }
  };

  const handleClickActiveTemplate = async (item) => {
    try {
      await axiosPrivate.put(templatePath.ACTIVE_TEMPLATE + item.id);
      setOpen(false);
      fetchTemplates();
      toast.success(templateNoti.SUCCESS.ACTIVE);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  // Modal Delete
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleCloseDeleteModal = () => {
    setIsModalDeleteOpen(false);
    setOpen(null);
  };

  const handleOpenDeleteModal = (skill) => {
    setIsModalDeleteOpen(true);
    setOpen(false);
  };

  return (
    <MainCard
      title={`Danh sách mẫu báo cáo`}
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
      <Modal open={isModalDeleteOpen} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            borderRadius: "0.5rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 200,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <button
            className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-1 top-1 text-text1"
            onClick={handleCloseDeleteModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="text-center">
            <h2 className="font-bold text-[25px]">Vô hiệu hóa mẫu đánh giá</h2>

            <div className="text-text1 text-base flex justify-center my-auto h-24 items-center">
              Bạn có chắc muốn vô hiệu hóa mẫu đánh giá &nbsp;
              <strong className="text-text1">{selected.name}</strong>
              &nbsp; ?
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "space-between",
            }}
            className="space-x-2"
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark, // Color on hover
                },
              }}
              component="label"
              className="flex items-center justify-center cursor-pointer w-1/2 h-11 text-text1 rounded-md"
              onClick={handleCloseDeleteModal}
            >
              <span className="text-white">Hủy</span>
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.error.main,
                "&:hover": {
                  backgroundColor: theme.palette.error.dark, // Color on hover
                },
              }}
              component="label"
              className="flex items-center justify-center cursor-pointer w-1/2 h-11 text-text1 rounded-md"
              onClick={() => handleClickDeleteTemplate(selected)}
            >
              <span className="text-white">Xác nhận</span>
            </Button>
          </Box>
        </Box>
      </Modal>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 120,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => handleClickTemplateDetail(selected)}>
          <ModeEditOutlineIcon sx={{ mr: 2 }} />
          Sửa
        </MenuItem>
        {selected.status === 2 ? (
          <MenuItem onClick={() => handleOpenDeleteModal(selected)}>
            <DeleteIcon sx={{ mr: 2, color: theme.palette.error.main }} />
            <span style={{ color: theme.palette.error.main }}>Xóa</span>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleClickActiveTemplate(selected)}>
            <ToggleOnIcon sx={{ mr: 2, color: theme.palette.success.main }} />
            Kích hoạt
          </MenuItem>
        )}
      </Popover>
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
          <div className="flex flex-wrap items-start max-w-[200px] w-full">
            <Autocomplete
              disablePortal={false}
              options={templateStatusOptions}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Trạng thái" />}
              onChange={(event, newValue) => {
                if (newValue) {
                  setStatus(newValue.value);
                } else {
                  setStatus("");
                }
              }}
            />
          </div>
        </div>
        <TableContainer sx={{ width: 1, mt: 2, mb: -2, borderRadius: 4 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left" width={"40%"}>
                  Mẫu đánh giá
                </StyledTableCell>
                <StyledTableCell align="left" width={"40%"}>
                  Trường
                </StyledTableCell>
                <StyledTableCell align="center" width={"15%"}>
                  Trạng thái
                </StyledTableCell>
                <StyledTableCell align="right" width={"5%"}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? ( // Render skeleton loading when loading is true
                // Use the animate-pulse class for skeleton effect
                <>
                  <TableRow>
                    <TableCell width={"15%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"20%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"15%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"20%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"15%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"25%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"15%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"20%"}>
                      <Skeleton animation="wave" />
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
                    <TableCell align="center">
                      <Chip color={item.status === 3 ? "error" : "success"}>
                        {
                          templateStatusOptions.find(
                            (label) => label.value === item.status
                          ).label
                        }
                      </Chip>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="large"
                        onClick={(event) => handleOpenMenu(event, item)}
                      >
                        <MoreVertIcon />
                      </IconButton>
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

export default ListTemplatePage;
