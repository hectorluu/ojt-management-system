import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Modal } from "@mui/material";
import { fDate } from "logic/utils/formatTime";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { trainingPlanPath } from "logic/api/apiUrl";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toast } from "react-toastify";

const ModalTrainingPlanDetailManager = ({
  onRequestClose,
  selectedTrainingPlan,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [trainingPlanDetails, setTrainingPlanDetails] = useState([]);

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
              <div className="bg-white shadow-1 rounded-xl">
                <div className="p-5">
                  <div className="flex items-center mb-3 gap-x-3">
                    <span className="text-xl font-bold text-text1">
                      {trainingPlanDetails?.name}
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong className="font-semi">Ngày chỉnh sửa: </strong>
                    <span className="text-text2">
                      {fDate(trainingPlanDetails?.updateDate)}
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong className="font-semi">Người tạo: </strong>
                    <span className="text-text2">
                      {trainingPlanDetails?.firstName +
                        " " +
                        trainingPlanDetails?.lastName}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center mb-4 gap-x-3">
                    <span className="text-xl font-bold text-text1">Chi tiết</span>
                  </div>
                  {trainingPlanDetails?.details?.length > 0 ? (
                    trainingPlanDetails?.details?.map((detail, index) => (
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
              </div>}
          </div>
        </PerfectScrollbar>
      </Box>
    </Modal>
  );
};

export default ModalTrainingPlanDetailManager;
