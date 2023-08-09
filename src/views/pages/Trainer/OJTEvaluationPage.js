import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import React, { Fragment } from "react";
import { Table, TableContainer } from "@mui/material";
import { Button } from "views/components/button";

const OJTEvaluationPage = () => {
  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">
            Đánh giá thực tập sinh
          </Heading>
        </div>

        <Button
          className="px-7"
          type="button"
          href="/create-new-training-plan"
          kind="secondary"
        >
          Tạo đánh giá mới
        </Button>
      </div>
      <Gap></Gap>
      <TableContainer>
        <Table></Table>
      </TableContainer>
    </Fragment>
  );
};

export default OJTEvaluationPage;
