import Heading from "views/components/common/Heading";
import { Fragment, useEffect, useState } from "react";
import { Button } from "views/components/button";
import { universityPath } from "logic/api/apiUrl";
import { defaultPageIndex, defaultPageSize } from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const UniversityListPage = () => {
  const [page] = useState(defaultPageIndex);
  const [rowsPerPage] = useState(defaultPageSize);
  const axiosPrivate = useAxiosPrivate();
  const [universities, setUniversities] = useState([]);

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
    } catch (error) {
      console.log("fetchUsers ~ error", error);
    }
  };

  useEffect(() => {
    fetchUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

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
          href="/create-new-university"
          kind="secondary"
        >
          Thêm trường đại học mới
        </Button>
      </div>
      <div className="pt-[66px]">
        <div className="w-full max-w-[1000px] mx-auto text-center">
          <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] space-x-10">
            {universities.map((university) => (
              <div className="bg-white shadow-1 flex flex-col justify-center items-center pt-[35px] px-6 pb-6 rounded-2xl w-full h-96">
                <img
                  src={university.imgURL}
                  alt=""
                  className="mb-5 w-full h-full max-h-40 object-contain"
                />
                <div className="max-h-1/2 mt-2">
                  <h1 className="decoration-solid font-medium text-2xl">
                    {university.name}
                  </h1>
                  <p className="mb-6 mt-3 text-sm text-text3">
                    {university.address}
                  </p>
                </div>
                <Button
                  className="w-full bg-opacity-20 text-secondary bg-violet-500 hover:bg-violet-300"
                  onClick={() => {
                    navigate("/batch-list/" + university.id);
                  }}
                >
                  Chọn
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UniversityListPage;
