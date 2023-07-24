import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import React, { Fragment } from "react";
import { Table, TableContainer } from "@mui/material";
import { Button } from "components/button";

const CourseListPage = () => {
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
      <TableContainer>
        <Table></Table>
      </TableContainer>
    </Fragment>
  );
};

export default CourseListPage;
