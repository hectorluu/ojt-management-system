import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import React, { Fragment, useEffect, useState } from "react";
import { coursePath } from "api/apiUrl";
import { defaultPageSize, defaultPageIndex } from "constants/global";
import CourseCardDisplay from "modules/course/CourseCardDisplay";
import { Button } from "components/button";
import CourseGrid from "modules/course/CourseGrid";
import TablePagination from '@mui/material/TablePagination';

const CourseListPage = () => {
  const [page, setPage] = React.useState(defaultPageIndex);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultPageSize);
  const [totalItem, setTotalItem] = React.useState(0);
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosPrivate.get(coursePath.GET_COURSE_LIST + "?PageIndex=" + page + "&PageSize=" + rowsPerPage);
        setCourses(response.data.data);
        setTotalItem(response.data.totalItem);
        console.log("fetchUsers ~ response", courses);
      } catch (error) {
        console.log("fetchUsers ~ error", error);
      }
    }
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between	">
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
      <Gap></Gap>
      <CourseGrid type="secondary">
        {courses.length !== 0 ? (
          courses.map((item) => (
            <CourseCardDisplay course={item} key={item.id}/>
          ))
        ) : (<></>)}
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
