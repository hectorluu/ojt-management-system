import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  OutlinedInput,
  Popover,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { positionPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  signalRMessage,
  positionStatusOptions,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import useOnChange from "logic/hooks/useOnChange";
import signalRService from "logic/utils/signalRService";
import ModalAddPositionAdmin from "views/components/modal/ModalAddPositionAdmin";
import ModalEditPositionAdmin from "views/components/modal/ModalEditPositionAdmin";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MainCard from "views/components/cards/MainCard";
import { SvgIcon, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "views/components/chip/Chip";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SubCard from "views/components/cards/SubCard";
import { positionValid } from "logic/utils/validateUtils";
import { toast } from "react-toastify";
import { positionNoti } from "logic/constants/notification";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    fetchPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, page, rowsPerPage]);

  useEffect(() => {
    signalRService.on(signalRMessage.POSITION.CREATED, (message) => {
      fetchPositions();
    });
    signalRService.on(signalRMessage.POSITION.DELETED, (message) => {
      fetchPositions();
    });
    signalRService.on(signalRMessage.POSITION.UPDATED, (message) => {
      fetchPositions();
    });

    return () => {
      signalRService.off(signalRMessage.POSITION.CREATED);
      signalRService.off(signalRMessage.POSITION.DELETED);
      signalRService.off(signalRMessage.POSITION.UPDATED);
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
      toast.error(error?.response?.data);
      setIsLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const [positionModalId, setPositionModalId] = useState(0);

  const handleClickPositionModal = (id) => {
    setIsEditPositionModalOpen(true);
    setPositionModalId(id);
    setOpen(null);
  };

  // Popover
  const [open, setOpen] = useState(null); // use for AnchorEl
  const [selected, setSelected] = useState(0);

  const handleOpenMenu = (event, item) => {
    setOpen(event.currentTarget);
    setSelected(item);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const theme = useTheme();

  const handleAddNewPosition = async (values) => {
    const valid = positionValid(values);
    setError(valid)
    if (Object.keys(valid).length === 0) {
      try {
        setIsSubmitLoading(true);
        await axiosPrivate.post(positionPath.CREATE_POSITION, values);
        setIsSubmitLoading(false);
        setIsAddPositionModalOpen(false);
        toast.success(positionNoti.SUCCESS.CREATE);
      } catch (error) {
        setIsSubmitLoading(false);
        toast.error(positionNoti.ERROR.CREATE);
      }
    };
    setIsSubmitLoading(false);
  };

  const handleUpdatePosition = async (values) => {
    const valid = positionValid(values);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        setIsSubmitLoading(true);
        await axiosPrivate.put(positionPath.UPDATE_POSITION + values.id, {
          name: values.name,
          status: values.status,
        });
        setIsSubmitLoading(false);
        setIsEditPositionModalOpen(false);
        toast.success(positionNoti.SUCCESS.UPDATE);
      } catch (error) {
        setIsSubmitLoading(false);
        toast.error(positionNoti.ERROR.UPDATE);
      }
    }
    setIsSubmitLoading(false);
  };

  const handleClickDeletePosition = async (item) => {
    try {
      await axiosPrivate.put(positionPath.DELETE_POSITION + item.id);
      setIsModalDeleteOpen(false);
      toast.success(positionNoti.SUCCESS.DELETE);
    } catch (e) {
      toast.error(e?.response?.data);
    }
  };

  const handleClickActivePosition = async (item) => {
    try {
      await axiosPrivate.put(positionPath.ACTIVE_POSITION + item.id);
      setOpen(false);
      toast.success(positionNoti.SUCCESS.ACTIVE);
    } catch (error) {
      toast.error(positionNoti.ERROR.ACTIVE);
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
      title={`Vị trí`}
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
      {/* Modal and Popover */}
      {isEditPositionModalOpen ?
        <ModalEditPositionAdmin
          isOpen={isEditPositionModalOpen}
          onRequestClose={() => setIsEditPositionModalOpen(false)}
          positionIdClicked={positionModalId}
          isSubmitLoading={isSubmitLoading}
          handleUpdatePosition={handleUpdatePosition}
          error={error}
        ></ModalEditPositionAdmin>
        : null}
      {isAddPositionModalOpen ?
        <ModalAddPositionAdmin
          onRequestClose={() => setIsAddPositionModalOpen(false)}
          isSubmitLoading={isSubmitLoading}
          handleAddNewPosition={handleAddNewPosition}
          error={error}
        ></ModalAddPositionAdmin>
        : null}
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
            <h2 className="font-bold text-[25px]">Vô hiệu hóa kỹ năng</h2>

            <div className="text-text1 text-base flex justify-center my-auto h-24 items-center">
              Bạn có chắc muốn vô hiệu hóa kỹ năng &nbsp;
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
              onClick={() => handleClickDeletePosition(selected)}
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
        <MenuItem onClick={() => handleClickPositionModal(selected.id)}>
          <ModeEditOutlineIcon sx={{ mr: 2 }} />
          Sửa
        </MenuItem>
        {selected.status === 2 ? (
          <MenuItem onClick={() => handleOpenDeleteModal(selected)}>
            <DeleteIcon sx={{ mr: 2, color: theme.palette.error.main }} />
            <span style={{ color: theme.palette.error.main }}>Xóa</span>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleClickActivePosition(selected)}>
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
        </div>

        <TableContainer sx={{ width: 1, mt: 2, mb: -2, borderRadius: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell width={"30%"}>Vị trí</StyledTableCell>
                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                <StyledTableCell align="right" width={"10%"}></StyledTableCell>
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
                    <TableCell width={"10%"}>
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
                    <TableCell width={"10%"}>
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
                    <TableCell width={"10%"}>
                      <Skeleton animation="wave" />
                    </TableCell>
                  </TableRow>
                </>
              ) : positions.length !== 0 ? (
                positions.map((item) => (
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
                          positionStatusOptions.find(
                            (label) => label.value === item.status
                          ).label
                        }
                      </Chip>
                    </TableCell>
                    <TableCell align="right" width={"10%"}>
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
      </SubCard>
    </MainCard>
  );
};

export default PositionListPage;
