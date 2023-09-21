import React from "react";
import { Box, Modal } from "@mui/material";

const ModalTrainingPlanDetailManager = ({ isOpen, onRequestClose }) => {
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
          Thông tin chi tiết kế hoạch đào tạo
        </h2>
        <div>
          <div className="bg-white shadow-1 rounded-xl">
            <div className="p-5">
              <div className="flex items-center mb-4 gap-x-3">
                <span className="text-xl font-bold text-text1">$2,724 USD</span>
              </div>
              <div className="flex flex-col mb-4 gap-y-1">
                <strong>Estimated Shipping</strong>{" "}
                <span className="text-text2">October 2022</span>
              </div>
              <p className="mb-4 text-text2">
                <strong className="text-text1">05</strong> claimed
              </p>
              <p className="text-text2">Ships worldwide</p>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalTrainingPlanDetailManager;
