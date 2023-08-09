import Heading from "views/components/common/Heading";
import { Button } from "views/components/button";
import Gap from "views/components/common/Gap";
import React, { Fragment } from "react";

const ManagerReportListPage = () => {
  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">Báo cáo</Heading>
        </div>

        <Button
          className="px-7"
          type="button"
          href="/manager-define-new-report"
          kind="secondary"
        >
          Thêm file báo cáo
        </Button>
      </div>
      <Gap></Gap>
    </Fragment>
  );
};

export default ManagerReportListPage;
