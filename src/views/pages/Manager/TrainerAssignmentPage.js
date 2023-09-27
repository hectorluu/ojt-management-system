import React, { Fragment, useEffect, useState } from "react";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { toast } from "react-toastify";
import { Label } from "views/components/label";
import {
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  Divider,
  Autocomplete,
  TextField,
  Avatar,
  IconButton,
} from "@mui/material";
import { userPath } from "logic/api/apiUrl";
import { genderOptions, signalRMessage } from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import SubCard from "views/components/cards/SubCard";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import { assignNoti } from "logic/constants/notification";
import { traineeAssignValid } from "logic/utils/validateUtils";
import signalRService from "logic/utils/signalRService";

const TrainerAssignmentPage = () => {
  const handleTrainerAssignment = async () => {
    setIsLoading(true); // Set loading state
    const assign = {
      trainerId: trainer.id,
      trainees: trainees.map((trainee) => ({
        traineeId: trainee.id,
      })),
    };
    const valid = traineeAssignValid(assign);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        await axiosPrivate.post(userPath.ASSIGN_TRAINEES_TO_TRAINER, assign);
        setTrainees([]);
        setTrainer({});
        setIsLoading(false);
        toast.success(assignNoti.SUCCESS.ASSIGN);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data);
      }
    }
    // values
    setIsLoading(false);
  };

  useEffect(() => {
    signalRService.on(signalRMessage.USER.ASSIGNED, (message) => {
      fetchTrainers();
      fetchUnassignedTrainee();
    });
    signalRService.on(signalRMessage.USER.CREATE, (message) => {
      fetchTrainers();
      fetchUnassignedTrainee();
    });
    signalRService.on(signalRMessage.USER.UPDATE, (message) => {
      fetchTrainers();
      fetchUnassignedTrainee();
    });

    return () => {
      signalRService.off(signalRMessage.USER.ASSIGNED);
      signalRService.off(signalRMessage.USER.CREATE);
      signalRService.off(signalRMessage.USER.UPDATE);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [trainers, setTrainers] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [error, setError] = useState({});
  const [trainer, setTrainer] = useState({});
  const [unassigned, setUnassigned] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch trainers
  useEffect(() => {
    fetchTrainers();
    fetchUnassignedTrainee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchTrainers() {
    try {
      const response = await axiosPrivate.get(
        userPath.GET_TRAINER_LIST + "?PageIndex=" + 1 + "&PageSize=" + 100000
      );

      setTrainers(response.data.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  const fetchUnassignedTrainee = async () => {
    try {
      const response = await axiosPrivate.get(userPath.GET_UNASSIGNED_TRAINEE);
      setUnassigned(response.data);
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
            Phân công đào tạo viên
          </h1>
          <FormRow>
            <FormGroup>
              <Label>
                <span className="text-xl font-bold">Đào tạo viên</span>{" "}
              </Label>
              <Autocomplete
                disablePortal={false}
                id="combo-box-demo"
                options={trainers}
                getOptionLabel={(option) =>
                  option.firstName + " " + option.lastName
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Chọn đào tạo viên"
                    error={error?.trainerId ? true : false}
                    helperText={error?.trainerId}
                  />
                )}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setTrainer(newValue);
                  } else {
                    setTrainer({});
                  }
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              <SubCard
                sx={{ minHeight: "200px" }}
                className="pointer-events-none"
              >
                <h4 className="text-xl text-gray-900 font-bold text-left ml-2">
                  Thông tin đào tạo viên
                </h4>
                {Object.keys(trainer).length !== 0 && (
                  <List className="mt-2 text-gray-700">
                    <ListItem className="flex border-y py-2">
                      <Typography className="font-bold w-24">
                        Họ và tên
                      </Typography>
                      <ListItemText
                        primary={trainer?.firstName + " " + trainer?.lastName}
                      />
                    </ListItem>
                    <Divider />
                    <ListItem className="flex border-b py-2">
                      <Typography className="font-bold w-24">Email:</Typography>
                      <ListItemText primary={trainer.email} />
                    </ListItem>
                    <Divider />
                    <ListItem className="flex border-b py-2">
                      <Typography className="font-bold w-24">
                        Giới tính:
                      </Typography>
                      <ListItemText
                        primary={
                          genderOptions.find(
                            (option) => option.value === trainer.gender
                          )?.label
                        }
                      />
                    </ListItem>
                    <Divider />
                    <ListItem className="flex border-b py-2">
                      <Typography className="font-bold w-24">
                        Vị trí:
                      </Typography>
                      <ListItemText primary={trainer.positionName} />
                    </ListItem>
                    <Divider />
                  </List>
                )}
              </SubCard>
            </FormGroup>

            <FormGroup>
              <Label>
                <span className="text-xl font-bold">Thực tập sinh</span>
              </Label>
              <Autocomplete
                value={null}
                disablePortal={false}
                id="combo-box-demo"
                options={unassigned}
                blurOnSelect={true}
                clearOnBlur={true}
                getOptionLabel={(option) =>
                  option.firstName + " " + option.lastName + " " + option.email + " " + option.positionName
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

              <SubCard sx={{ maxHeight: "200px", overflowY: "auto" }}>
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
              onClick={() => handleTrainerAssignment()}
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

export default TrainerAssignmentPage;
