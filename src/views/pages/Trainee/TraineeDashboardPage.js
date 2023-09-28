import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  Unstable_Grid2 as Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SkillChart from "views/components/chart/SkillChart";
import { certificatePath, chartPath, traineeTaskPath } from "logic/api/apiUrl";
import { processSkillChart } from "logic/utils/chartUtils";
import { toast } from "react-toastify";
import ChartSkeleton from "views/modules/ChartSkeleton";
import DvrIcon from "@mui/icons-material/Dvr";
import ApprovalIcon from "@mui/icons-material/Approval";
import classNames from "logic/utils/classNames";
import { trelloTaskStatus } from "logic/constants/global";

const TraineeDashboardPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const theme = useTheme();
  const [skillChartData, setSkillChartData] = useState({ label: [], init: [], current: [] });
  const [totalCourse, setTotalCourse] = useState(0);
  const [toalTask, setTotalTask] = useState(0);
  const [trelloTaskList, setTrelloTaskList] = useState([]);
  const moment = require('moment-timezone');

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchTrelloTask();
    fetchTotalCourse();
    fetchTotalTask();
    fetchSkillChart();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSkillChart = async () => {
    try {
      const response = await axiosPrivate.get(
        chartPath.GET_TRAINEE_WITH_TOP_SKILL
      );
      setSkillChartData(processSkillChart(response.data));
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const fetchTotalCourse = async () => {
    try {
      let response = await axiosPrivate.get(
        certificatePath.GET_CERTIFICATE_LIST +
        "?PageIndex=" +
        1 +
        "&PageSize=" +
        0 +
        "&status=" +
        4
      );;
      setTotalCourse(response.data.totalItem);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const fetchTotalTask = async () => {
    try {
      const response = await axiosPrivate.get(
        traineeTaskPath.GET_ACCOMPLISHED_TASK_LIST +
        "?PageIndex=" +
        1 +
        "&PageSize=" +
        0 +
        "&status=" +
        2
      );
      setTotalTask(response.data.totalItem);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const fetchTrelloTask = async () => {
    try {
      const response = await axiosPrivate.get(traineeTaskPath.GET__TRELLO_TASK_LIST + "?PageIndex=" + 1 + "&PageSize=" + 6);
      console.log(response.data.data);
      setTrelloTaskList(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        {/* Card Part */}

        <Grid xs={6} lg={6}>
          <Card className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl" onClick={() => navigate("/trainee-task-list")}>
            <CardContent>
              <div className="flex items-center justify-between">
                <Typography
                  variant="subtitle1"
                  className="font-bold text-indigo-600"
                >
                  Công việc hoàn thành
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
                      {toalTask}
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={6} lg={6}>
          <Card className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl" onClick={() => navigate("/trainee-certificate")}>
            <CardContent>
              <div className="flex items-center justify-between">
                <Typography
                  variant="subtitle1"
                  className="font-bold text-sm text-green-600"
                >
                  Khóa học hoàn thành
                </Typography>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <DvrIcon />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <Typography
                      variant="h6"
                      className="text-2xl 2xl:text-3xl font-bold"
                    >
                      {totalCourse}
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Training Plan Table Part  & Skill Chart */}

      {/* Activity Part and User Part */}
      <Grid container sx={{ mt: -3 }} spacing={3}>
        <Grid xs={8} lg={8}>
          <Paper className="flex-1 bg-white rounded-lg shadow-xl mt-10 px-6 py-3">
            <Typography
              variant="h4"
              className="text-xl text-gray-900 font-bold mt-2"
            >
              Nhật ký công việc
            </Typography>
            <div className="relative px-4">
              {trelloTaskList.length !== 0 ?
                trelloTaskList.map((task, index) => (
                  <div className="flex items-center w-full my-6 -ml-1.5">
                    <div className="w-1/12 z-10">
                      <div className={classNames("w-3.5 h-3.5 rounded-full", trelloTaskStatus.find((item) => item.value === task.status).color)}></div>
                    </div>
                    <div className="w-11/12">
                      <Typography variant="body1" className="text-sm truncate">
                        {task.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        className="text-xs text-gray-500"
                      >
                        {moment(task.endTime).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY h:mmA')}
                      </Typography>
                    </div>
                  </div>
                ))
                : <>Không có công việc nào</>}
            </div>
          </Paper>
        </Grid>
        <Grid xs={4} md={4} lg={4} sx={{ mt: 5 }}>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <SkillChart
              title="Thông tin kỹ năng"
              chartLabels={skillChartData.label}
              chartData={[
                {
                  name: "Ban đầu",
                  data: skillChartData.init,
                },
                {
                  name: "Hiện tại",
                  data: skillChartData.current,
                },
              ]}
              chartColors={[...Array(6)].map(
                () => theme.palette.text.secondary
              )}
              sx={{ px: -5 }}
            />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default TraineeDashboardPage;
