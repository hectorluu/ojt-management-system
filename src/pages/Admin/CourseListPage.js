import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import AdminAccountGrid from "modules/account/AdminAccountGrid";
import React, { Fragment, useEffect, useState } from "react";

const CourseListPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosPrivate.get("/api/userPageIndex=1&PageSize=10");
        setCourses(response.data);
        console.log("fetchUsers ~ response", response);
      } catch (error) {
        console.log("fetchUsers ~ error", error);
      }
    }
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Heading className="text-3xl">Account List</Heading>
      <Gap></Gap>
      <AdminAccountGrid>
        <table className="w-[80rem]">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Name
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Email
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Permission
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((item) => (
              <tr key={item.id}>
                <td className="bg-white text text-black">{item.name}</td>
                <td className="bg-gray-50 text-black">{item.email}</td>
                <td className="bg-white text-black">{item.permissions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminAccountGrid>
    </Fragment>
  );
};

export default CourseListPage;
