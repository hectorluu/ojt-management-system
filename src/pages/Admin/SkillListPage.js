import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { skillPath } from "api/apiUrl";
import { defaultPageSize, defaultPageIndex } from "constants/global";

const SkillListPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axiosPrivate.get(skillPath.GET_SKILL_LIST + "?" + defaultPageIndex + "&" + defaultPageSize);
        setSkills(response.data.data);
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
      <Heading className="text-3xl">Course List</Heading>
      <Gap></Gap>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default SkillListPage;
