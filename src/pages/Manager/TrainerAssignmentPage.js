import React, { Fragment, useEffect, useState } from "react";
import FormRow from "components/common/FormRow";
import FormGroup from "components/common/FormGroup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "components/label";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import axios from "api/axios";
import { apiURL } from "config/config";
import useOnChange from "hooks/useOnChange";
import { Card, Chip, Stack } from "@mui/material";
import { IconProfile } from "components/icons";

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

  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useOnChange(500);
  useEffect(() => {
    async function fetchCountries() {
      if (!filterCountry) return;
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${filterCountry}`
        );
        setCountries(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchCountries();
  }, [filterCountry]);

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
                      onChange={setFilterCountry}
                    ></Dropdown.Search>
                    {countries.length > 0 &&
                      countries.map((country) => (
                        <Dropdown.Option
                          key={country?.name?.common}
                          onClick={() =>
                            handleSelectDropdownOption(
                              "trainer",
                              country?.name?.common
                            )
                          }
                        >
                          {country?.name?.common}
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
                      <Chip key={item} label={item} icon={<IconProfile />}>
                        <button
                          type="button"
                          className="button"
                          onClick={() => handleDelete(item)}
                        >
                          &times;
                        </button>
                      </Chip>
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
