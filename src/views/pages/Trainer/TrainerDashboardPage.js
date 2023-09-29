import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  Unstable_Grid2 as Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HorizontalLineChart from "views/components/chart/HorizontalLineChart";
import { certificatePath, chartPath, trainerPath, trainerTaskPath } from "logic/api/apiUrl";
import ChartSkeleton from "views/modules/ChartSkeleton";
import FaceIcon from "@mui/icons-material/Face";
import ApprovalIcon from "@mui/icons-material/Approval";
import classNames from "logic/utils/classNames";
import { accomplishedTaskStatusOptions } from "logic/constants/global";

const TrainerDashboardPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [totalTrainee, setTotalTrainee] = useState(0);
  const [totalCertificate, setTotalCertificate] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const moment = require('moment-timezone');

  const [isLoading, setIsLoading] = useState(true);

  // Get Trainee and Task Chart
  const [traineesWithMostTasksDone, setTraineesWithMostTasksDone] = useState(
    []
  );
  const fetchTraineesWithMostTasksDone = async () => {
    try {
      setIsLoading(true);
      // Get at most 10 trainers
      const response = await axiosPrivate.get(
        chartPath.GET_TRAINEE_WITH_TOP_TASKDONE
      );

      setTraineesWithMostTasksDone(
        response.data.map((trainee) => ({
          label: trainee.traineeName,
          value: trainee.totalApprovedTask,
        }))
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchTotalTrainee = async () => {
    try {
      setIsLoading(true);
      // Get at most 10 trainers
      const response = await axiosPrivate.get(
        trainerPath.GET_TRAINEE_LIST +
        "?PageIndex=" +
        1 +
        "&PageSize=" +
        10000000
      );

      setTotalTrainee(response.data.totalItem);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchTotalCertificate = async () => {
    try {
      setIsLoading(true);
      // Get at most 10 trainers
      const response = await axiosPrivate.get(
        certificatePath.GET_PENDING_CERTIFICATE +
        "?PageIndex=" +
        1 +
        "&PageSize=" +
        10000000
      );

      setTotalCertificate(response.data.totalItem);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const fetchAccomplishedTaskList = async () => {
    try {
      setIsLoading(true);
      // Get at most 10 trainers
      const response = await axiosPrivate.get(
        trainerTaskPath.GET_ACCOMPLISHED_TASK_LIST +
        "?PageIndex=" +
        1 +
        "&PageSize=" +
        6
      );
      console.log(response.data.data);
      setTaskList(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTraineesWithMostTasksDone();
    fetchTotalTrainee();
    fetchTotalCertificate();
    fetchAccomplishedTaskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Grid container spacing={3}>
        {/* Card Part */}
        <Grid xs={6} lg={6}>
          <Card className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl" onClick={() => navigate("/assigned-trainee-list")}>
            <CardContent>
              <div className="flex items-center justify-between">
                <Typography
                  variant="subtitle1"
                  className="font-bold text-indigo-600"
                >
                  Tổng số thực tập sinh
                </Typography>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <FaceIcon />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <Typography
                      variant="h6"
                      className="text-2xl 2xl:text-3xl font-bold"
                    >
                      {totalTrainee}
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} lg={6}>
          <Card className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl" onClick={() => navigate("/certificate-certify")}>
            <CardContent>
              <div className="flex items-center justify-between">
                <Typography
                  variant="subtitle1"
                  className="font-bold text-sm text-green-600"
                >
                  Chứng chỉ cần duyệt
                </Typography>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <ApprovalIcon />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <Typography
                      variant="h6"
                      className="text-2xl 2xl:text-3xl font-bold"
                    >
                      {totalCertificate}
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ... Line Chart Part and Pie Chart Part */}
      <Grid container sx={{ mt: 2 }} spacing={3}>
        <Grid xs={12} md={12}>
          {isLoading ? <ChartSkeleton /> :
            <HorizontalLineChart
              title="Thực tập sinh hoàn thành công việc nhiều nhất"
              chartData={traineesWithMostTasksDone}
            />
          }
        </Grid>
      </Grid>

      {/* Activity Part and User Part */}
      <Grid container xs={12} lg={12} sx={{ mt: -5 }}>
        <Paper className="flex-1 bg-white rounded-lg shadow-xl mt-10 px-6 py-3">
          <Typography
            variant="h4"
            className="text-xl text-gray-900 font-bold mt-2"
          >
            Nhật ký công việc
          </Typography>
          <div className="relative px-4">

            {taskList.length !== 0 ?
              taskList.map((task, index) => (
                <div className="flex items-center w-full my-6 -ml-1.5" key={index}>
                  <div className="w-1/12 z-10">
                    <div className={classNames("w-3.5 h-3.5 rounded-full", accomplishedTaskStatusOptions.find((item) => item.value === task.processStatus).color)}></div>
                  </div>
                  <div className="w-11/12">
                    <Typography variant="body1" className="text-sm">
                      {task.name}
                    </Typography>
                    <Typography variant="caption" className="text-xs text-gray-500">
                      {task.traineeLastName + " " + task.traineeFirstName}
                    </Typography>
                    <Typography variant="caption" className="text-xs text-gray-500">
                      {moment(task.finishTime).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY h:mmA')}
                    </Typography>
                  </div>
                </div>))
              : <>Không có công việc nào</>}
          </div>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default TrainerDashboardPage;
