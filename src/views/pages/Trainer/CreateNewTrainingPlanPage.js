import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";

import { trainingPlanPath } from "logic/api/apiUrl";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { trainingPlanNoti } from "logic/constants/notification";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TrainingPlanTimeline from "views/components/timeline/TrainingPlanTimeline";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PerfectScrollbar from "react-perfect-scrollbar";
import { trainingPlanValid } from "logic/utils/validateUtils";
import { LoadingButton } from "@mui/lab";
import Button from "views/components/button/Button";

const CreateNewTrainingPlanPage = () => {
  const { handleSubmit } = useForm();

  const [error, setError] = useState({});
  const [trainingPlanName, setTrainingPlanName] = useState("");
  const [createTrainingPlanDetails, setCreateTrainingPlanDetails] = useState([
    { name: "", description: "", startTime: new Date(), endTime: new Date() },
  ]);
  const moment = require("moment");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const axiosPrivate = useAxiosPrivate();

  const handleAddNewTrainingPlan = async (values) => {
    setIsLoading(true);
    const plan = {
      name: trainingPlanName,
      details: createTrainingPlanDetails,
    }
    const valid = trainingPlanValid(plan);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        await axiosPrivate.post(trainingPlanPath.CREATE_NEW_TRAINING_PLAN, plan);
        setIsLoading(false);
        navigate("/trainer-training-plan");
        toast.success(trainingPlanNoti.SUCCESS.CREATE);
      } catch (error) {
        toast.error(error.response.data);
        setIsLoading(false);
      }
    };
    setIsLoading(false);
  };

  const handleAddField = () => {
    const newField = {
      name: "",
      description: "",
      startTime: new Date(),
      endTime: new Date(),
    };
    setCreateTrainingPlanDetails([...createTrainingPlanDetails, newField]);
  };

  const handleRemoveField = (index) => {
    let temp = createTrainingPlanDetails.slice();
    temp.pop();
    setCreateTrainingPlanDetails(temp);
  };

  const onChangeDetails = (index, name, value) => {
    const newArray = createTrainingPlanDetails.slice();
    newArray[index][name] = value;
    setCreateTrainingPlanDetails(newArray);
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-slate-700 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Tạo kế hoạch đào tạo mới
          </h1>
          <form onSubmit={handleSubmit(handleAddNewTrainingPlan)}>
            <FormGroup>
              <Label>Tên kế hoạch đào tạo (*)</Label>
              <TextField
                error={error?.name ? true : false}
                helperText={error?.name}
                name="trainingplanname"
                placeholder="Ex: Kế hoạch đào tạo cho sinh viên trường Đại học FPT quý 3 năm 2023"
                onChange={(e) => setTrainingPlanName(e.target.value)}
                onBlur={(e) => setTrainingPlanName(e.target.value)}
                inputProps={{ maxLength: 100 }}
              />
            </FormGroup>

            {/* This is the line to separate between section */}
            <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
            <h2 className="py-4 px-14bg-opacity-5 rounded-xl font-bold text-[23px] inline-block">
              Chi tiết
            </h2>

            {/*Drawer Preview Training Plan */}
            <div className="flex justify-end mb-12">
              <LoadingButton
                component={Link}
                variant="contained"
                size="large"
                sx={{ borderRadius: "10px" }}
                onClick={toggleDrawer("right", true)}
                disabled={createTrainingPlanDetails.length === 0}
              >
                Preview kế hoạch đang tạo
              </LoadingButton>
            </div>

            <Drawer
              anchor={"right"}
              open={drawerState["right"]}
              onClose={toggleDrawer("right", false)}
            >
              <Box
                sx={{ width: "27rem" }}
                role="presentation"
                onClick={toggleDrawer("right", false)}
                onKeyDown={toggleDrawer("right", false)}
              >
                <PerfectScrollbar
                  component="div"
                  style={{
                    height: "calc(100vh)",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                >
                  <TrainingPlanTimeline
                    title={
                      <span className="font-bold">
                        {trainingPlanName || "Kế hoạch đào tạo chưa có tên"}
                      </span>
                    }
                    list={createTrainingPlanDetails.map((item, index) => ({
                      title: item.name,
                      description: item.description,
                      startDay: item.startTime,
                      endDay: item.endTime,
                    }))}
                  />
                </PerfectScrollbar>
              </Box>
            </Drawer>

            {createTrainingPlanDetails.map((trainingPlanDetails, index) => (
              <div key={index}>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  textAlign="left"
                  className="mb-4"
                >
                  Công việc {index + 1}
                </Typography>
                <FormGroup>
                  <Label>Nhiệm vụ (*)</Label>
                  <TextField
                    className="w-3/5"
                    error={error?.details?.[index]?.name ? true : false}
                    helperText={error?.details?.[index]?.name}
                    name="trainingplandetailname"
                    placeholder="Ex: Làm việc với đào tạo viên"
                    onChange={(e) => onChangeDetails(index, "name", e.target.value)}
                    onBlur={(e) => onChangeDetails(index, "name", e.target.value)}
                    inputProps={{ maxLength: 100 }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Mô tả về nhiệm vụ (ngắn gọn) (*)</Label>
                  <TextField
                    multiline
                    error={error?.details?.[index]?.description ? true : false}
                    helperText={error?.details?.[index]?.description}
                    fullWidth
                    InputProps={{
                      inputComponent: TextareaAutosize,
                      inputProps: {
                        minRows: 5,
                        maxRows: 8,
                        maxLength: 500,
                        placeholder: "Ex: Chuẩn bị sẵn sàng môi trường làm việc",
                        onChange: (e) => onChangeDetails(index, "description", e.target.value),
                        onKeyDown: (e) => onChangeDetails(index, "description", e.target.value),
                      }
                    }}
                  />
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <Label>Ngày bắt đầu (*)</Label>
                    <DatePicker
                      value={moment(createTrainingPlanDetails?.[index]?.startTime)}
                      onChange={(newValue) => onChangeDetails(index, "startTime", newValue.toDate())}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: error?.details?.[index]?.startTime ? true : false,
                          helperText: error?.details?.[index]?.startTime,
                          readOnly: true,
                        },
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Ngày kết thúc (*)</Label>
                    <DatePicker
                      value={moment(createTrainingPlanDetails?.[index]?.endTime)}
                      onChange={(newValue) => onChangeDetails(index, "endTime", newValue.toDate())}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: error?.details?.[index]?.endTime ? true : false,
                          helperText: error?.details?.[index]?.endTime,
                          readOnly: true,
                        },
                      }}
                    />
                  </FormGroup>
                </FormRow>
              </div>
            ))}

            <Stack direction="row" spacing={1} justifyContent="center">
              <IconButton
                color="error"
                aria-label="delete"
                onClick={() => handleRemoveField()}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="delete"
                onClick={() => handleAddField()}
              >
                <AddIcon />
              </IconButton>
            </Stack>

            <div className="mt-10 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
                isLoading={isLoading}
              >
                Thêm mới{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateNewTrainingPlanPage;
