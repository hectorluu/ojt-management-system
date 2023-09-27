import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
} from "@mui/material";
import MainCard from "views/components/cards/MainCard";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { certificatePath, chartPath, trainerTaskPath, userPath } from "logic/api/apiUrl";
import { defaultUserIcon, genderOptions } from "logic/constants/global";
import { fDate, fDateTime } from "logic/utils/formatTime";
import { useParams } from "react-router-dom";
import ProfileSkeleton from "views/modules/account/ProfileSkeleton";
import { toast } from "react-toastify";
import SkillChart from "views/components/chart/SkillChart";
import { processSkillChart } from "logic/utils/chartUtils";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DvrIcon from "@mui/icons-material/Dvr";

const TraineeDetailPage = () => {
  const { traineeId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [trainee, setTrainee] = useState([]);
  const [traineeTask, setTraineeTask] = useState([]);
  const [certList, setCertList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skillChartData, setSkillChartData] = useState({ label: [], init: [], current: [] });
  const [totalCourse, setTotalCourse] = useState(0);
  const [totalTask, setTotalTask] = useState(0);
  useEffect(() => {
    fetchSkillChart();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSkillChart = async () => {
    try {
      const response = await axiosPrivate.get(chartPath.GET_TRAINEE_WITH_TOP_SKILL_TRAINEE_DETAIL + traineeId);
      setSkillChartData(processSkillChart(response.data));
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  async function fetchTraineeDetail() {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        userPath.GET_TRAINEE_BY_ID + traineeId
      );
      setTrainee(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  }

  async function fetchTraineeTask() {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        trainerTaskPath.GET_TRAINEE_LIST_TASK + traineeId + "?status=" + 2 + "&PageIndex=" + 1 + "&PageSize=" + 6
      );
      // Get 6 task
      setTraineeTask(response.data.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  }

  async function fetchTraineeCert() {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        certificatePath.GET_LIST_CERTIFICATE_OF_TRAINEE + traineeId + "?status=" + 4 + "&PageIndex=" + 1 + "&PageSize=" + 100000
      );
      setCertList(response.data.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  }

  async function fetchTotalCourse() {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        certificatePath.GET_LIST_CERTIFICATE_OF_TRAINEE + traineeId + "?PageIndex=" + 1 + "&PageSize=" + 1
      );
      setTotalCourse(response.data.totalItem);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  }

  async function fetchTotalTask() {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        trainerTaskPath.GET_TRAINEE_LIST_TASK + traineeId + "?PageIndex=" + 1 + "&PageSize=" + 1
      );
      // Get 6 task
      setTotalTask(response.data.totalItem);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTraineeDetail();
    fetchTraineeTask();
    fetchTraineeCert();
    fetchTotalCourse();
    fetchTotalTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userAvatar = trainee?.avatarURL || defaultUserIcon;
  const theme = useTheme();

  return (
    <MainCard>
      {isLoading ? <ProfileSkeleton /> :
        <>
          <div className="w-full h-[100px] bg-gray-500 rounded"></div>
          <div className="flex flex-col items-center -mt-20">
            <Avatar
              src={userAvatar}
              onError={(e) => {
                e.target.src = defaultUserIcon;
              }}
              sx={{
                ...theme.typography.mediumAvatar,
                margin: "8px 0 8px 8px !important",
                cursor: "pointer",
              }}
              className="w-32 h-32 border-4 border-white rounded-full pointer-events-none"
            />
            <div className="flex items-center space-x-2">
              <Typography variant="h3">
                {trainee.firstName + " " + trainee.lastName}
              </Typography>
            </div>
          </div>
          <h4 className="text-xl text-gray-900 font-bold text-left ml-2 mt-5">
            Thông tin cá nhân
          </h4>
          <List className="mt-2 text-gray-700">
            <ListItem className="flex border-y py-2">
              <Typography className="font-bold w-24">Họ và tên:</Typography>
              <ListItemText primary={trainee.firstName + " " + trainee.lastName} />
            </ListItem>
            <Divider />
            <ListItem className="flex border-b py-2">
              <Typography className="font-bold w-24">Email:</Typography>
              <ListItemText primary={trainee.email} />
            </ListItem>
            <Divider />
            <ListItem className="flex border-b py-2">
              <Typography className="font-bold w-24">Số ĐT:</Typography>
              <ListItemText primary={trainee.phoneNumber} />
            </ListItem>
            <Divider />
            <ListItem className="flex border-b py-2">
              <Typography className="font-bold w-24">Giới tính:</Typography>
              <ListItemText
                primary={
                  genderOptions.find((option) => option.value === trainee.gender)
                    ?.label
                }
              />
            </ListItem>
            <Divider />
            <ListItem className="flex border-b py-2">
              <Typography className="font-bold w-24">Địa chỉ:</Typography>
              <ListItemText primary={trainee.address} />
            </ListItem>
            <Divider />
            <ListItem className="flex border-b py-2">
              <Typography className="font-bold w-24">Ngày sinh:</Typography>
              <ListItemText primary={fDate(trainee.birthday)} />
            </ListItem>
            <Divider />
            <ListItem className="flex border-b py-2">
              <Typography className="font-bold w-24">Vị trí:</Typography>
              <ListItemText primary={trainee.positionName} />
            </ListItem>
          </List>

          <Grid container spacing={3} className="mt-2">
            <Grid item xs={12} lg={4}>
              <Card className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Typography
                      variant="subtitle1"
                      className="font-bold text-indigo-600"
                    >
                      Công việc đã làm
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <AssignmentTurnedInIcon />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-end">
                        <Typography
                          variant="h6"
                          className="text-2xl 2xl:text-3xl font-bold"
                        >
                          {totalTask}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Card className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Typography
                      variant="subtitle1"
                      className="font-bold text-sm text-green-600"
                    >
                      Khóa học đã tham gia
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

            <Grid item xs={12} lg={4}>
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
                chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
                sx={{ px: -5 }}
              />
            </Grid>
          </Grid>

          <Paper className="flex-1 bg-white rounded-lg shadow-xl mt-10 px-6 py-3">
            <Typography
              variant="h4"
              className="text-xl text-gray-900 font-bold mt-2"
            >
              Nhật ký công việc
            </Typography>
            <div className="relative px-4">
              {traineeTask.length !== 0 && (
                <div className="absolute h-full border border-dashed border-opacity-60 border-secondary"></div>
              )}

              {/* Timeline item */}
              {traineeTask.length > 0 &&
                traineeTask.map((task, index) => (
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
                        className="text-xs text-gray-500"
                      >
                        Thời gian hoàn thành: {fDateTime(task.finishTime)}
                      </Typography>
                    </div>
                  </div>
                ))}
              {traineeTask.length === 0 && (
                <div className="flex items-center w-full my-6">
                  <Typography variant="body1" className="text-base font-medium">
                    Thực tập sinh này chưa có nhật ký công việc.
                  </Typography>
                </div>
              )}
              {/* End Timeline item */}
            </div>
          </Paper>

          <Paper className="flex-1 bg-white rounded-lg shadow-xl mt-10 px-6 py-3">
            <Typography
              variant="h4"
              className="text-xl text-gray-900 font-bold mt-2"
            >
              Khóa học đã hoàn thành
            </Typography>
            <div className="relative px-4">
              {certList.length !== 0 && (
                <div className="absolute h-full border border-dashed border-opacity-60 border-secondary"></div>
              )}

              {/* Timeline item */}
              {certList.length > 0 &&
                certList.map((cert, index) => (
                  <div
                    className="flex items-center w-full my-6 -ml-1.5"
                    key={index}
                  >
                    <div className="w-1/12 z-10">
                      <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="w-11/12">
                      <Typography
                        variant="body1"
                        className="text-base font-semibold"
                      >
                        {cert.courseName}
                      </Typography>
                      <Typography
                        variant="caption"
                        className="text-xs text-gray-500"
                      >
                        Thời gian hoàn thành: {fDate(cert.submitDate)}
                      </Typography>
                    </div>
                  </div>
                ))}
              {certList.length === 0 && (
                <div className="flex items-center w-full my-6">
                  <Typography variant="body1" className="text-base font-medium">
                    Thực tập sinh này chưa hoàn thành khóa học nào.
                  </Typography>
                </div>
              )}
              {/* End Timeline item */}
            </div>
          </Paper>
        </>
      }
    </MainCard>
  );
};

export default TraineeDetailPage;
