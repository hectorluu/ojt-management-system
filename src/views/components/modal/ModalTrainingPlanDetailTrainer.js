import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, List, ListItem, ListItemText, Modal, Typography } from "@mui/material";
import { fDate } from "logic/utils/formatTime";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { trainingPlanPath } from "logic/api/apiUrl";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toast } from "react-toastify";
import { defaultUserIcon } from "logic/constants/global";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const ModalTrainingPlanDetailTrainer = ({
  onRequestClose,
  selectedTrainingPlan,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [trainingPlanDetails, setTrainingPlanDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTrainingPlan) {
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrainingPlan]);

  async function fetchDetails() {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        trainingPlanPath.GET_TRAINING_PLAN_DETAIL + selectedTrainingPlan.id
      );
      setTrainingPlanDetails(response.data);
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      toast.error(error?.response?.data);
      setIsLoading(false); // Set loading to false after fetching data
    }
  }

  const theme = useTheme();

  return (
    <Modal open={true} onClose={onRequestClose}>
      <Box
        sx={{
          borderRadius: "0.5rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          height: "40.625rem",
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
        <h2 className="font-bold text-[25px] mb-10 text-center">
          Thông tin chi tiết kế hoạch đào tạo
        </h2>
        <PerfectScrollbar
          style={{
            height: "100%",
            maxHeight: "calc(100% - 4.5rem)",
            overflowX: "hidden",
          }}
        >
          <div style={isLoading ? { display: 'flex', justifyContent: 'center', alignItems: 'center' } : {}}>
            {isLoading ? <CircularProgress /> :
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white shadow-1 rounded-xl">
                  <div className="p-5">
                    <div className="flex items-center mb-3 gap-x-3">
                      <span className="text-xl font-bold text-text1">
                        {trainingPlanDetails?.name}
                      </span>
                    </div>
                    <div className="mb-2">
                      <strong className="font-semi">Ngày thay đổi: </strong>
                      <span className="text-text2">
                        {fDate(trainingPlanDetails?.createDate)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center mb-4 gap-x-3">
                      <span className="text-xl font-bold text-text1">Chi tiết</span>
                    </div>
                    {trainingPlanDetails?.details?.length > 0 ? (
                      trainingPlanDetails?.details?.filter(item => item.status !== 3)?.map((detail, index) => (
                        <div className="mb-6" key={index}>
                          <p className="mb-2 text-text2">
                            <strong className="text-text1">
                              {index + 1}
                              {")"} {detail.name}
                            </strong>
                          </p>
                          <p className="text-text2 pl-4 mb-2">
                            {detail?.description}
                          </p>
                          <p className="text-text2 pl-4">
                            {fDate(detail?.startTime) +
                              " - " +
                              fDate(detail?.endTime)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div>Chưa có chi tiết được tạo.</div>
                    )}
                  </div>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark, // Color on hover
                      },
                    }}
                    component="label"
                    className="flex items-center justify-center cursor-pointer w-3/4 h-8 text-text1 rounded-md"
                    onClick={() => {
                      navigate("/trainer-training-plan/" + trainingPlanDetails.id);
                    }}
                  >
                    <span className="text-white">Chỉnh sửa</span>
                  </Button>
                </div>

                <div className="bg-white shadow-1 rounded-xl">
                  <h4 className="text-xl text-gray-900 font-bold text-left ml-2 mt-5">
                    Thực tập sinh ({trainingPlanDetails?.trainees?.length})
                  </h4>
                  <List className="mt-2 text-gray-700">
                    {trainingPlanDetails?.trainees?.length > 0 ? (
                      trainingPlanDetails?.trainees?.map((item, index) => (
                        <ListItem className="flex border-y py-2 justify-between" key={index}>
                          <img
                            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                            src={item.avatarURL || defaultUserIcon}
                            alt=""
                            onError={(e) => {
                              e.target.src = defaultUserIcon;
                            }} />
                          <ListItemText
                            primary={item?.traineeName}
                          />
                          <ListItemText primary={"Email: " + item?.traineeEmail} />
                        </ListItem>
                      ))
                    ) : (
                      <Typography className="font-medium  w-full text-lg">
                        &nbsp; Kế hoạch đào tạo không có thực tập sinh.
                      </Typography>
                    )}
                  </List>
                </div>
              </div>}
          </div>
        </PerfectScrollbar>
      </Box>
    </Modal>
  );
};

export default ModalTrainingPlanDetailTrainer;
