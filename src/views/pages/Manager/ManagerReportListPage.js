import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import React, { Fragment, useEffect, useState } from "react";
import { Card } from "@mui/material";
import { Button } from "views/components/button";
import { ojtBatchPath, reportPath } from "logic/api/apiUrl";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";

const ManagerReportListPage = () => {
  const [reports, setReports] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    async function fetchReports() {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        const response = await axiosPrivate.get(reportPath.GET_LIST_REPORT);
        setReports(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    }
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          Thêm file báo cáo mới
        </Button>
      </div>
      <Gap></Gap>
    </Fragment>
  );
};

export default ManagerReportListPage;
