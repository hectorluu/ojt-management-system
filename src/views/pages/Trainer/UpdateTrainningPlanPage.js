import React, { Fragment, useEffect, useState } from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TrainingPlanTimeline from "views/components/timeline/TrainingPlanTimeline";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PerfectScrollbar from "react-perfect-scrollbar";
import { trainingPlanValid } from "logic/utils/validateUtils";
import { LoadingButton } from "@mui/lab";
import Button from "views/components/button/Button";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

const UpdateTrainningPlanPage = () => {
  const { planId } = useParams();
  const { handleSubmit } = useForm();

  const [error, setError] = useState({});
  const [trainingPlanName, setTrainingPlanName] = useState("");
  const [createTrainingPlanDetails, setCreateTrainingPlanDetails] = useState([
    { id: null, name: "", description: "", startTime: new Date(), endTime: new Date(), status: null },
  ]);
  const [oldDetails, setOldDetails] = useState([]);
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

  useEffect(() => {
    fetchTrainingPlanDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(createTrainingPlanDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTrainingPlanDetails]);

  const fetchTrainingPlanDetails = async () => {
    try {
      const response = await axiosPrivate.get(
        trainingPlanPath.GET_TRAINING_PLAN_DETAIL + planId
      );
      setTrainingPlanName(response.data.name);
      setCreateTrainingPlanDetails(response.data.details);
      setOldDetails(response.data.details);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const handleUpdateTrainingPlan = async (values) => {
    setIsLoading(true);
    const plan = {
      name: trainingPlanName,
      details: createTrainingPlanDetails,
    }
    const valid = trainingPlanValid(plan);
    setError(valid);

    let check = false;

    for (const key in valid) {
      if (key !== "details" && valid[key] !== "") {
        check = true;
        break; // If any non-empty value is found, exit the loop
      } else if (key === "details" && Array.isArray(valid[key])) {
        for (const item of valid[key]) {
          for (const itemKey in item) {
            if (item[itemKey] !== "") {
              check = true;
              break; // If any non-empty value is found, exit the loop
            }
          }
          if (check) {
            break; // If any non-empty value is found, exit the loop
          }
        }
      }
    }
    if (!check) {
      try {
        await axiosPrivate.put(trainingPlanPath.UPDATE_TRAININGPLAN + planId, plan);
        setIsLoading(false);
        navigate("/trainer-training-plan");
        toast.success(trainingPlanNoti.SUCCESS.UPDATE);
      } catch (error) {
        toast.error(error?.response?.data);
        setIsLoading(false);
      }
    };
    setIsLoading(false);
  };

  const handleAddField = () => {
    const newField = {
      id: null,
      name: "",
      description: "",
      startTime: new Date(),
      endTime: new Date(),
      status: null
    };
    setCreateTrainingPlanDetails([...createTrainingPlanDetails, newField]);
  };

  const handleRemoveField = (index) => {
    if (createTrainingPlanDetails.length <= oldDetails.length) {
      toast.error("Không thể xoá chi tiết");
      return;
    }
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
          <form onSubmit={handleSubmit(handleUpdateTrainingPlan)}>
            <FormGroup>
              <Label>Tên kế hoạch đào tạo (*)</Label>
              <TextField
                value={trainingPlanName || ""}
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
                      trainingPlanName || "Kế hoạch đào tạo chưa có tên"
                    }
                    list={createTrainingPlanDetails
                      .filter(item => item.status !== 3)
                      .map(item => ({
                        title: item.name,
                        description: item.description,
                        startDay: new Date(item.startTime),
                        endDay: new Date(item.endTime),
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
                  <Stack direction={"row"} spacing={10}>
                    <TextField
                      value={createTrainingPlanDetails?.[index]?.name || ""}
                      className="w-3/5"
                      error={error?.details?.[index]?.name ? true : false}
                      helperText={error?.details?.[index]?.name}
                      name="trainingplandetailname"
                      placeholder="Ex: Làm việc với đào tạo viên"
                      onChange={(e) => onChangeDetails(index, "name", e.target.value)}
                      onBlur={(e) => onChangeDetails(index, "name", e.target.value)}
                      inputProps={{ maxLength: 100 }}
                    />
                    {createTrainingPlanDetails?.[index]?.id ?
                      createTrainingPlanDetails?.[index]?.status === 3 ?
                        <IconButton
                          color="success"
                          onClick={() => onChangeDetails(index, "status", 2)}
                        >
                          <ToggleOnIcon />
                        </IconButton>
                        :
                        <IconButton
                          color="error"
                          onClick={() => onChangeDetails(index, "status", 3)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      : null}
                  </Stack>
                </FormGroup>
                <FormGroup>
                  <Label>Mô tả về nhiệm vụ (ngắn gọn) (*)</Label>
                  <TextField
                    value={createTrainingPlanDetails?.[index]?.description || ""}
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
                Chỉnh sửa{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateTrainningPlanPage;
