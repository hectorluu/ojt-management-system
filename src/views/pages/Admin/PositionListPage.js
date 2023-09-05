import Gap from "views/components/common/Gap";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import {
  Card,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { positionPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  statusColor,
  signalRMessage,
  positionStatusOptions,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import SearchBar from "views/modules/SearchBar";
import useOnChange from "logic/hooks/useOnChange";
import signalRService from "logic/utils/signalRService";
import ModalAddPositionAdmin from "views/components/modal/ModalAddPositionAdmin";
import ModalEditPositionAdmin from "views/components/modal/ModalEditPositionAdmin";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { styled } from "@mui/material/styles";
import MainCard from "views/components/cards/MainCard";
import { SvgIcon, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "views/components/chip/Chip";

const PositionListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [positions, setPosition] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isAddPositionModalOpen, setIsAddPositionModalOpen] = useState(false);
  const [isEditPositionModalOpen, setIsEditPositionModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // style table head
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  useEffect(() => {
    fetchPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, page, rowsPerPage]);

  useEffect(() => {
    signalRService.on(signalRMessage.POSITION, (message) => {
      fetchPositions();
    });

    return () => {
      signalRService.off(signalRMessage.POSITION);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchPositions() {
    try {
      const response = await axiosPrivate.get(
        positionPath.GET_POSITION_LIST +
          "?PageIndex=" +
          page +
          "&PageSize=" +
          rowsPerPage +
          "&searchTerm=" +
          `${searchTerm === null ? "" : searchTerm}`
      );
      setPosition(response.data.data);
      setTotalItem(response.data.totalItem);
      setIsLoading(false);
      // setPage(response.data.pageIndex);
    } catch (error) {
      console.log("fetchPosition ~ error", error);
      setIsLoading(false);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return statusColor.DELETED;
      case 2:
        return statusColor.ACTIVE;
      default:
        return statusColor.INACTIVE; // You can set a default color class if needed
    }
  };

  const [positionModalId, setPositionModalId] = useState(0);

  const handleClickPositionModal = (id) => {
    setIsEditPositionModalOpen(true);
    setPositionModalId(id);
  };

  return (
    <MainCard
      title="Vị trí"
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          onClick={() => setIsAddPositionModalOpen(true)}
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Thêm vị trí
        </Button>
      }
    >
      <ModalEditPositionAdmin
        isOpen={isEditPositionModalOpen}
        onRequestClose={() => setIsEditPositionModalOpen(false)}
        positionIdClicked={positionModalId}
      ></ModalEditPositionAdmin>
      <ModalAddPositionAdmin
        isOpen={isAddPositionModalOpen}
        onRequestClose={() => setIsAddPositionModalOpen(false)}
      ></ModalAddPositionAdmin>
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell width={"30%"}>Vị trí</StyledTableCell>
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
            ) : positions.length !== 0 ? (
              positions.map((item) => (
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
                        positionStatusOptions.find(
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
                      onClick={() => handleClickPositionModal(item.id)}
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
                <TableCell colSpan={4} align="center">
                  Không có vị trí nào được tìm thấy.
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

export default PositionListPage;
