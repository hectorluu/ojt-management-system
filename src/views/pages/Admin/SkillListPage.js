import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import {
  Card,
  IconButton,
  InputAdornment,
  MenuItem,
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
import { skillPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  skillStatusOptions,
  signalRMessage,
} from "logic/constants/global";
import TablePagination from "@mui/material/TablePagination";
import ModalSkillDetailAdmin from "views/components/modal/ModalSkillDetailAdmin";
import useOnChange from "logic/hooks/useOnChange";
import ModalAddSkillAdmin from "views/components/modal/ModalAddSkillAdmin";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import MainCard from "views/components/cards/MainCard";
import { SvgIcon, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "views/components/chip/Chip";
import StyledTableCell from "views/modules/table/StyledTableCell";
import SubCard from "views/components/cards/SubCard";
import signalRService from "logic/utils/signalRService";
import { toast } from "react-toastify";
import { skillNoti } from "logic/constants/notification";
import { skillValid } from "logic/utils/validateUtils";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SkillListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isSkillDetailModalOpen, setIsSkillDetailModalOpen] = useState(false);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, rowsPerPage, page]);

  useEffect(() => {
    signalRService.on(signalRMessage.SKILL.CREATED, (message) => {
      fetchSkills();
    });
    signalRService.on(signalRMessage.SKILL.DELETED, (message) => {
      fetchSkills();
    });
    signalRService.on(signalRMessage.SKILL.UPDATED, (message) => {
      fetchSkills();
    });

    return () => {
      signalRService.off(signalRMessage.SKILL.CREATED);
      signalRService.off(signalRMessage.SKILL.DELETED);
      signalRService.off(signalRMessage.SKILL.UPDATED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchSkills() {
    try {
      const response = await axiosPrivate.get(
        skillPath.GET_SKILL_LIST +
          "?PageIndex=" +
          page +
          "&PageSize=" +
          rowsPerPage +
          "&searchTerm=" +
          `${searchTerm === null ? "" : searchTerm}`
      );
      setSkills(response.data.data);
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

  const [skillModalId, setSkillModalId] = useState(0);

  const handleClickSkillModal = (id) => {
    setIsSkillDetailModalOpen(true);
    setSkillModalId(id);
    setOpen(null);
  };

  // Popover
  const [open, setOpen] = useState(null); // use for AnchorEl
  const [selected, setSeclected] = useState(0);

  const handleOpenMenu = (event, item) => {
    setOpen(event.currentTarget);
    setSeclected(item);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const theme = useTheme();

  const handleAddNewSkill = async (values) => {
    const valid = skillValid(values);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        setIsSubmitLoading(true);
        await axiosPrivate.post(skillPath.CREATE_SKILL, values);
        setIsSubmitLoading(false);
        setIsAddSkillModalOpen(false);
        toast.success(skillNoti.SUCCESS.CREATE);
      } catch (error) {
        setIsSubmitLoading(false);
        toast.error(skillNoti.ERROR.CREATE);
      }
    }
    setIsSubmitLoading(false);
  };

  const handleUpdateSkill = async (values) => {
    const valid = skillValid(values);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        setIsSubmitLoading(true);
        await axiosPrivate.put(skillPath.UPDATE_SKILL + values.id, {
          name: values.name,
          status: values.status,
        });
        setIsSubmitLoading(false);
        setIsSkillDetailModalOpen(false);
        toast.success(skillNoti.SUCCESS.UPDATE);
      } catch (error) {
        setIsSubmitLoading(false);
        toast.error(skillNoti.ERROR.UPDATE);
      }
    }
    setIsSubmitLoading(false);
  };

  const handleClickDeleteSkill = async (id) => {
    try {
      await axiosPrivate.delete(skillPath.DELETE_SKILL + id);
      setOpen(null);
      fetchSkills();
      toast.success(skillNoti.SUCCESS.DELETE);
    } catch (e) {
      toast.error(e.response.data);
    }
  };

  const handleClickActiveSkill = async (item) => {
    try {
      await axiosPrivate.put(skillPath.UPDATE_SKILL + item.id, {
        name: item.name,
        status: 2,
      });
      setOpen(null);
      fetchSkills();
      toast.success(skillNoti.SUCCESS.ACTIVE);
    } catch (error) {
      toast.error(skillNoti.ERROR.UPDATE);
    }
  };

  return (
    <MainCard
      title={`Kỹ năng`}
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          onClick={() => setIsAddSkillModalOpen(true)}
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Thêm kỹ năng
        </Button>
      }
    >
      {/* Modal and Popover */}
      <ModalSkillDetailAdmin
        isOpen={isSkillDetailModalOpen}
        onRequestClose={() => setIsSkillDetailModalOpen(false)}
        skillIdClicked={skillModalId}
        handleUpdateSkill={handleUpdateSkill}
        isSubmitLoading={isSubmitLoading}
        error={error}
      ></ModalSkillDetailAdmin>
      <ModalAddSkillAdmin
        isOpen={isAddSkillModalOpen}
        onRequestClose={() => setIsAddSkillModalOpen(false)}
        isLoading={isSubmitLoading}
        handleAddNewSkill={handleAddNewSkill}
        error={error}
      ></ModalAddSkillAdmin>

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
        <MenuItem onClick={() => handleClickSkillModal(selected)}>
          <ModeEditOutlineIcon sx={{ mr: 2 }} />
          Sửa
        </MenuItem>
        {selected.status === 2 ? (
          <MenuItem onClick={() => handleClickDeleteSkill(selected)}>
            <DeleteIcon sx={{ mr: 2, color: theme.palette.error.main }} />
            <span style={{ color: theme.palette.error.main }}>Xóa</span>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleClickActiveSkill(selected)}>
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
                <StyledTableCell width={"30%"}>Kỹ năng</StyledTableCell>
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
              ) : skills.length !== 0 ? (
                skills.map((item) => (
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
                          skillStatusOptions.find(
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
                    Không có kỹ năng nào được tìm thấy.
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

export default SkillListPage;
