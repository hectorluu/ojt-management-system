import React from "react";
import MainCard from "views/components/cards/MainCard";
import { Button, SvgIcon } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const ListFormulaPage = () => {
  return (
    <MainCard
      title="Danh sách công thức tính điểm"
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          to="/define-formula"
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Tạo công thức tính điểm mới
        </Button>
      }
    ></MainCard>
  );
};

export default ListFormulaPage;
