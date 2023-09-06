import React from "react";
import MainCard from "views/components/cards/MainCard";
import { Button, SvgIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Chip from "views/components/chip/Chip";

const AttendancePage = () => {
  return (
    <MainCard
      title="Điểm danh"
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          to="/create-new-account"
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Tải lên file điểm danh
        </Button>
      }
    ></MainCard>
  );
};

export default AttendancePage;
