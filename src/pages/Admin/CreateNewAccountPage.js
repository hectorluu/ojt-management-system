import React, { Fragment, useState } from "react";
import FormRow from "components/common/FormRow";
import FormGroup from "components/common/FormGroup";
import DatePicker from "react-date-picker";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "components/label";
import { Input } from "components/input";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import { apiURL } from "config/config";
import { genderOptions } from "constants/global";

const CreateNewAccountPage = () => {
  const [dateOfBirth, setDateOfBith] = useState(new Date());

  const { handleSubmit, control, setValue, reset, watch } = useForm();
  const getDropdownLabel = (name, defaultValue = "") => {
    const value = watch(name) || defaultValue;
    return value;
  };

  const resetValues = () => {
    setDateOfBith("");
    reset({});
  };

  const handleAddNewAccount = async (values) => {
    try {
      await axios.post(`${apiURL}/`, {
        ...values,
        dateOfBirth,
      });
      toast.success("Create account successfully");
      resetValues();
    } catch (error) {
      toast.error("Can not create new account");
    }
    // values, dateOfBirth
  };

  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value);
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Tạo tài khoản mới
          </h1>
          <form onSubmit={handleSubmit(handleAddNewAccount)}>
            <FormRow>
              <FormGroup>
                <Label>Họ và tên (*)</Label>
                <Input
                  control={control}
                  name="name"
                  placeholder="Họ và tên đầy đủ"
                  autoComplete="off"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Số điện thoại (*)</Label>
                <Input
                  control={control}
                  name="phone num"
                  placeholder="123-456-7890"
                  autoComplete="off"
                ></Input>
              </FormGroup>
            </FormRow>
            {/* This is the line to separate between section */}
            <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
            <FormRow>
              <FormGroup>
                <Label>Email (*)</Label>
                <Input
                  control={control}
                  name="email"
                  placeholder="admin@gmail.com"
                  autoComplete="off"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Mật khẩu (*)</Label>
                <Input
                  type="password"
                  control={control}
                  name="password"
                  placeholder=""
                  autoComplete="off"
                ></Input>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Địa chỉ (*)</Label>
                <Input
                  control={control}
                  name="goal"
                  placeholder="Ex: số 54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội..."
                ></Input>
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Giới tính (*)</Label>
                <Dropdown>
                  <Dropdown.Select
                    placeholder={getDropdownLabel(
                      "Giới tính",
                      "Chọn giới tính"
                    )}
                  ></Dropdown.Select>
                  <Dropdown.List>
                    {genderOptions.map((personGender) => (
                      <Dropdown.Option
                        key={personGender.value}
                        onClick={() =>
                          handleSelectDropdownOption(
                            "Giới tính",
                            personGender.value
                          )
                        }
                      >
                        <span className="capitalize">{personGender.label}</span>
                      </Dropdown.Option>
                    ))}
                  </Dropdown.List>
                </Dropdown>
                <FormGroup>
                  <Label>Ngày sinh (*)</Label>
                  <DatePicker
                    onChange={setDateOfBith}
                    value={dateOfBirth}
                    format="dd-MM-yyyy"
                    autoComplete="off"
                  />
                </FormGroup>
              </FormGroup>
            </FormRow>
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
              >
                Bước tiếp theo{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateNewAccountPage;
