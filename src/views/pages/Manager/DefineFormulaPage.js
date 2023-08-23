import Gap from "views/components/common/Gap";
import React, { Fragment, useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Paper,
  Chip,
  ListItem,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const DefineFormulaPage = () => {
  // style
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 45rem;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  // style table head
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  ///
  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const [chipData, setChipData] = useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <Fragment>
      <div className="bg-blue-100 rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text2 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Điều chỉnh công thức tính điểm
          </h1>
        </div>

        <div className="flex justify-center">
          <TableContainer sx={{ width: 0.8 }}>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Từ khóa công thức
            </Typography>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="center"
                    width={"33%"}
                  ></StyledTableCell>
                  <StyledTableCell
                    align="center"
                    width={"33%"}
                  ></StyledTableCell>
                  <StyledTableCell
                    align="center"
                    width={"33%"}
                  ></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="flex justify-center mt-5">
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              listStyle: "none",
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {chipData.map((data) => {
              return (
                <ListItem key={data.key}>
                  <Chip
                    label={data.label}
                    onClick={handleClick}
                    onDelete={handleDelete}
                  />
                </ListItem>
              );
            })}
          </Paper>
        </div>

        <div className="flex justify-center mt-5">
          <StyledTextarea
            minRows={5}
            maxRows={8}
            placeholder="Điền công thức tính"
          />
        </div>
      </div>
      <Gap></Gap>
    </Fragment>
  );
};

export default DefineFormulaPage;
