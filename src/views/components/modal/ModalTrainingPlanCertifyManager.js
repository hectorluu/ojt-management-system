import React, { useEffect, useState } from "react";
import { Box, Button, Modal, useTheme } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { trainingPlanPath } from "logic/api/apiUrl";
import { fDate } from "logic/utils/formatTime";
import { toast } from "react-toastify";

const ModalTrainingPlanCertifyManager = ({
  isOpen,
  onRequestClose,
  selectedTrainingPlan,
  handleApprove,
  handleDeny,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [, setIsLoading] = useState(true); // New loading state
  const [trainingPlanDetails, setTrainingPlanDetails] = useState([]);

  useEffect(() => {
    if (selectedTrainingPlan) {
      fetchDetails();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrainingPlan]);

  async function fetchDetails() {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        trainingPlanPath.GET_TRAINING_PLAN_DETAIL + selectedTrainingPlan.id
      );
      setTrainingPlanDetails(response.data.details);
      setIsLoading(false); // Set loading to false after fetching data
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false); // Set loading to false after fetching data
    }
  }

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
          width: 1000,
          height: 650,
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
          Phê duyệt kế hoạch đào tạo
        </h2>
        <PerfectScrollbar
          style={{
            height: "100%",
            maxHeight: "calc(100% - 4.5rem)",
            overflowX: "hidden",
          }}
        >
          <div>
            <div className="bg-white shadow-1 rounded-xl">
              <div className="p-5">
                <div className="flex items-center mb-3 gap-x-3">
                  <span className="text-xl font-bold text-text1">
                    {selectedTrainingPlan?.name}
                  </span>
                </div>
                <div className="mb-2">
                  <strong className="font-semi">Ngày thay đổi: </strong>
                  <span className="text-text2">
                    {fDate(selectedTrainingPlan?.updateDate)}
                  </span>
                </div>
                <div className="mb-2">
                  <strong className="font-semi">Người tạo: </strong>
                  <span className="text-text2">
                    {selectedTrainingPlan?.firstName +
                      " " +
                      selectedTrainingPlan?.lastName}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center mb-4 gap-x-3">
                  <span className="text-xl font-bold text-text1">Chi tiết</span>
                </div>
                {trainingPlanDetails.length > 0 ? (
                  trainingPlanDetails.map((detail, index) => (
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
            </div>
          </div>
        </PerfectScrollbar>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%", // Make the container span the entire width
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", // Center the buttons vertically
            padding: "1rem", // Add some padding to the container
          }}
          className="space-x-4 mt-3"
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.error.main,
              "&:hover": {
                backgroundColor: theme.palette.error.dark, // Color on hover
              },
            }}
            component="label"
            className="flex items-center justify-center cursor-pointer w-1/2 h-11 text-text1 rounded-md"
            onClick={() => {
              handleDeny();
            }}
          >
            <span className="text-white">Từ chối</span>
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.success.dark,
              "&:hover": {
                backgroundColor: "#009e47", // Color on hover
              },
            }}
            component="label"
            className="flex items-center justify-center cursor-pointer w-1/2 h-11 text-text1 rounded-md"
            onClick={() => {
              handleApprove();
            }}
          >
            <span className="text-white">Chấp nhận</span>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalTrainingPlanCertifyManager;
