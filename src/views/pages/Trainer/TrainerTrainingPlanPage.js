import React from "react";
import { SvgIcon, Table, TableContainer, Button } from "@mui/material";
import MainCard from "views/components/cards/MainCard";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const TrainerTrainingPlanPage = () => {
  return (
    <MainCard
      title="Kế hoạch đào tạo"
      secondary={
        <Button
          startIcon={
            <SvgIcon fontSize="small">
              <AddIcon />
            </SvgIcon>
          }
          component={Link}
          to="/create-new-training-plan"
          variant="contained"
          size="medium"
          sx={{ borderRadius: "10px" }}
        >
          Thêm mới
        </Button>
      }
    >
      <TableContainer>
        <Table></Table>
      </TableContainer>
    </MainCard>
  );
};

export default TrainerTrainingPlanPage;
