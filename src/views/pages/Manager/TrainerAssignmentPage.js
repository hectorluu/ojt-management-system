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
import { Card, Checkbox, Chip, FormControlLabel, Stack } from "@mui/material";
import { IconProfile } from "views/components/icons";
import { userPath } from "logic/api/apiUrl";
import { defaultPageIndex } from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";

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
      toast.success("Assign trainer successfully");
      resetValues();
    } catch (error) {
      toast.error("Can not Assign trainer");
    }
    // values
  };

  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value);
  };

  const [trainers, setTrainers] = useState([]);
  const [page] = React.useState(defaultPageIndex);
  const [rowsPerPage] = React.useState(100000);
  const axiosPrivate = useAxiosPrivate();
  const [filterTrainers, setFilterTrainers] = useOnChange(500);

  useEffect(() => {
    async function fetchTrainers() {
      if (!filterTrainers) return;
      try {
        const response = await axiosPrivate.get(
          userPath.GET_TRAINER_LIST +
            "?PageIndex=" +
            page +
            "&PageSize=" +
            rowsPerPage
        );

        setTrainers(response.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchTrainers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTrainers]);

  ////
  /// create chip
  ////

  const [items, setItems] = useState([]);
  const [traineeGmailValue, setTraineeGmailValue] = useState("");
  const [error, setError] = useState(null);

  const handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      var trimmedValue = traineeGmailValue.trim();

      if (trimmedValue && isValid(trimmedValue)) {
        setItems((prevItems) => [...prevItems, trimmedValue]);
        setTraineeGmailValue("");
      }
    }
  };

  const handleChange = (evt) => {
    setTraineeGmailValue(evt.target.value);
    setError(null);
  };

  const handleDelete = (item) => {
    setItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  const handlePaste = (evt) => {
    evt.preventDefault();
    var paste = evt.clipboardData.getData("text");
    // eslint-disable-next-line
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter((email) => !isInList(email));
      setItems((prevItems) => [...prevItems, ...toBeAdded]);
    }
  };

  const isValid = (email) => {
    let error = null;

    if (isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      setError(error);
      return false;
    }

    return true;
  };

  const isInList = (email) => {
    return items.includes(email);
  };

  const isEmail = (email) => {
    //eslint-disable-next-line
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  };
  /////

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
                      placeholder="Tìm kiếm..."
                      onChange={setFilterTrainers}
                    ></Dropdown.Search>
                    {trainers.length > 0 &&
                      trainers.map((trainer) => (
                        <Dropdown.Option
                          key={trainer?.id}
                          onClick={() =>
                            handleSelectDropdownOption(
                              "trainer",
                              trainer?.fullName
                            )
                          }
                        >
                          {trainer?.fullName}
                        </Dropdown.Option>
                      ))}
                  </Dropdown.List>
                </Dropdown>
              </FormGroup>

              <FormGroup>
                <Label>Email Thực tập sinh</Label>

                <Card sx={{ minWidth: 275, minHeight: 300 }}>
                  <input
                    className={"input" + (error ? " has-error" : "")}
                    value={traineeGmailValue}
                    placeholder="Type or paste email addresses and press `Enter`..."
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    onPaste={handlePaste}
                  />

                  {error && <p className="error">{error}</p>}

                  <Stack>
                    {items.map((item) => (
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label={
                          <Chip key={item} label={item} icon={<IconProfile />}>
                            <button
                              type="button"
                              className="button"
                              onClick={() => handleDelete(item)}
                            >
                              &times;
                            </button>
                          </Chip>
                        }
                      ></FormControlLabel>
                    ))}
                  </Stack>
                </Card>
              </FormGroup>
            </FormRow>
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
              >
                Phân công{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default TrainerAssignmentPage;
