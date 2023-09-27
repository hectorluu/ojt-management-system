import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { userPath } from "logic/api/apiUrl";
import { defaultUserIcon, genderOptions } from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { fDate } from "logic/utils/formatTime";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProfileSkeleton from "views/modules/account/ProfileSkeleton";
import PerfectScrollbar from "react-perfect-scrollbar";

const ModalTraineeDetailManager = ({
  onRequestClose,
  traineeSelected,
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState();

  useEffect(() => {
    if (traineeSelected) {
      fetchUserDetails();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traineeSelected]);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(userPath.GET_TRAINEE_BY_ID + traineeSelected?.id);
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data);
    }
  };

  return (
    <Modal open={true} onClose={onRequestClose}>
      <Box
        sx={{
          borderRadius: "0.5rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: 650,
          width: 700,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <button
          className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-1 top-1 text-text1"
          onClick={onRequestClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <PerfectScrollbar
          style={{
            height: "100%",
            maxHeight: "calc(100vh - 100px)",
            overflowX: "hidden",
          }}
        >
          {isLoading ?
            <ProfileSkeleton /> :
            <>
              <div className="w-full h-[100px] bg-gray-500 rounded mt-4"></div>
              <div className="flex flex-col items-center -mt-20">
                <Avatar
                  src={user?.avatarURL || defaultUserIcon}
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
                    {user?.firstName + " " + user?.lastName}
                  </Typography>
                </div>
              </div>
              <h4 className="text-xl text-gray-900 font-bold text-left ml-2 mt-5">
                Thông tin cá nhân
              </h4>
              <List className="mt-2 text-gray-700">
                <ListItem className="flex border-y py-2">
                  <Typography className="font-bold w-24">Họ và tên:</Typography>
                  <ListItemText
                    primary={
                      user?.firstName + " " + user?.lastName
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem className="flex border-b py-2">
                  <Typography className="font-bold w-24">Email:</Typography>
                  <ListItemText primary={user?.email} />
                </ListItem>
                <Divider />
                <ListItem className="flex border-b py-2">
                  <Typography className="font-bold w-24">Số ĐT:</Typography>
                  <ListItemText primary={user?.phoneNumber} />
                </ListItem>
                <Divider />
                <ListItem className="flex border-b py-2">
                  <Typography className="font-bold w-24">Giới tính:</Typography>
                  <ListItemText
                    primary={
                      genderOptions.find(
                        (option) => option.value === user?.gender
                      )?.label
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem className="flex border-b py-2">
                  <Typography className="font-bold w-24">Địa chỉ:</Typography>
                  <ListItemText primary={user?.address} />
                </ListItem>
                <Divider />
                <ListItem className="flex border-b py-2">
                  <Typography className="font-bold w-24">Ngày sinh:</Typography>
                  <ListItemText primary={fDate(user?.birthday)} />
                </ListItem>
                <Divider />
                <ListItem className="flex border-b py-2">
                  <Typography className="font-bold w-24">Vị trí:</Typography>
                  <ListItemText primary={user?.positionName} />
                </ListItem>
                <ListItem className="flex border-b py-2">
                  <Typography className="font-bold w-24">Quản lí bởi:</Typography>
                  <ListItemText primary={user?.trainerName} />
                  <ListItemText primary={user?.trainerEmail} />
                </ListItem>
              </List>

              <h4 className="text-xl text-gray-900 font-bold text-left ml-2 mt-5">
                Thông tin kỹ năng
              </h4>
              <List className="mt-2 text-gray-700">
                {user?.skills?.length > 0 ?
                  (
                    user?.skills?.map((item, index) => (
                      <Stack key={index}
                        direction="row" spacing={2}
                      >
                        <Typography variant="h3" color="text.secondary" sx={{ mb: 2 }}>{item.name}</Typography>
                        <Rating name="read-only" value={item.currentLevel} readOnly />
                      </Stack>
                    )))
                  :
                  <Typography className="font-medium  w-full text-lg">
                    &nbsp; Thực tập sinh này không có kỹ năng nào.
                  </Typography>}
              </List>
            </>}
        </PerfectScrollbar>
      </Box>
    </Modal >
  );
};

export default ModalTraineeDetailManager;
