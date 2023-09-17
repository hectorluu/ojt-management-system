import React, { useEffect, useState } from "react";
import { Card, SvgIcon, Button, OutlinedInput, InputAdornment, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Skeleton, TablePagination, Autocomplete, TextField, Popover, MenuItem, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { templatePath } from "logic/api/apiUrl";
import MainCard from "views/components/cards/MainCard";
import AddIcon from "@mui/icons-material/Add";
import SubCard from "views/components/cards/SubCard";
import { GridSearchIcon } from "@mui/x-data-grid";
import StyledTableCell from "views/modules/table/StyledTableCell";
import { defaultPageIndex, defaultPageSize, templateStatusOptions } from "logic/constants/global";
import Chip from "views/components/chip/Chip";
import useOnChange from "logic/hooks/useOnChange";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
  const [idSeclected, setIdSeclected] = useState(0);

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setIdSeclected(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const theme = useTheme();
  const navigate = useNavigate();

  const handleClickTemplateDetail = (templateId) => {
    navigate("/template-detail/" + templateId);
    setOpen(null);
  };

  const handleClickDeleteModal = (userModalId) => {
    setOpen(null);
  };

  useEffect(() => {
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, page, rowsPerPage, status]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      console.log(error);
      setIsLoading(false);
    }
  }

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
        <MenuItem onClick={() => handleClickTemplateDetail(idSeclected)}>
          <ModeEditOutlineIcon sx={{ mr: 2 }} />
          Sửa
        </MenuItem>

        <MenuItem onClick={() => handleClickDeleteModal(idSeclected)}>
          <DeleteIcon sx={{ mr: 2, color: theme.palette.error.main }} />
          <span style={{ color: theme.palette.error.main }}>Xóa</span>
        </MenuItem>
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
                        onClick={(event) => handleOpenMenu(event, item.id)}
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
