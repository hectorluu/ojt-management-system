import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Button } from "views/components/button";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { ojtBatchPath, templatePath } from "logic/api/apiUrl";
import { useForm } from "react-hook-form";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import FormRow from "../common/FormRow";
import { DatePicker } from "@mui/x-date-pickers";
import { Skeleton, TextField } from "@mui/material";

const ModalEditOJTBatch = ({
  isOpen,
  onRequestClose,
  idClicked,
  isSubmitLoading,
  handleUpdateBatch,
  error,
  universityId
}) => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [templateId, setTemplateId] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { handleSubmit } = useForm();
  const moment = require("moment");

  const fetchBatch = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(
        ojtBatchPath.GET_BATCH_DETAIL + idClicked
      );
      console.log(response.data);
      setName(response.data.name);
      setStartTime(response.data.startTime);
      setEndTime(response.data.endTime);
      setTemplateId(response.data.templateId);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchTemplateList = async () => {
    try {
      const response = await axiosPrivate.get(templatePath.GET_TEMPLATE_UNIVERSITY + universityId);
      setTemplateList(response.data);
    } catch (error) {
      console.log("fetchTemplateList ~ error", error);
    };
  };

  useEffect(() => {
    if (idClicked !== 0) {
      fetchBatch();
      fetchTemplateList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idClicked]);

  const handleEditBatch = async () => {
    handleUpdateBatch({
      name,
      startTime,
      endTime,
      templateId,
      universityId,
    });
    // values, dateOfBirth
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      className="modal-content w-full max-w-[700px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-auto scroll-hidden"
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
      <div>
        <div className="bg-white shadow-1 rounded-xl p-4">
          <form onSubmit={handleSubmit(handleEditBatch)}>
            <FormRow>
              <FormGroup>
                <Label>Tên đợt thực tập (*)</Label>
                {isLoading ?
                  <Skeleton height={60} animation="wave" />
                  :
                  <TextField
                    value={name}
                    error={error?.name ? true : false}
                    helperText={error?.name}
                    name="name"
                    placeholder="Ex: Đợt 1"
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e) => setName(e.target.value)}
                    inputProps={{ maxLength: 100 }} />}
              </FormGroup>
              <FormGroup>
                <Label>Mẫu đánh giá(*)</Label>
                {isLoading ?
                  <Skeleton height={60} animation="wave" />
                  :
                  <TextField
                    value={templateList.find((template) => template.id === templateId).name}
                    name="template"
                    inputProps={{ readOnly: true }} />}
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Ngày bắt đầu (*)</Label>
                {isLoading ?
                  <Skeleton height={60} animation="wave" />
                  :
                  <DatePicker
                    value={moment(startTime)}
                    onChange={(newValue) => setStartTime(newValue.toDate())}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        error: error?.startTime ? true : false,
                        helperText: error?.startTime,
                        readOnly: true,
                      },
                    }}
                  />}
              </FormGroup>
              <FormGroup>
                <Label>Ngày kết thúc (*)</Label>
                {isLoading ?
                  <Skeleton height={60} animation="wave" />
                  :
                  <DatePicker
                    value={moment(endTime)}
                    onChange={(newValue) => setEndTime(newValue.toDate())}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        error: error?.endTime ? true : false,
                        helperText: error?.endTime,
                        readOnly: true,
                      },
                    }}
                  />}
              </FormGroup>
            </FormRow>

            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
                isLoading={isSubmitLoading}
              >
                Chỉnh sửa{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalEditOJTBatch;
