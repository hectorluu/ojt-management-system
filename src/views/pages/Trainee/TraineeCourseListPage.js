import Gap from "views/components/common/Gap";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { coursePath, positionPath, skillPath } from "logic/api/apiUrl";
import {
  defaultPageSize,
  defaultPageIndex,
  signalRMessage,
  positionStatus,
  skillStatus,
} from "logic/constants/global";
import CourseCardDisplay from "views/modules/course/CourseCardDisplay";
import CourseGrid from "views/modules/course/CourseGrid";
import TablePagination from "@mui/material/TablePagination";
import { Dropdown } from "views/components/dropdown";
import useOnChange from "logic/hooks/useOnChange";
import signalRService from "logic/utils/signalRService";
import CourseCardSkeleton from "views/modules/course/CourseCardSkeleton";
import MainCard from "views/components/cards/MainCard";
import {
  SvgIcon,
  Button,
  Card,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import SubCard from "views/components/cards/SubCard";

const TraineeCourseListPage = () => {
  const [page, setPage] = useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [totalItem, setTotalItem] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useOnChange(500);
  const [position, setPosition] = useState("");
  const [skill, setSkill] = useState("");
  const [skillList, setSkillList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [positionFiltered, setPositionFiltered] = useState([]);
  const [skillFiltered, setSkillFiltered] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    signalRService.on(signalRMessage.COURSE, (message) => {
      fetchCourses();
    });

    return () => {
      signalRService.off(signalRMessage.COURSE);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      let response = await axiosPrivate.get(
        coursePath.GET_COURSE_LIST +
          "?PageIndex=" +
          page +
          "&PageSize=" +
          rowsPerPage +
          "&searchTerm=" +
          `${searchTerm === null ? "" : searchTerm}` +
          "&filterSkill=" +
          `${skill === null ? "" : skill}` +
          "&filterPosition=" +
          `${position === null ? "" : position}`
      );
      setCourses(response.data.data);
      setTotalItem(response.data.totalItem);
    } catch (error) {
      console.log("fetchCourses ~ error", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  const [totalCourses, setTotalCourses] = useState([]); // New state for total courses [1
  const fetchTotalCourses = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      let response = await axiosPrivate.get(
        coursePath.GET_COURSE_LIST + "?PageSize=" + 1000000
      );
      setTotalCourses(response.data.data);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await axiosPrivate.get(
        skillPath.GET_SKILL_LIST +
          "?PageIndex=" +
          1 +
          "&PageSize=" +
          100000 +
          "&filterStatus=" +
          skillStatus.ACTIVE
      );
      setSkillList(response.data.data);
    } catch (error) {
      console.log("fetchSkills ~ error", error);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await axiosPrivate.get(
        positionPath.GET_POSITION_LIST +
          "?PageIndex=" +
          1 +
          "&PageSize=" +
          100000 +
          "&filterStatus=" +
          positionStatus.ACTIVE
      );
      setPositionList(response.data.data);
    } catch (error) {
      console.log("fetchSkills ~ error", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchTotalCourses();
    fetchSkills();
    fetchPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, position, skill, rowsPerPage, page]);

  useEffect(() => {
    const allSkill = [{ id: "", name: "Tất cả" }];
    const skills = skillList.slice();
    skills.unshift(...allSkill);
    setSkillFiltered(skills);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillList]);

  useEffect(() => {
    const allPosition = [{ id: "", name: "Tất cả" }];
    const positions = positionList.slice();
    positions.unshift(...allPosition);
    setPositionFiltered(positions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionList]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const getPositionDropdownLabel = (
    name,
    options = [{ id: "", name: "" }],
    defaultValue = ""
  ) => {
    const value = name || defaultValue;
    const label = options.find((label) => label.id === value);
    return label ? label.name : defaultValue;
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
    <MainCard
      title={`Khóa học (${totalCourses.length})`}
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          to="/create-new-course"
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Thêm mới
        </Button>
      }
    >
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
                    key={pos.id}
                    onClick={() => handleSelectPositionDropdownOption(pos.id)}
                  >
                    <span className="capitalize">{pos.name}</span>
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
          {isLoading ? ( // Render skeleton loading when loading is true
            // Use the animate-pulse class for skeleton effect
            <>
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
            </>
          ) : courses.length !== 0 ? (
            courses.map((item) => (
              <CourseCardDisplay course={item} key={item.id} />
            ))
          ) : (
            <>Không có khóa học nào được tìm thấy.</>
          )}
        </CourseGrid>
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
      </SubCard>
    </MainCard>
  );
};

export default TraineeCourseListPage;
