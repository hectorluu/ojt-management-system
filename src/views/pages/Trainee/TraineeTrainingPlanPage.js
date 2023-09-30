import { Typography } from "@mui/material";
import { trainingPlanPath } from "logic/api/apiUrl";
import { signalRMessage } from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { fDate, fDateTime } from "logic/utils/formatTime";
import React, { useEffect, useState } from "react";
import MainCard from "views/components/cards/MainCard";
import SubCard from "views/components/cards/SubCard";
import signalRService from "logic/utils/signalRService";

const TraineeTrainingPlanPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [trainingPlan, setTrainingPlan] = useState([]);
  const [trainingPlanDetails, setTrainingPlanDetails] = useState([]);

  useEffect(() => {
    signalRService.on(signalRMessage.TRAINING_PLAN.ASSIGN, (message) => {
      fetchTraineeTrainingPlan();
    });
    signalRService.on(signalRMessage.TRAINING_PLAN.UPDATE, (message) => {
      fetchTraineeTrainingPlan();
    });
    return () => {
      signalRService.off(signalRMessage.TRAINING_PLAN.ASSIGN);
      signalRService.off(signalRMessage.TRAINING_PLAN.UPDATE);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchTraineeTrainingPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchTraineeTrainingPlan() {
    try {
      const response = await axiosPrivate.get(
        trainingPlanPath.GET_PERSONAL_TRAINING_PLAN
      );

      setTrainingPlan(response.data);
      setTrainingPlanDetails(response.data.details);
    } catch (error) {}
  }

  return (
    <MainCard title="Kế hoạch đào tạo">
      {/*Training plan timeline*/}
      <SubCard sx={{ minHeight: "10rem" }}>
        {trainingPlanDetails.length !== 0 && (
          <div className="p-5">
            <Typography
              variant="h4"
              className="text-2xl text-gray-900 font-bold mt-2 mb-4"
            >
              {trainingPlan.name}
            </Typography>
          </div>
        )}
        <div className="relative px-4">
          {trainingPlanDetails.length > 0 && (
            <div className="absolute h-full border border-dashed border-opacity-60 border-secondary"></div>
          )}

          {/* Timeline item */}
          {trainingPlanDetails.length !== 0 ? (
            trainingPlanDetails.map((task, index) => (
              <div
                className="flex items-center w-full my-6 -ml-1.5"
                key={index}
              >
                <div className="w-1/12 z-10">
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div className="w-11/12">
                  <Typography variant="body1" className="text-sm">
                    {task.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="text-xs text-gray-700"
                  >
                    Mô tả: {task.description}
                  </Typography>
                  <br />
                  <Typography
                    variant="caption"
                    className="text-xs text-gray-700"
                  >
                    Thời hạn:{" "}
                    {fDateTime(task.startTime) +
                      "  -  " +
                      fDateTime(task.endTime)}
                  </Typography>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center w-full my-6">
              <Typography variant="body1" className="text-base font-medium">
                Thực tập sinh này chưa có kế hoạch thực tập.
              </Typography>
            </div>
          )}
          {/* End Timeline item  */}
        </div>
      </SubCard>
    </MainCard>
  );
};

export default TraineeTrainingPlanPage;
