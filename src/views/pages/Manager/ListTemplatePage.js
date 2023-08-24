import Gap from "views/components/common/Gap";
import Heading from "views/components/common/Heading";
import React, { Fragment, useEffect, useState } from "react";
import { Card, Link } from "@mui/material";
import { Button } from "views/components/button";

import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { templatePath } from "logic/api/apiUrl";

const ListTemplatePage = () => {
  const [template, setTemplate] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        const response = await axiosPrivate.get(templatePath.GET_TEMPLATE_LIST);
        setTemplate(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    }
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">
            Danh sách mẫu đánh giá
          </Heading>
        </div>
      </div>
      <Gap></Gap>

      {template.map((item) => (
        <Card
          sx={{ display: "flex" }}
          className="rounded-2xl border-0 py-3 pb-1"
        >
          <div className="flex items-center space-x-96 gap-x-6 ml-5 w-full">
            <div className="flex-1">
              <h1 className="text-[22px] font-semibold mb-2">{item.name}</h1>
              <p className="mb-2 text-sm text-text2">
                Tên trường đại học: {item.id}
              </p>
              <p className="mb-2 text-sm text-text2">
                URL: <Link underline="always">{item.url}</Link>
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

export default ListTemplatePage;
