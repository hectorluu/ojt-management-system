import React, { useEffect, useState } from "react";
import MainCard from "views/components/cards/MainCard";
import {
  SvgIcon,
  Button,
  TablePagination,
  TableCell,
  TableRow,
  Skeleton,
  TableBody,
  TableContainer,
  Table,
  TableHead,
  Card,
  OutlinedInput,
  InputAdornment,
  Popover,
  MenuItem,
  IconButton,
  Autocomplete,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SearchIcon from "@mui/icons-material/Search";
import {
  defaultPageIndex,
  defaultPageSize,
  formulaStatusOptions,
} from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import useOnChange from "logic/hooks/useOnChange";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { formulaPath } from "logic/api/apiUrl";
import Chip from "views/components/chip/Chip";
import SubCard from "views/components/cards/SubCard";
import { formulaNoti } from "logic/constants/notification";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

const ListFormulaPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isLoading, setIsLoading] = useState(true);
  const [formulaList, setFormulaList] = useState([]);
  // Popover
  const [open, setOpen] = useState(null); // use for AnchorEl
  const [selectedItem, setSelectedItem] = useState({}); // use for data of row selected
  const [status, setStatus] = useState("");

  const handleOpenMenu = (event, item) => {
    setOpen(event.currentTarget);
    setSelectedItem(item);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const theme = useTheme();
  const navigate = useNavigate();

  const handleClickFormulaDetail = (item) => {
    navigate("/formula-detail/" + item.id);
    setOpen(null);
  };

  useEffect(() => {
    fetchFormulas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, rowsPerPage, page, status]);

  async function fetchFormulas() {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        formulaPath.GET_FORMULA_LIST +
          "?PageIndex=" +
          page +
          "&PageSize=" +
          rowsPerPage +
          "&searchTerm=" +
          `${searchTerm === null ? "" : searchTerm}` +
          "&filterStatus=" +
          status
      );
      setFormulaList(response.data.data);
      setTotalItem(response.data.totalItem);
      setIsLoading(false);
      // setPage(response.data.pageIndex);
    } catch (error) {
      console.log("fetchSkill ~ error", error);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const onClickDelete = async (item) => {
    try {
      setIsLoading(true);
      await axiosPrivate.delete(formulaPath.DELETE_FORMULA + item.id);
      fetchFormulas();
      toast.success(formulaNoti.SUCCESS.DELETE);
      setIsLoading(false);
      setOpen(null);
      // setPage(response.data.pageIndex);
    } catch (error) {
      console.log("fetchSkill ~ error", error);
      setIsLoading(false);
    }
  };

  const onClickActive = async (item) => {
    try {
      setIsLoading(true);
      await axiosPrivate.put(formulaPath.UPDATE_FORMULA + item.id, {
        calculation: item.calculation,
        name: item.name,
        status: 2,
      });
      fetchFormulas();
      toast.success(formulaNoti.SUCCESS.ACTIVE);
      setIsLoading(false);
      setOpen(null);
    } catch (error) {
      console.log("Active error", error);
      setIsLoading(false);
    }
  };

  return (
    <MainCard
      title="Công thức tính điểm"
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          to="/define-formula"
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Tạo công thức tính điểm mới
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
        <MenuItem onClick={() => handleClickFormulaDetail(selectedItem)}>
          <ModeEditOutlineIcon sx={{ mr: 2 }} />
          Sửa
        </MenuItem>
        {selectedItem.status === 2 ? (
          <MenuItem onClick={() => onClickDelete(selectedItem)}>
            <DeleteIcon sx={{ mr: 2, color: theme.palette.error.main }} />
            <span style={{ color: theme.palette.error.main }}>Xóa</span>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => onClickActive(selectedItem)}>
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
                    <SearchIcon />
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
              options={formulaStatusOptions}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Trạng thái" />
              )}
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
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell width={"50%"}>Công thức</StyledTableCell>
                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                <StyledTableCell align="right" width={"5%"}></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? ( // Render skeleton loading when loading is true
                // Use the animate-pulse class for skeleton effect
                <>
                  <TableRow>
                    <TableCell width={"30%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"5%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"30%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"5%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width={"30%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton animation="wave" />
                    </TableCell>
                    <TableCell width={"5%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                  </TableRow>
                </>
              ) : formulaList.length !== 0 ? (
                formulaList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell width={"30%"}>{item.name}</TableCell>
                    <TableCell align="center">
                      <Chip
                        color={
                          item.status === 1 || item.status === 3
                            ? "error"
                            : "success"
                        }
                      >
                        {
                          formulaStatusOptions.find(
                            (label) => label.value === item.status
                          ).label
                        }
                      </Chip>
                    </TableCell>
                    <TableCell align="right" width={"5%"}>
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
                    Không có công thức nào được tìm thấy.
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

export default ListFormulaPage;
