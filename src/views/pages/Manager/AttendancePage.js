import Heading from "views/components/common/Heading";
import { Button } from "views/components/button";
import Gap from "views/components/common/Gap";
import React, { Fragment } from "react";

const AttendancePage = () => {
  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">Điểm danh</Heading>
        </div>

        <Button
          className="px-7"
          type="button"
          href="/create-new-account"
          kind="secondary"
        >
          Tải lên file điểm danh
        </Button>
      </div>
      <Gap></Gap>
    </Fragment>
  );
};

export default AttendancePage;
