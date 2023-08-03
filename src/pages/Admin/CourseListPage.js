import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Fragment, useEffect, useState } from "react";
import { coursePath, skillPath } from "api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  positionOptions,
  defaultCourseImage,
} from "constants/global";
import CourseCardDisplay from "modules/course/CourseCardDisplay";
import { Button } from "components/button";
import CourseGrid from "modules/course/CourseGrid";
import TablePagination from "@mui/material/TablePagination";
import SearchBar from "modules/SearchBar";
import { Dropdown } from "components/dropdown";
import useOnChange from "hooks/useOnChange";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";

const CourseListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [totalItem, setTotalItem] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [position, setPosition] = useState(0);
  const [skill, setSkill] = useState(0);
  const [skillList, setSkillList] = useState([]);
  const [positionFiltered, setPositionFiltered] = useState([]);
  const [skillFiltered, setSkillFiltered] = useState([]);

  const fetchCourses = async () => {
    try {
      let response = await axiosPrivate.get(
        coursePath.GET_COURSE_LIST +
        "?PageIndex=" +
        page +
        "&PageSize=" +
        rowsPerPage
      );
      for (let i = 0; i < response.data.data.length; i++) {
        await getDownloadURL(ref(storage, response.data.data[i].imageURL)).then((url) => {
          response.data.data[i].imageURL = url;
        }).catch((e) => {
          response.data.data[i]["imageURL"] = defaultCourseImage;
        });
      }
      setCourses(response.data.data);
      setTotalItem(response.data.totalItem);
    } catch (error) {
      console.log("fetchCourses ~ error", error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await axiosPrivate.get(
        skillPath.GET_SKILL_LIST + "?PageIndex=" + 1 + "&PageSize=" + 100000
      );
      setSkillList(response.data.data);
    } catch (error) {
      console.log("fetchSkills ~ error", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, position, skill, rowsPerPage, page]);

  useEffect(() => {
    const allPosition = [
      { value: positionOptions.length + 1, label: "Tất cả" },
    ];
    const positions = positionOptions.slice();
    positions.unshift(...allPosition);
    setPositionFiltered(positions);
    const allSkill = [{ id: skillList.length + 1, name: "Tất cả" }];
    const skills = skillList.slice();
    skills.unshift(...allSkill);
    setSkillFiltered(skills);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillList]);

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

  const getSkillDropdownLabel = (
    name,
    options = [{ value: "", label: "" }],
    defaultValue = ""
  ) => {
    const value = name || defaultValue;
    const label = options.find((label) => label.id === value);
    return label ? label.name : defaultValue;
  };

  const handleSelectPositionDropdownOption = (value) => {
    setPosition(value);
  };

  const handleSelectSkillDropdownOption = (value) => {
    setSkill(value);
  };

  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">
            Danh sách các khóa học
          </Heading>
        </div>
        <Button
          className="px-7"
          type="button"
          href="/create-new-course"
          kind="secondary"
        >
          Thêm khóa học mới
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
        <div className=" max-w-[200px] w-full">
          <Dropdown>
            <Dropdown.Select
              placeholder={getSkillDropdownLabel(
                skill,
                skillFiltered,
                "Kỹ năng"
              )}
            ></Dropdown.Select>
            <Dropdown.List>
              {skillFiltered.map((ski) => (
                <Dropdown.Option
                  key={ski.id}
                  onClick={() => handleSelectSkillDropdownOption(ski.id)}
                >
                  <span className="capitalize">{ski.name}</span>
                </Dropdown.Option>
              ))}
            </Dropdown.List>
          </Dropdown>
        </div>
      </div>
      <Gap></Gap>
      <CourseGrid type="secondary">
        {courses.length !== 0 ? (
          courses.map((item) => (
            <CourseCardDisplay course={item} key={item.id} />
          ))
        ) : (
          <></>
        )}
      </CourseGrid>
      <TablePagination
        component="div"
        count={totalItem}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Fragment>
  );
};

export default CourseListPage;
