import React, { Fragment, useEffect, useState } from "react";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "views/components/label";
import { Dropdown } from "views/components/dropdown";
import { Button } from "views/components/button";
import axios from "logic/api/axios";
import { apiURL } from "logic/config/general-config/config";
import useOnChange from "logic/hooks/useOnChange";
import {
  Checkbox,
  Chip,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  Divider,
} from "@mui/material";
import { IconProfile } from "views/components/icons";
import { userPath } from "logic/api/apiUrl";
import { defaultPageIndex, genderOptions } from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import SubCard from "views/components/cards/SubCard";

const TrainerAssignmentPage = () => {
  const { handleSubmit, setValue, reset, watch } = useForm();

  const getDropdownLabel = (name, defaultValue = "") => {
    const value = watch(name) || defaultValue;
    return value;
  };
  const resetValues = () => {
    reset({});
  };

  const handleTrainerAssignment = async (values) => {
    try {
      await axios.post(`${apiURL}/campaigns`, {
        ...values,
      });
      toast.success("Phân công đào tạo thành công");
      resetValues();
    } catch (error) {
      toast.error("Không thể phân công đào tạo");
    }
    // values
  };

  const [trainerClicked, setTrainerClicked] = useState(0);

  const handleSelectDropdownOption = (name, value, id) => {
    setValue(name, value);
    setTrainerClicked(id);
  };

  const handleSelectTraineeDropdownOption = (name, value, newTrainee) => {
    setValue(name, value);

    // Check if trainee is already in the list
    const isDuplicate = trainees.some(
      (trainee) => trainee.id === newTrainee.id
    );

    // Check duplicate and no trainer is selected
    if (!isDuplicate && trainerClicked !== 0) {
      setTrainees((prevTrainees) => [...prevTrainees, newTrainee]);
    } else if (trainerClicked === 0) {
      toast.error("Bạn phải chọn đào tạo viên trước");
    } else {
      toast.error("Thực tập sinh đã tồn tại");
    }
  };

  const [trainers, setTrainers] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [page] = React.useState(defaultPageIndex);
  const [rowsPerPage] = React.useState(100000);
  const axiosPrivate = useAxiosPrivate();
  const [filterTrainers, setFilterTrainers] = useOnChange(500);
  const [filterTrainees, setFilterTrainees] = useOnChange(200);

  // fetch trainers
  useEffect(() => {
    async function fetchTrainers() {
      if (!filterTrainers) return;
      try {
        const response = await axiosPrivate.get(
          userPath.GET_TRAINER_LIST +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage +
            "&keyword=" +
            filterTrainers
        );

        setTrainers(response.data.data);
      } catch (error) {}
    }
    fetchTrainers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTrainers]);

  const [currentTrainer, setCurrentTrainer] = useState({});
  // get chosen trainer
  useEffect(() => {
    async function getCurrentTrainer() {
      try {
        const response = await axiosPrivate.get(
          userPath.GET_TRAINER_BY_ID + trainerClicked
        );

        setCurrentTrainer(response.data);
      } catch (error) {}
    }
    if (trainerClicked !== 0) getCurrentTrainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainerClicked]);

  // fetch Trainee with chosen trainer
  useEffect(() => {
    async function fetchTraineesByTrainer() {
      try {
        const response = await axiosPrivate.get(
          userPath.GET_TRAINEE_LIST_BY_TRAINER + trainerClicked
        );

        setTrainees(response.data.data);
      } catch (error) {}
    }
    fetchTraineesByTrainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainerClicked]);

  // search Trainee
  useEffect(() => {
    async function searchTrainees() {
      try {
        if (!filterTrainees) return;

        const response = await axiosPrivate.get(
          userPath.GET_TRAINEE_LIST +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage +
            "&keyword=" +
            filterTrainees
        );

        setSearchTraineeResults(response.data.data);
      } catch (error) {}
    }
    searchTrainees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTrainees]);

  /// create chip
  const handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
    }
  };

  const handlePaste = (evt) => {
    evt.preventDefault();
    var paste = evt.clipboardData.getData("text");
    // eslint-disable-next-line
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);
  };

  // Search trainee research
  const [searchTraineeResults, setSearchTraineeResults] = useState([]);

  // const handleDropdownItemClick = (trainee) => {
  //   setSearchTraineeResults([]);
  // };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Phân công đào tạo viên
          </h1>
          <form onSubmit={handleSubmit(handleTrainerAssignment)}>
            <FormRow>
              <FormGroup>
                <Label>Đào tạo viên</Label>
                <Dropdown>
                  <Dropdown.Select
                    placeholder={getDropdownLabel(
                      "trainer",
                      "Chọn đào tạo viên"
                    )}
                  ></Dropdown.Select>
                  <Dropdown.List>
                    <Dropdown.Search
                      placeholder="Nhập tên đào tạo viên"
                      onChange={setFilterTrainers}
                    ></Dropdown.Search>
                    {trainers.length > 0 &&
                      trainers.map((trainer) => (
                        <Dropdown.Option
                          key={trainer?.id}
                          onClick={() =>
                            handleSelectDropdownOption(
                              "trainer",
                              trainer?.firstName + " " + trainer?.lastName,
                              trainer?.id
                            )
                          }
                        >
                          {trainer?.firstName + " " + trainer?.lastName}
                        </Dropdown.Option>
                      ))}
                  </Dropdown.List>
                </Dropdown>
                <SubCard sx={{ minHeight: "200px" }}>
                  <h4 className="text-xl text-gray-900 font-bold text-left ml-2">
                    Thông tin đào tạo viên
                  </h4>
                  {Object.keys(currentTrainer).length !== 0 && (
                    <List className="mt-2 text-gray-700">
                      <ListItem className="flex border-y py-2">
                        <Typography className="font-bold w-24">
                          Họ và tên
                        </Typography>
                        <ListItemText
                          primary={
                            currentTrainer.firstName +
                            " " +
                            currentTrainer.lastName
                          }
                          consol
                        />
                      </ListItem>
                      <Divider />
                      <ListItem className="flex border-b py-2">
                        <Typography className="font-bold w-24">
                          Email:
                        </Typography>
                        <ListItemText primary={currentTrainer.email} />
                      </ListItem>
                      <Divider />
                      <ListItem className="flex border-b py-2">
                        <Typography className="font-bold w-24">
                          Giới tính:
                        </Typography>
                        <ListItemText
                          primary={
                            genderOptions.find(
                              (option) => option.value === currentTrainer.gender
                            )?.label
                          }
                        />
                      </ListItem>
                      <Divider />
                      <ListItem className="flex border-b py-2">
                        <Typography className="font-bold w-24">
                          Vị trí:
                        </Typography>
                        <ListItemText primary={currentTrainer.positionName} />
                      </ListItem>
                      <Divider />
                    </List>
                  )}
                </SubCard>
              </FormGroup>

              <FormGroup>
                <Label>Thực tập sinh</Label>
                <Dropdown>
                  <Dropdown.Select
                    placeholder={getDropdownLabel(
                      "trainee",
                      "Chọn thực tập sinh"
                    )}
                  ></Dropdown.Select>
                  <Dropdown.List>
                    <Dropdown.Search
                      placeholder=""
                      onChange={setFilterTrainees}
                      onKeyDown={handleKeyDown}
                      onPaste={handlePaste}
                    ></Dropdown.Search>
                    {searchTraineeResults.length > 0 &&
                      searchTraineeResults.map((trainee) => (
                        <Dropdown.Option
                          key={trainee?.id}
                          onClick={() =>
                            handleSelectTraineeDropdownOption(
                              "trainee",
                              trainee?.firstName + " " + trainee?.lastName,
                              trainee
                            )
                          }
                        >
                          {trainee?.firstName + " " + trainee?.lastName}
                        </Dropdown.Option>
                      ))}
                  </Dropdown.List>
                </Dropdown>

                {/* <Autocomplete
                  disablePortal
                  options={searchTraineeResults}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField onChange={() => setFilterTrainees} {...params} />
                  )}
                /> */}

                {/* {searchTraineeResults.length > 0 && (
                  <Dropdown>
                    <Dropdown.List>
                      {searchTraineeResults.map((trainee) => (
                        <Dropdown.Option
                          key={trainee?.id}
                          onClick={() => handleDropdownItemClick(trainee)}
                        >
                          {trainee.firstName + " " + trainee.lastName}
                          {console.log(trainee)}
                        </Dropdown.Option>
                      ))}
                    </Dropdown.List>
                  </Dropdown>
                )} */}

                <SubCard sx={{ minHeight: "200px" }}>
                  <Stack>
                    {trainees.map((trainee) => (
                      <Tooltip
                        title={trainee.email}
                        placement="right"
                        className="w-fit"
                      >
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label={
                            <Chip
                              key={trainee}
                              variant="contained"
                              sx={{ p: 1 }}
                              label={trainee.firstName + " " + trainee.lastName}
                              icon={<IconProfile />}
                            ></Chip>
                          }
                        ></FormControlLabel>
                      </Tooltip>
                    ))}
                  </Stack>
                </SubCard>
              </FormGroup>
            </FormRow>
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
              >
                Lưu thay đổi{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default TrainerAssignmentPage;
