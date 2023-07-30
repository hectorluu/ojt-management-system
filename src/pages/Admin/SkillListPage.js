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
import { defaultPageSize, defaultPageIndex, positionOptions } from "constants/global";
import { Button } from "components/button";
import TablePagination from "@mui/material/TablePagination";
import ModalSkillDetailAdmin from "components/modal/ModalSkillDetailAdmin";
import SearchBar from "modules/SearchBar";
import { Dropdown } from "components/dropdown";
import useOnChange from "hooks/useOnChange";

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
        const allPosition = [{ value: positionOptions.length + 1, label: "Tất cả" }];
        const positions = positionOptions.slice();
        console.log(positionOptions);
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

  return (
    <Fragment>
      <ModalSkillDetailAdmin
        isOpen={isSkillDetailModalOpen}
        onRequestClose={() => setIsSkillDetailModalOpen(false)}
      ></ModalSkillDetailAdmin>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">Kỹ Năng</Heading>
        </div>
        <Button
          className="px-7"
          type="button"
          href="/create-new-course"
          kind="secondary"
        >
          Thêm kỹ năng
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-between	">
        <div className=" max-w-[600px] w-full">
          <SearchBar onChangeSearch={setSearchTerm}></SearchBar>
        </div>
        <div className=" max-w-[200px] w-full">
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
                  onClick={() =>
                    handleSelectPositionDropdownOption(
                      pos.value
                    )
                  }
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
              <TableCell>Tên</TableCell>
              <TableCell>Vị trí</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right" width={"10%"}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell align="right" width={"10%"}>
                  <Button
                    className=""
                    type="button"
                    kind="ghost"
                    onClick={() => setIsSkillDetailModalOpen(true)}
                  >
                    Edit
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
