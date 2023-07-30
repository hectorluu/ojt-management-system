import React from "react";
import ReactModal from "react-modal";
import { Button } from "components/button";
import { defaultImage } from "constants/global";

const ModalTrainerDetailManager = ({ isOpen, onRequestClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      className="modal-content w-full max-w-[1000px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-auto scroll-hidden"
    >
      <button
        className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-10 top-[10px] text-text1"
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
        Thông tin chi tiết trainer
      </h2>
      <div>
        <div className="bg-white shadow-1 rounded-xl">
          <img
            src={defaultImage}
            className="h-[232px] object-cover rounded-xl w-full"
            alt=""
          />
          <div className="p-5">
            <span className="inline-block px-3 py-1 mb-5 text-xs font-medium text-white rounded-sm bg-secondary">
              Featured
            </span>
            <div className="flex items-center mb-4 gap-x-3">
              <span className="text-xl font-bold text-text1">$2,724 USD</span>{" "}
              <span className="text-sm font-medium line-through text-error">
                $1,504 USD
              </span>
              <span className="text-sm font-medium text-error">(12% OFF)</span>
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

        <div className="mt-6">
          <Button className="w-full text-white bg-secondary">
            Get this perk
          </Button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalTrainerDetailManager;
