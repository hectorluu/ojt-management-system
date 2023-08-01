import Heading from "components/common/Heading";
import { Fragment, useEffect, useState } from "react";
import { Button } from "components/button";
import { universityPath } from "api/apiUrl";
import { defaultPageIndex, defaultPageSize } from "constants/global";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useOnChange from "hooks/useOnChange";

const UniversityListPage = () => {
  const [page] = useState(defaultPageIndex);
  const [rowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [, setUniversities] = useState([]);
  const [searchTerm] = useOnChange(500);

  const fetchUniversities = async () => {
    try {
      const response = await axiosPrivate.get(
        universityPath.GET_UNIVERSITY_LIST +
          "?PageSize=" +
          rowsPerPage +
          "&PageIndex=" +
          page
      );
      setUniversities(response.data.data);
      // setSearchTerm("");
    } catch (error) {
      console.log("fetchUsers ~ error", error);
    }
  };

  useEffect(() => {
    fetchUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

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
            {/* items 1 */}
            <div className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full h-96">
              <img
                srcSet="fpt.png 2x"
                alt=""
                className="mb-5 w-full h-full max-h-40 object-contain"
              />
              <div className="max-h-1/2 mt-2">
                <h1 className="decoration-solid font-medium text-2xl">
                  Trường đại học FPT HCM
                </h1>
                <p className="mb-6 mt-3 text-sm text-text3">
                  Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức
                </p>
              </div>
              <Button className="w-full bg-opacity-20 text-secondary bg-violet-500 hover:bg-violet-300">
                Connect
              </Button>
            </div>
            {/* items 2 */}
            <div className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full h-96">
              <img
                srcSet="bachkhoa.png 2x"
                alt=""
                className="mb-5 w-full max-h-40 object-contain"
              />
              <div className="max-h-1/2 mt-2">
                <h1 className="decoration-solid font-medium text-2xl">
                  Trường đại học Bách Khoa HCM
                </h1>
                <p className="mb-6 mt-3 text-sm text-text3">
                  268 Lý Thường Kiệt, Phường 14, Quận 10, TP. HCM
                </p>
              </div>
              <Button className="w-full bg-opacity-20 text-secondary bg-violet-500 hover:bg-violet-300">
                Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UniversityListPage;
