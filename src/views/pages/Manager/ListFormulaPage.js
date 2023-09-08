import Gap from "views/components/common/Gap";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
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
import { formulaNoti } from "logic/constants/notification";
import { toast } from "react-toastify";

const ListFormulaPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isLoading, setIsLoading] = useState(true);
  const [formulaList, setFormulaList] = useState([]);

  useEffect(() => {
    fetchFormulas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, rowsPerPage, page]);

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
        `${searchTerm === null ? "" : searchTerm}`
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

  const onClickDelete = async (id) => {
    try {
      setIsLoading(true);
      await axiosPrivate.delete(
        formulaPath.DELETE_FORMULA + id
      );
      fetchFormulas();
      toast.success(formulaNoti.SUCCESS.CREATE);
      setIsLoading(false);
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
        status: 2
      });
      fetchFormulas();
      toast.success(formulaNoti.SUCCESS.ACTIVE);
      setIsLoading(false);
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
      </div>
      <Gap></Gap>
      <TableContainer sx={{ width: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell width={"30%"}>Công thức</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
              <StyledTableCell align="right" width={"5%"}></StyledTableCell>
              <StyledTableCell align="right" width={"15%"}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? ( // Render skeleton loading when loading is true
              // Use the animate-pulse class for skeleton effect
              <>
                <TableRow>
                  <TableCell width={"30%"}>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell width={"5%"}>
                    <Skeleton />
                  </TableCell>
                  <TableCell width={"5%"}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width={"30%"}>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell width={"5%"}>
                    <Skeleton />
                  </TableCell>
                  <TableCell width={"5%"}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width={"30%"}>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell width={"5%"}>
                    <Skeleton />
                  </TableCell>
                  <TableCell width={"5%"}>
                    <Skeleton />
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
                    <Button
                      className=""
                      type="button"
                      kind="ghost"
                      onClick={() => console.log("edit")}
                    >
                      <ModeEditOutlineIcon></ModeEditOutlineIcon>
                    </Button>
                  </TableCell>
                  <TableCell align="center" width={"15%"}>
                    {item.status === 2 ?
                      <Button variant="contained" component="label" color="error"
                        onClick={() => onClickDelete(item.id)}
                      >
                        Vô hiệu
                      </Button> :
                      <Button variant="contained" component="label" color="success"
                        onClick={() => onClickActive(item)}
                      >
                        Kích hoạt
                      </Button>}
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
    </MainCard>
  );
};

export default ListFormulaPage;
