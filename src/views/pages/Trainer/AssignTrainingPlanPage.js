import React, { Fragment, useEffect, useState } from "react";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { toast } from "react-toastify";
import { Label } from "views/components/label";
import {
  Chip,
  Stack,
  Tooltip,
  Autocomplete,
  TextField,
  Avatar,
  IconButton,
} from "@mui/material";
import { trainingPlanPath, userPath } from "logic/api/apiUrl";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import SubCard from "views/components/cards/SubCard";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import { assignNoti, trainingPlanNoti } from "logic/constants/notification";
import { trainingPlanAssignValid } from "logic/utils/validateUtils";
import TrainingPlanTimeline from "views/components/timeline/TrainingPlanTimeline";

const AssignTrainingPlanPage = () => {
  const handleTrainingPlanAssignment = async () => {
    setIsLoading(true); // Set loading state
    const assign = {
      trainingPlanId: selectedPlan.id,
      trainees: trainees.map((trainee) => ({
        traineeId: trainee.id,
      })),
    };
    const valid = trainingPlanAssignValid(assign);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        await axiosPrivate.post(trainingPlanPath.ASSIGN_TRAINING_PLAN, assign);
        setSelectedId("");
        setSelectedPlan({});
        setTrainees([]);
        setIsLoading(false);
        toast.success(trainingPlanNoti.SUCCESS.ASSIGN);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data);
      }
    }
    // values
    setIsLoading(false);
  };

  const [selectedId, setSelectedId] = useState("");
  const [trainees, setTrainees] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [error, setError] = useState({});
  const [assignedTraineeList, setAssignedTraineeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trainingPlanList, setTrainingPlanList] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});

  // fetch trainers
  useEffect(() => {
    fetchTrainingPlans();
    fetchUnassignedTrainee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedId) {
      fetchTrainingPlanDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  async function fetchTrainingPlanDetails() {
    try {
      const response = await axiosPrivate.get(trainingPlanPath.GET_TRAINING_PLAN_DETAIL + selectedId);
      setSelectedPlan(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  async function fetchTrainingPlans() {
    try {
      const response = await axiosPrivate.get(
        trainingPlanPath.GET_TRAINING_PLAN_OF_TRAINER +
        "?PageIndex=" +
        1 +
        "&PageSize=" +
        100000 +
        "&status=" +
        2
      );
      setTrainingPlanList(response.data.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  const fetchUnassignedTrainee = async () => {
    try {
      const response = await axiosPrivate.get(userPath.GET_TRAINER_TRAINEE +
        "?PageIndex=" +
        1 +
        "&PageSize=" +
        100000);
      setAssignedTraineeList(response.data.data);
    } catch (e) {
      toast.error(e.response.data);
    }
  };

  const onClickRemove = (index) => {
    let temp = trainees.slice();
    temp.splice(index, 1);
    setTrainees(temp);
  };

  const handleAddTrainee = (item) => {
    if (trainees.some((trainee) => trainee.id === item.id)) {
      toast.error(assignNoti.ERROR.DUPPLICATED);
      return;
    } else {
      setTrainees([...trainees, item]);
    }
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Phân kế hoạch đào tạo
          </h1>
          <FormRow>
            <FormGroup>
              <Label>Kế hoạch đào tạo</Label>
              <Autocomplete
                disablePortal={false}
                id="combo-box-demo"
                options={trainingPlanList}
                getOptionLabel={(option) =>
                  option.name
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Chọn kế hoạch đào tạo"
                    error={error?.trainingPlanId ? true : false}
                    helperText={error?.trainingPlanId}
                  />
                )}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setSelectedId(newValue.id);
                  } else {
                    setSelectedPlan({});
                  }
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              <SubCard
                sx={{ minHeight: "200px" }}
                className="pointer-events-none"
              >
                <h4 className="text-xl text-gray-900 font-bold text-left ml-2">
                  Thông tin kế hoạch đào tạo
                </h4>
                {Object.keys(selectedPlan).length !== 0 && (
                  <SubCard>
                    <TrainingPlanTimeline
                      title={
                        selectedPlan?.name
                      }
                      list={selectedPlan?.details?.map((item, index) => ({
                        title: item.name,
                        description: item.description,
                        startDay: new Date(item.startTime),
                        endDay: new Date(item.endTime),
                      }))}
                    />
                  </SubCard>
                )}
              </SubCard>
            </FormGroup>

            <FormGroup>
              <Label>Thực tập sinh</Label>
              <Autocomplete
                value={null}
                disablePortal={false}
                id="combo-box-demo"
                options={assignedTraineeList}
                getOptionLabel={(option) =>
                  option.firstName + " " + option.lastName + " " + option.email
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Chọn thực tập sinh"
                    error={error?.trainees ? true : false}
                    helperText={error?.trainees}
                  />
                )}
                onChange={(event, newValue) => {
                  if (newValue) {
                    handleAddTrainee(newValue);
                  }
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />

              <SubCard>
                <Stack>
                  {trainees.map((trainee, index) => (
                    <Tooltip
                      title={trainee.email + " " + trainee.positionName}
                      placement="right"
                      className="w-fit"
                      key={trainee.id}
                      sx={{ mb: 0.5 }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => onClickRemove(index)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <Chip
                          key={trainee}
                          variant="contained"
                          sx={{ p: 1 }}
                          label={trainee.firstName + " " + trainee.lastName}
                          icon={
                            <Avatar
                              src={trainee.avatarURL}
                              sx={{ width: 24, height: 24 }}
                            />
                          }
                        ></Chip>
                      </Stack>
                    </Tooltip>
                  ))}
                </Stack>
              </SubCard>
            </FormGroup>
          </FormRow>
          <div className="mt-5 text-center">
            <LoadingButton
              component="label"
              loading={isLoading}
              onClick={() => handleTrainingPlanAssignment()}
              variant="contained"
              color="success"
              sx={{ height: "50px" }}
            >
              Lưu thay đổi
            </LoadingButton>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AssignTrainingPlanPage;
