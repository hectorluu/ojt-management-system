import Gap from "views/components/common/Gap";
import React, { useState } from "react";
import MainCard from "views/components/cards/MainCard";
import { SvgIcon, Button, TablePagination, TableCell, TableRow, Skeleton, TableBody, TableContainer, Table, TableHead, Card, OutlinedInput, InputAdornment, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SearchIcon from "@mui/icons-material/Search";
import { defaultPageIndex, defaultPageSize, formulaStatusOptions } from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import useOnChange from "logic/hooks/useOnChange";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

const ListFormulaPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isLoading, setIsLoading] = useState(true);
  const [formulaList, setFormulaList] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
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
              <StyledTableCell align="right" width={"5%"}></StyledTableCell>
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
                  <TableCell
                    align="center"
                    className="flex items-center justify-center"
                  >
                    <Chip
                      color={
                        item.status === 1 || item.status === 3
                          ? "error"
                          : "success"
                      }
                    >
                      {
                        formulaList.find(
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
                  <TableCell align="right" width={"5%"}>
                    <Button className="bg-red-500 text-white" type="button">
                      Xóa
                    </Button>
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
