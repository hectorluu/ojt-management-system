import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { trainingPlanPath } from "logic/api/apiUrl";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { trainingPlanNoti } from "logic/constants/notification";
import { Form, Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TrainingPlanTimeline from "views/components/timeline/TrainingPlanTimeline";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PerfectScrollbar from "react-perfect-scrollbar";

const CreateNewTrainingPlanPage = () => {
  const { handleSubmit, getValues } = useForm();

  const [error, setError] = useState({});
  const [trainingPlanName, setTrainingPlanName] = useState("");
  const [trainingPlanDetailName, setTrainingPlanDetailName] = useState("");
  const [trainingPlanDetailDescription, setTrainingPlanDetailDescription] =
    useState("");
  const [startDay, setStartDay] = useState(new Date());
  const [endDay, setEndDay] = useState(new Date());

  const [createTrainingPlanDetails, setCreateTrainingPlanDetails] = useState([
    { name: "", description: "", startDay: new Date(), endDay: new Date() },
  ]);

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

  const fakeData = [
    {
      name: "Training Plan 1",
      description: "This is the first training plan.",
      startTime: "2023-06-22 08:30:00.1234567",
      endTime: "2023-06-22 10:30:00.9876543",
    },
    {
      name: "Training Plan 2",
      description: "Another training plan for testing.",
      startTime: "2023-06-23 14:00:00.2345678",
      endTime: "2023-06-23 15:30:00.8765432",
    },
    {
      name: "Training Plan 3",
      description: "A third training plan example.",
      startTime: "2023-06-24 09:15:00.3456789",
      endTime: "2023-06-24 11:45:00.7654321",
    },
    {
      name: "Training Plan 4",
      description: "Yet another training plan detail.",
      startTime: "2023-06-25 13:30:00.4567890",
      endTime: "2023-06-25 14:45:00.6543210",
    },
    {
      name: "Training Plan 5",
      description: "The fifth training plan entry.",
      startTime: "2023-06-26 16:00:00.5678901",
      endTime: "2023-06-26 17:30:00.5432109",
    },
    {
      name: "Training Plan 1",
      description: "This is the first training plan.",
      startTime: "2023-06-22 08:30:00.1234567",
      endTime: "2023-06-22 10:30:00.9876543",
    },
    {
      name: "Training Plan 2",
      description: "Another training plan for testing.",
      startTime: "2023-06-23 14:00:00.2345678",
      endTime: "2023-06-23 15:30:00.8765432",
    },
    {
      name: "Training Plan 3",
      description: "A third training plan example.",
      startTime: "2023-06-24 09:15:00.3456789",
      endTime: "2023-06-24 11:45:00.7654321",
    },
    {
      name: "Training Plan 4",
      description: "Yet another training plan detail.",
      startTime: "2023-06-25 13:30:00.4567890",
      endTime: "2023-06-25 14:45:00.6543210",
    },
    {
      name: "Training Plan 5",
      description: "The fifth training plan entry.",
      startTime: "2023-06-26 16:00:00.5678901",
      endTime: "2023-06-26 17:30:00.5432109",
    },
  ];

  const axiosPrivate = useAxiosPrivate();

  const handleAddNewTrainingPlan = async (values) => {
    try {
      await axiosPrivate.post(trainingPlanPath.CREATE_NEW_TRAINING_PLAN, {
        trainingPlanName,
      });
      toast.success(trainingPlanNoti.SUCCESS.CREATE);
    } catch (error) {
      toast.error(error);
    }
  };

  const [trainingPlanDetailList, setTrainingPlanDetailList] = useState([]);

  const handleAddField = () => {
    const newField = {
      name: "",
      description: "",
      startDay: new Date(),
      endDay: new Date(),
    };
    setCreateTrainingPlanDetails([...createTrainingPlanDetails, newField]);
  };

  const handleRemoveField = (index) => {
    let temp = createTrainingPlanDetails.slice();
    temp.pop();
    setCreateTrainingPlanDetails(temp);
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
                error={error?.trainingPlanName ? true : false}
                helperText={error?.trainingPlanName}
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
              <Button
                component={Link}
                variant="contained"
                size="large"
                sx={{ borderRadius: "10px" }}
                onClick={toggleDrawer("right", true)}
              >
                Preview kế hoạch đang tạo
              </Button>
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
                    list={fakeData.map((item, index) => ({
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
                    error={error?.trainingPlanDetailName ? true : false}
                    helperText={error?.trainingPlanDetailName}
                    name="trainingplandetailname"
                    placeholder="Ex: Làm việc với đào tạo viên"
                    onChange={(e) => setTrainingPlanDetailName(e.target.value)}
                    onBlur={(e) => setTrainingPlanDetailName(e.target.value)}
                    inputProps={{ maxLength: 100 }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Mô tả về nhiệm vụ (ngắn gọn) (*)</Label>
                  <TextField
                    className="w-3/5"
                    error={error?.trainingPlanDetailDescription ? true : false}
                    helperText={error?.trainingPlanDetailDescription}
                    name="trainingplandetaildescription"
                    placeholder="Ex: Chuẩn bị sẵn sàng môi trường làm việc"
                    onChange={(e) =>
                      setTrainingPlanDetailDescription(e.target.value)
                    }
                    onBlur={(e) =>
                      setTrainingPlanDetailDescription(e.target.value)
                    }
                    inputProps={{ maxLength: 500 }}
                  />
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <Label>Ngày bắt đầu (*)</Label>
                    <DatePicker
                      onChange={(newValue) => setStartDay(newValue.toDate())}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: error?.startDay ? true : false,
                          helperText: error?.startDay,
                        },
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Ngày kết thúc (*)</Label>
                    <DatePicker
                      onChange={(newValue) => setEndDay(newValue.toDate())}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          error: error?.endDay ? true : false,
                          helperText: error?.endDay,
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
                component="label"
                variant="contained"
                className="px-10 mx-auto"
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
