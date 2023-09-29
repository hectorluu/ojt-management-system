import Gap from "views/components/common/Gap";
import React, { useEffect, useState } from "react";
import { Card, SvgIcon, Button, Skeleton } from "@mui/material";
import { ojtBatchPath } from "logic/api/apiUrl";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import MainCard from "views/components/cards/MainCard";
import { Link } from "react-router-dom";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { evaluationOptions, evaluationStatus } from "logic/constants/global";
import Chip from "views/components/chip/Chip";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const OJTEvaluationPage = () => {
  const [ojtBatch, setOjtBatch] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    fetchOJTBatchs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOJTBatchs = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching data
      const response = await axiosPrivate.get(ojtBatchPath.GET_TRAINER_BATCHES);
      setOjtBatch(response.data);
    } catch (error) {
      toast.error(error?.response?.data);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  return (
    <MainCard title="Chấm điểm đợt thực tập">
      <Gap></Gap>
      {isLoading ? (
        <>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={100}
            animation="wave"
          />
          <Gap></Gap>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={100}
            animation="wave"
          />
          <Gap></Gap>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={100}
            animation="wave"
          />
        </>
      ) : ojtBatch.length > 0 ? (
        ojtBatch.map((item) => (
          <Card
            sx={{ display: "flex" }}
            className="rounded-2xl border-0 py-3 pb-1 mb-5"
            key={item.id}
          >
            <div className="flex items-center space-x-96 gap-x-6 ml-5 w-full">
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="text-[22px] font-semibold">
                    {item.name}
                    <Chip
                      color={
                        item.status === evaluationStatus.NOTYET
                          ? "error"
                          : "success"
                      }
                      sx={{ marginLeft: "22px", mb: 1 }}
                      startIcon={
                        item.status === evaluationStatus.NOTYET ? (
                          <CloseIcon />
                        ) : (
                          <DoneIcon />
                        )
                      }
                    >
                      {item.status === evaluationStatus.NOTYET
                        ? "Chưa chấm"
                        : "Đã chấm"}
                    </Chip>
                  </span>
                </div>
                <p className="mb-2 text-sm text-text2">
                  <span className="text-base font-semibold">Trường: </span>
                  {item.universityName} - {item.universityCode}
                </p>
                <p className="mb-2 text-sm text-text2">
                  <span className="text-base font-semibold">Số thực tập sinh: </span>
                  {item.numberTrainee}
                </p>
                <p className="mb-2 text-sm text-text2">
                  <span className="text-base font-semibold">
                    Thời gian thực tập:{" "}
                  </span>
                  {item.startTime} - {item.endTime}
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
                  to={
                    "/trainees-evaluate-excel/" +
                    item.id +
                    `/${
                      item.status === evaluationStatus.NOTYET
                        ? evaluationOptions.CREATE
                        : evaluationOptions.EDIT
                    }/` +
                    item.templatedId
                  }
                  variant="contained"
                  size="medium"
                  sx={{ borderRadius: "10px" }}
                  color={
                    item.status === evaluationStatus.NOTYET
                      ? "error"
                      : "success"
                  }
                >
                  {item.status === evaluationStatus.NOTYET
                    ? "Chấm điểm"
                    : "Sửa điểm"}
                </Button>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <>Không có khóa thực tập nào cần chấm điểm</>
      )}
    </MainCard>
  );
};

export default OJTEvaluationPage;
