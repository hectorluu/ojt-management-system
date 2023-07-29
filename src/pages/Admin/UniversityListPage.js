import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import React, { Fragment, useEffect, useState } from "react";
import { Table, TableContainer } from "@mui/material";
import { Button } from "components/button";

const UniversityListPage = () => {
  const [fields, setFields] = useState([]);
  useEffect(() => {
    console.log(fields);
  })
  const handleAddField = () => {
    const newField = {
      position: "",
      isCompulsory: "",
    };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((field, i) => i !== index));
  };

  const handleChange = (e, index) => {
    const newField = fields[index];
    newField.position = e.target.name;
    newField.isCompulsory = e.target.value;
    setFields([...fields, newField]);
  };
  return (
    <Fragment>
      <div className="flex flex-wrap items-center justify-between	">
        <div className="flex items-center justify-center">
          <Heading className="text-4xl font-bold pt-6">
            Danh sách các trường đại học
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
      <Gap></Gap>
      <TableContainer>
        <Table></Table>
      </TableContainer>
      <div>
      <h1>Form</h1>
      <ul>
        {fields.map((field, index) => (
          <li key={index}>
            <input
              type="text"
              placeholder="Name"
              value={field.position}
              onChange={(e) => {handleChange(e, index); console.log(index);}}
              name="position"
            />
            <input
              type="text"
              placeholder="Value"
              value={field.isCompulsory}
              onChange={(e) => handleChange(e, index)}
              name="isCompulsory"
            />
            <button onClick={() => handleRemoveField(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddField}>Add Field</button>
    </div>
    </Fragment>
  );
};

export default UniversityListPage;
