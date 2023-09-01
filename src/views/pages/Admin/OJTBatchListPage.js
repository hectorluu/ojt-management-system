import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import React, { Fragment, useEffect, useState } from "react";
import { Card } from "@mui/material";
import { Button } from "views/components/button";
import { ojtBatchPath } from "logic/api/apiUrl";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";

const OJTBatchListPage = () => {
  const { batchId } = useParams();

  const axiosPrivate = useAxiosPrivate();
  const [ojtBatch, setOjtBatchs] = useState([]);

  const fetchOJTBatchs = async () => {
    try {
      const response = await axiosPrivate.get(
        ojtBatchPath.GET_OJT_BATCH_LIST_OF_UNIVERSITY + "/" + batchId
      );
      setOjtBatchs(response.data.data);
      console.log("fetchOJTBatchs ~ response", response);
    } catch (error) {
      console.log("fetch ~ error", error);
    }
  };

  useEffect(() => {
    fetchOJTBatchs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-center">
          <Heading className="text-[2.25rem] font-bold pt-6">
            Quản lý trường đại học
          </Heading>
        </div>
        <Button
          className="px-7"
          type="button"
          href="/create-new-ojt-batch"
          kind="secondary"
        >
          Thêm đợt thực tập mới
        </Button>
      </div>
      <Gap></Gap>

      {ojtBatch.map((item) => (
        <Card
          sx={{ display: "flex" }}
          className="rounded-2xl border-0 py-3 pb-1"
          key={item.id}
        >
          <div className="flex items-center space-x-96 gap-x-6 ml-5 w-full">
            <div className="flex-1">
              <h1 className="text-[22px] font-semibold mb-2">{item.name}</h1>
              <p className="mb-2 text-sm text-text2">University</p>
              <p className="mb-2 text-sm text-text2">
                Thời gian thực tập: {item.startTime} - {item.endTime}
              </p>
            </div>
            <div className="flex items-center justify-center text-white rounded-full w-fit bg-opacity-60">
              <Button
                className="px-7 hover:shadow-xl transition duration-500 ease-in-out mr-5"
                type="button"
                kind="secondary"
              >
                Chọn
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </Fragment>
  );
};

export default OJTBatchListPage;
