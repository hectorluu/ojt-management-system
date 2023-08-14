import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { skillPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  skillStatusOptions,
} from "logic/constants/global";
import { Button } from "views/components/button";
import TablePagination from "@mui/material/TablePagination";
import ModalSkillDetailAdmin from "views/components/modal/ModalSkillDetailAdmin";
import SearchBar from "views/modules/SearchBar";
import useOnChange from "logic/hooks/useOnChange";
import ModalAddSkillAdmin from "views/components/modal/ModalAddSkillAdmin";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

const SkillListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [isSkillDetailModalOpen, setIsSkillDetailModalOpen] = useState(false);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);

  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, rowsPerPage, page]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-green-500";
      default:
        return "bg-gray-500"; // You can set a default color class if needed
    }
  };

  const [skillModalId, setSkillModalId] = useState(0);

  const handleClickSkillModal = (id) => {
    setIsSkillDetailModalOpen(true);
    setSkillModalId(id);
  };

  return (
    <Fragment>
      <ModalSkillDetailAdmin
        isOpen={isSkillDetailModalOpen}
        onRequestClose={() => setIsSkillDetailModalOpen(false)}
        skillIdClicked={skillModalId}
      ></ModalSkillDetailAdmin>
      <ModalAddSkillAdmin
        isOpen={isAddSkillModalOpen}
        onRequestClose={() => setIsAddSkillModalOpen(false)}
      ></ModalAddSkillAdmin>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-[2.25rem] font-bold pt-6">
            Quản lý kỹ năng
          </Heading>
        </div>
        <Button
          className="px-7"
          type="button"
          kind="secondary"
          onClick={() => setIsAddSkillModalOpen(true)}
        >
          Thêm kỹ năng
        </Button>
      </div>
      <div className="flex flex-wrap items-start gap-5 mt-5">
        <div className=" max-w-[600px] w-full">
          <SearchBar onChangeSearch={setSearchTerm}></SearchBar>
        </div>
      </div>
      <Gap></Gap>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={"30%"}>Kỹ năng</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="right" width={"5%"}></TableCell>
              <TableCell align="right" width={"5%"}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((item) => (
              <TableRow key={item.id}>
                <TableCell width={"30%"}>{item.name}</TableCell>
                <TableCell
                  align="center"
                  className="flex items-center justify-center"
                >
                  <div
                    className={`rounded-full text-white h-7 w-32 flex items-center justify-center m-auto ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {
                      skillStatusOptions.find(
                        (label) => label.value === item.status
                      ).label
                    }
                  </div>
                </TableCell>
                <TableCell align="right" width={"5%"}>
                  <Button
                    className=""
                    type="button"
                    kind="ghost"
                    onClick={() => handleClickSkillModal(item.id)}
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
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalItem}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Fragment>
  );
};

export default SkillListPage;
