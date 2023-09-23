import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import { defaultUserIcon, genderOptions } from "logic/constants/global";
import { fDate } from "logic/utils/formatTime";
import React from "react";

const ModalTraineeDetailManager = ({
  isOpen,
  onRequestClose,
  traineeSelected,
}) => {
  const theme = useTheme();

  return (
    <Modal open={isOpen} onClose={onRequestClose}>
      <Box
        sx={{
          borderRadius: "0.5rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
        <div className="w-full h-[100px] bg-gray-500 rounded mt-4"></div>
        <div className="flex flex-col items-center -mt-20">
          <Avatar
            src={traineeSelected?.avatarURL || defaultUserIcon}
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
              {traineeSelected?.firstName + " " + traineeSelected?.lastName}
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
                traineeSelected?.firstName + " " + traineeSelected?.lastName
              }
            />
          </ListItem>
          <Divider />
          <ListItem className="flex border-b py-2">
            <Typography className="font-bold w-24">Email:</Typography>
            <ListItemText primary={traineeSelected?.email} />
          </ListItem>
          <Divider />
          <ListItem className="flex border-b py-2">
            <Typography className="font-bold w-24">Số ĐT:</Typography>
            <ListItemText primary={traineeSelected?.phoneNumber} />
          </ListItem>
          <Divider />
          <ListItem className="flex border-b py-2">
            <Typography className="font-bold w-24">Giới tính:</Typography>
            <ListItemText
              primary={
                genderOptions.find(
                  (option) => option.value === traineeSelected?.gender
                )?.label
              }
            />
          </ListItem>
          <Divider />
          <ListItem className="flex border-b py-2">
            <Typography className="font-bold w-24">Địa chỉ:</Typography>
            <ListItemText primary={traineeSelected?.address} />
          </ListItem>
          <Divider />
          <ListItem className="flex border-b py-2">
            <Typography className="font-bold w-24">Ngày sinh:</Typography>
            <ListItemText primary={fDate(traineeSelected?.birthday)} />
          </ListItem>
          <Divider />
          <ListItem className="flex border-b py-2">
            <Typography className="font-bold w-24">Vị trí:</Typography>
            <ListItemText primary={traineeSelected?.positionName} />
          </ListItem>
        </List>
      </Box>
    </Modal>
  );
};

export default ModalTraineeDetailManager;
