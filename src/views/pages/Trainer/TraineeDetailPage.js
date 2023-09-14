import React, { useEffect, useState } from "react";
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  SvgIcon,
  Avatar,
  useTheme,
} from "@mui/material";
import MainCard from "views/components/cards/MainCard";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { userPath } from "logic/api/apiUrl";
import { defaultUserIcon, genderOptions } from "logic/constants/global";
import { fDate } from "logic/utils/formatTime";
import { useParams } from "react-router-dom";

const TraineeDetailPage = () => {
  const { traineeId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [trainee, setTrainee] = useState([]);

  useEffect(() => {
    async function fetchTraineeDetail() {
      try {
        const response = await axiosPrivate.get(
          userPath.GET_TRAINEE_BY_ID + traineeId
        );
        setTrainee(response.data);
      } catch (error) {}
    }
    fetchTraineeDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userAvatar = trainee?.avatarURL || defaultUserIcon;
  const theme = useTheme();

  return (
    <MainCard>
      <div className="w-full h-[140px] bg-gray-500 rounded"></div>
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
                  Công việc hoàn thành
                </Typography>
                <Typography
                  variant="caption"
                  className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default"
                >
                  7 days
                </Typography>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <SvgIcon className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600">
                    <path
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </SvgIcon>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <Typography
                      variant="h6"
                      className="text-2xl 2xl:text-3xl font-bold"
                    >
                      $8,141
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
                  Khóa học hoàn thành
                </Typography>
                <Typography
                  variant="caption"
                  className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default"
                >
                  7 days
                </Typography>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <SvgIcon className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600">
                    <path
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </SvgIcon>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <Typography
                      variant="h6"
                      className="text-2xl 2xl:text-3xl font-bold"
                    >
                      217
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
                  className="font-bold text-sm text-blue-600"
                >
                  Kỹ năng nhận thêm
                </Typography>
                <Typography
                  variant="caption"
                  className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default"
                >
                  7 days
                </Typography>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <SvgIcon className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600">
                    <path
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </SvgIcon>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-end">
                    <Typography
                      variant="h6"
                      className="text-2xl 2xl:text-3xl font-bold"
                    >
                      54
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper className="flex-1 bg-white rounded-lg shadow-xl mt-10 px-6 py-3">
        <Typography variant="h4" className="text-xl text-gray-900 font-bold">
          Nhật ký công việc
        </Typography>
        <div className="relative px-4">
          <div className="absolute h-full border border-dashed border-opacity-60 border-secondary"></div>

          {/* Timeline item */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <Typography variant="body1" className="text-sm">
                Profile information changed.
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-500">
                3 min ago
              </Typography>
            </div>
          </div>
          {/* End Timeline item */}

          {/* Timeline item */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <Typography variant="body1" className="text-sm">
                Connected with{" "}
                <Link href="#" className="text-blue-600 font-bold">
                  Colby Covington
                </Link>
                .
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-500">
                15 min ago
              </Typography>
            </div>
          </div>
          {/* End Timeline item */}

          {/* Timeline item */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <Typography variant="body1" className="text-sm">
                Invoice{" "}
                <Link href="#" className="text-blue-600 font-bold">
                  #4563
                </Link>{" "}
                was created.
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-500">
                57 min ago
              </Typography>
            </div>
          </div>
          {/* End Timeline item */}

          {/* Timeline item */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <Typography variant="body1" className="text-sm">
                Message received from{" "}
                <Link href="#" className="text-blue-600 font-bold">
                  Cecilia Hendric
                </Link>
                .
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-500">
                1 hour ago
              </Typography>
            </div>
          </div>
          {/* End Timeline item */}

          {/* Timeline item */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <Typography variant="body1" className="text-sm">
                New order received{" "}
                <Link href="#" className="text-blue-600 font-bold">
                  #OR9653
                </Link>
                .
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-500">
                2 hours ago
              </Typography>
            </div>
          </div>
          {/* End Timeline item */}

          {/* Timeline item */}
          <div className="flex items-center w-full my-6 -ml-1.5">
            <div className="w-1/12 z-10">
              <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
            </div>
            <div className="w-11/12">
              <Typography variant="body1" className="text-sm">
                Message received from{" "}
                <Link href="#" className="text-blue-600 font-bold">
                  Jane Stillman
                </Link>
                .
              </Typography>
              <Typography variant="caption" className="text-xs text-gray-500">
                2 hours ago
              </Typography>
            </div>
          </div>
          {/* End Timeline item */}
        </div>
      </Paper>
    </MainCard>
  );
};

export default TraineeDetailPage;
