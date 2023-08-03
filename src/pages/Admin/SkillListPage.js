import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { skillPath } from "api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  positionOptions,
  skillStatus,
} from "constants/global";
import { Button } from "components/button";
import TablePagination from "@mui/material/TablePagination";
import ModalSkillDetailAdmin from "components/modal/ModalSkillDetailAdmin";
import SearchBar from "modules/SearchBar";
import { Dropdown } from "components/dropdown";
import useOnChange from "hooks/useOnChange";
import ModalAddSkillAdmin from "components/modal/ModalAddSkillAdmin";

const SkillListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [totalItem, setTotalItem] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [position, setPosition] = useState(0);
  const [positionFiltered, setPositionFiltered] = useState([]);
  const [isSkillDetailModalOpen, setIsSkillDetailModalOpen] = useState(false);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await axiosPrivate.get(
          skillPath.GET_SKILL_LIST +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage
        );
        setSkills(response.data.data);
        setTotalItem(response.data.totalItem);
        const allPosition = [
          { value: positionOptions.length + 1, label: "Tất cả" },
        ];
        const positions = positionOptions.slice();

        positions.unshift(...allPosition);
        setPositionFiltered(positions);
        // setPage(response.data.pageIndex);
      } catch (error) {
        console.log("fetchSkill ~ error", error);
      }
    }
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, position]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const getPositionDropdownLabel = (
    name,
    options = [{ value: "", label: "" }],
    defaultValue = ""
  ) => {
    const value = name || defaultValue;
    const label = options.find((label) => label.value === value);
    return label ? label.label : defaultValue;
  };

  const handleSelectPositionDropdownOption = (value) => {
    setPosition(value);
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

  return (
    <Fragment>
      <ModalSkillDetailAdmin
        isOpen={isSkillDetailModalOpen}
        onRequestClose={() => setIsSkillDetailModalOpen(false)}
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
        <div className="flex flex-wrap items-start max-w-[200px] w-full">
          <Dropdown>
            <Dropdown.Select
              placeholder={getPositionDropdownLabel(
                position,
                positionFiltered,
                "Vị trí"
              )}
            ></Dropdown.Select>
            <Dropdown.List>
              {positionFiltered.map((pos) => (
                <Dropdown.Option
                  key={pos.value}
                  onClick={() => handleSelectPositionDropdownOption(pos.value)}
                >
                  <span className="capitalize">{pos.label}</span>
                </Dropdown.Option>
              ))}
            </Dropdown.List>
          </Dropdown>
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
                      skillStatus.find((label) => label.value === item.status)
                        .label
                    }
                  </div>
                </TableCell>
                <TableCell align="right" width={"5%"}>
                  <Button
                    className=""
                    type="button"
                    kind="ghost"
                    onClick={() => setIsSkillDetailModalOpen(true)}
                  >
                    Sửa
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
