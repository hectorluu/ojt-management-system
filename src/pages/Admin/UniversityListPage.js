import Heading from "components/common/Heading";
import React, { Fragment } from "react";
import { Button } from "components/button";

const UniversityListPage = () => {
  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">Trường đại học</Heading>
        </div>
        <Button
          className="px-7"
          type="button"
          href="/create-new-account"
          kind="secondary"
        >
          Thêm trường đại học mới
        </Button>
      </div>
      <div className="pt-[66px]">
        <div className="w-full max-w-[1000px] mx-auto text-center">
          <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] space-x-10">
            <div className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full">
              <img srcSet="paypal2x.png 2x" alt="" className="mb-10" />
              <h1 className="decoration-solid font-medium text-2xl">
                Trường đại học FPT HCM
              </h1>
              <p className="mb-6 mt-3 text-sm text-text3">
                Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức,
                Thành phố Hồ Chí Minh
              </p>
              <Button className="w-full bg-secondary bg-opacity-20 text-secondary">
                Connect
              </Button>
            </div>
            {/* <div className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full">
              <img srcSet="payoneer2x.png 2x" alt="" className="mb-10" />
              <p className="mb-6 text-sm text-text3">
                Get paid worldwide your Work.
              </p>
              <Button className="w-full text-white bg-secondary">
                Connect
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UniversityListPage;
