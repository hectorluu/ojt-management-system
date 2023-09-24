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
import { userPath } from "logic/api/apiUrl";
import { defaultUserIcon, genderOptions } from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { fDate } from "logic/utils/formatTime";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toast } from "react-toastify";

const ModalTrainerDetailManager = ({
  isOpen,
  onRequestClose,
  selectedTrainer,
}) => {
  const theme = useTheme();
  const axiosPrivate = useAxiosPrivate();
  const [, setIsLoading] = useState(true); // New loading state
  const [listEmployee, setListEmployee] = useState([]);

  useEffect(() => {
    async function fetchTrainees() {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(
          userPath.GET_TRAINEE_LIST_BY_TRAINER +
            selectedTrainer.id +
            "?PageIndex=" +
            1 +
            "&PageSize=" +
            1000000
        );
        setListEmployee(response.data.data);
        setIsLoading(false); // Set loading to false after fetching data
      } catch (error) {
        toast.error(error.response.data);
        setIsLoading(false); // Set loading to false after fetching data
      }
    }
    fetchTrainees();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrainer]);

  return (
    <Modal open={isOpen} onClose={onRequestClose}>
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
          <div className="w-full h-[100px] bg-gray-500 rounded mt-4"></div>
          <div className="flex flex-col items-center -mt-20">
            <Avatar
              src={selectedTrainer?.avatarURL || defaultUserIcon}
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
                {selectedTrainer?.firstName + " " + selectedTrainer?.lastName}
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
                  selectedTrainer?.firstName + " " + selectedTrainer?.lastName
                }
              />
            </ListItem>
            <Divider />
            <ListItem className="flex border-b py-2">
              <Typography className="font-bold w-24">Email:</Typography>
              <ListItemText primary={selectedTrainer?.email} />
            </ListItem>
            <Divider />
            <ListItem className="flex border-b py-2">
              <Typography className="font-bold w-24">Số ĐT:</Typography>
              <ListItemText primary={selectedTrainer?.phoneNumber} />
            </ListItem>
            <Divider />
            <ListItem className="flex border-b py-2">
              <Typography className="font-bold w-24">Giới tính:</Typography>
              <ListItemText
                primary={
                  genderOptions.find(
                    (option) => option.value === selectedTrainer?.gender
                  )?.label
                }
              />
            </ListItem>
            <Divider />
            <ListItem className="flex border-b py-2">
              <Typography className="font-bold w-24">Địa chỉ:</Typography>
              <ListItemText primary={selectedTrainer?.address} />
            </ListItem>
            <Divider />
            <ListItem className="flex border-b py-2">
              <Typography className="font-bold w-24">Ngày sinh:</Typography>
              <ListItemText primary={fDate(selectedTrainer?.birthday)} />
            </ListItem>
            <Divider />
            <ListItem className="flex border-b py-2">
              <Typography className="font-bold w-24">Vị trí:</Typography>
              <ListItemText primary={selectedTrainer?.positionName} />
            </ListItem>
          </List>

          <h4 className="text-xl text-gray-900 font-bold text-left ml-2 mt-5">
            Thực tập sinh quản lý ({listEmployee.length})
          </h4>
          <List className="mt-2 text-gray-700">
            {listEmployee.length > 0 ? (
              listEmployee.map((item, index) => (
                <ListItem className="flex border-y py-2 justify-between">
                  <div className="w-3/4 flex items-center">
                    <Typography className="font-bold w-24">
                      {index + 1}
                      {")"} Họ và tên:
                    </Typography>
                    <ListItemText
                      primary={item?.firstName + " " + item?.lastName}
                    />
                  </div>
                  <div className="w-1/4 flex items-center">
                    <Typography className="font-bold w-24">MSNV:</Typography>
                    <ListItemText primary={item?.rollNumber} />
                  </div>
                </ListItem>
              ))
            ) : (
              <Typography className="font-medium  w-full text-lg">
                &nbsp; Đào tạo viên này đang không quản lý thực tập sinh nào.
              </Typography>
            )}
          </List>
        </PerfectScrollbar>
      </Box>
    </Modal>
  );
};

export default ModalTrainerDetailManager;
