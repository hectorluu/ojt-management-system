import React, { useEffect, useState } from "react";
import { Button } from "views/components/button";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { ojtBatchPath, templatePath } from "logic/api/apiUrl";
import { useForm } from "react-hook-form";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import FormRow from "../common/FormRow";
import { DatePicker } from "@mui/x-date-pickers";
import { Autocomplete, Box, Modal, Skeleton, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { signalRMessage } from "logic/constants/global";
import signalRService from "logic/utils/signalRService";

const ModalEditOJTBatch = ({
  onRequestClose,
  idClicked,
  isSubmitLoading,
  handleUpdateBatch,
  error,
  universityId,
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
      setName(response.data.name);
      setStartTime(response.data.startTime);
      setEndTime(response.data.endTime);
      setTemplateId(response.data.templateId);
    } catch (error) {
      toast.error(error.response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (name && startTime && endTime && templateId && templateList) setIsLoading(false);
  }, [name, startTime, endTime, templateId, templateList]);

  useEffect(() => {
    signalRService.on(signalRMessage.TEMPLATE.CREATED, (message) => {
      fetchTemplateList();
    });
    signalRService.on(signalRMessage.TEMPLATE.UPDATED, (message) => {
      fetchTemplateList();
    });
    signalRService.on(signalRMessage.TEMPLATE.DELETED, (message) => {
      fetchTemplateList();
    });

    return () => {
      signalRService.off(signalRMessage.TEMPLATE.CREATED);
      signalRService.off(signalRMessage.TEMPLATE.UPDATED);
      signalRService.off(signalRMessage.TEMPLATE.DELETED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTemplateList = async () => {
    try {
      const response = await axiosPrivate.get(
        templatePath.GET_TEMPLATE_UNIVERSITY + universityId
      );
      setTemplateList(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    if (idClicked) {
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
    <Modal open={true} onClose={onRequestClose}>
      <Box
        sx={{
          borderRadius: "0.5rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: 380,
          width: 600,
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
        <div>
          <div className="bg-white shadow-1 rounded-xl p-4">
            <form onSubmit={handleSubmit(handleEditBatch)}>
              <FormRow>
                <FormGroup>
                  <Label>Tên đợt thực tập (*)</Label>
                  {isLoading ? (
                    <Skeleton height={60} animation="wave" />
                  ) : (
                    <TextField
                      value={name}
                      error={error?.name ? true : false}
                      helperText={error?.name}
                      name="name"
                      placeholder="Ex: Đợt 1"
                      onChange={(e) => setName(e.target.value)}
                      onBlur={(e) => setName(e.target.value)}
                      inputProps={{ maxLength: 100 }}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Mẫu đánh giá(*)</Label>
                  {isLoading ? (
                    <Skeleton height={60} animation="wave" />
                  ) : (
                    <Autocomplete
                      value={templateList.find((x) => x.id === templateId) || null}
                      disablePortal={false}
                      id="combo-box-demo"
                      options={templateList}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} placeholder="Chọn mẫu đánh giá" error={error?.templateId ? true : false} helperText={error?.templateId} />}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setTemplateId(newValue.id);
                        } else {
                          setTemplateId("");
                        }
                      }}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                    />
                  )}
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label>Ngày bắt đầu (*)</Label>
                  {isLoading ? (
                    <Skeleton height={60} animation="wave" />
                  ) : (
                    <DatePicker
                      value={moment(startTime)}
                      onChange={(newValue) => setStartTime(newValue.toDate())}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: error?.startTime ? true : false,
                          helperText: error?.startTime,
                          readOnly: true,
                        },
                      }}
                    />
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Ngày kết thúc (*)</Label>
                  {isLoading ? (
                    <Skeleton height={60} animation="wave" />
                  ) : (
                    <DatePicker
                      value={moment(endTime)}
                      onChange={(newValue) => setEndTime(newValue.toDate())}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: error?.endTime ? true : false,
                          helperText: error?.endTime,
                          readOnly: true,
                        },
                      }}
                    />
                  )}
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
      </Box>
    </Modal>
  );
};

export default ModalEditOJTBatch;
