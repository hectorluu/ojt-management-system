import Gap from "views/components/common/Gap";
import React, { useEffect, useState } from "react";
import { Card, SvgIcon, Button } from "@mui/material";
import { ojtBatchPath } from "logic/api/apiUrl";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import MainCard from "views/components/cards/MainCard";
import { Link } from "react-router-dom";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { evaluationOptions, evaluationStatus } from "logic/constants/global";
import Chip from "views/components/chip/Chip";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const OJTEvaluationPage = () => {
  const [ojtBatch, setOjtBatch] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    async function fetchOJTBatchs() {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        const response = await axiosPrivate.get(
          ojtBatchPath.GET_TRAINER_BATCHES
        );
        setOjtBatch(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    }
    fetchOJTBatchs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainCard
      title="Chấm điểm đợt thực tập"
    >
      <Gap></Gap>

      {ojtBatch.map((item) => (
        <Card
          sx={{ display: "flex" }}
          className="rounded-2xl border-0 py-3 pb-1"
          key={item.id}
        >
          <div className="flex items-center space-x-96 gap-x-6 ml-5 w-full">
            <div className="flex-1">
              <span className="text-[22px] font-semibold mb-2">{item.name}
                <Chip
                  color={item.status === evaluationStatus.NOTYET ? "error" : "success"}
                  sx={{ marginLeft: "22px" }}
                  startIcon={item.status === evaluationStatus.NOTYET ? <CloseIcon /> : <DoneIcon />}
                >
                  {item.status === evaluationStatus.NOTYET ? "Chưa chấm" : "Đã chấm"}
                </Chip>
              </span>
              <p className="mb-2 text-sm text-text2">Trường:{item.universityName}</p>
              <p className="mb-2 text-sm text-text2">
                Thời gian thực tập: {item.startTime} - {item.endTime}
              </p>
            </div>
            <div className="flex items-center justify-center text-white rounded-full w-fit bg-opacity-60">
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <DriveFileRenameOutlineIcon />
                  </SvgIcon>
                }
                component={Link}
                to={"/trainees-evaluate-excel/" + item.id + `/${item.status === evaluationStatus.NOTYET ? evaluationOptions.CREATE : evaluationOptions.EDIT}`}
                variant="contained"
                size="medium"
                sx={{ borderRadius: "10px" }}
                color={item.status === evaluationStatus.NOTYET ? "error" : "success"}
              >
                {item.status === evaluationStatus.NOTYET ? "Chấm điểm" : "Sửa điểm"}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </MainCard>
  );
};

export default OJTEvaluationPage;
