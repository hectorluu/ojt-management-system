import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Button } from "views/components/button";
import {
  genderOptions,
  positionOptions,
  roleExchange,
  roleOptions,
} from "logic/constants/global";
import { userPath } from "logic/api/apiUrl";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";

import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import { Input } from "views/components/input";
import { Dropdown } from "views/components/dropdown";
import { useForm } from "react-hook-form";

const ModalUserDetailAdmin = ({ isOpen, onRequestClose, userIdClicked }) => {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axiosPrivate.get(
        userPath.GET_USER + userIdClicked
      );
      setUser(response.data);
    } catch (error) {
      console.log("fetchUser ~ error", error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdClicked]);

  const { control, setValue, watch } = useForm();

  const getDropdownLabel = (
    name,
    options = [{ value: "", label: "" }],
    defaultValue = ""
  ) => {
    const value = watch(name) || defaultValue;
    const label = options.find((label) => label.value === value);
    return label ? label.label : defaultValue;
  };

  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value);
  };

  const handleSelectRoleDropdownOption = (name, value) => {
    setValue(name, value);
    setValue("rollNumber", "");
    setValue("position", "");
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      className="modal-content w-full max-w-[1000px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-auto scroll-hidden"
    >
      <button
        className="absolute z-10 flex items-center justify-center cursor-pointer w-11 h-11 right-10 top-[10px] text-text1"
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
      <h2 className="font-bold text-[25px] mb-10 text-center">
        Thông tin chi tiết
      </h2>
      <div>
        <div className="bg-white shadow-1 rounded-xl w-full flex p-5">
          <div className="w-full">
            <form>
              <FormRow>
                <FormGroup>
                  <Label>Họ và tên (*)</Label>
                  <Input control={control} name="fullName" disabled>
                    {user.fullName}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Số điện thoại (*)</Label>
                  <Input control={control} name="phoneNumber">
                    {user.phoneNumber}
                  </Input>
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label>Email (*)</Label>
                  <Input control={control} name="email">
                    {user.email}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Địa chỉ (*)</Label>
                  <Input control={control} name="address">
                    {user.address}
                  </Input>
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label>Giới tính (*)</Label>
                  <Dropdown>
                    <Dropdown.Select
                      placeholder={getDropdownLabel(
                        "gender",
                        genderOptions,
                        "Chọn giới tính"
                      )}
                    ></Dropdown.Select>
                    <Dropdown.List>
                      {genderOptions.map((personGender) => (
                        <Dropdown.Option
                          key={personGender.value}
                          onClick={() =>
                            handleSelectDropdownOption(
                              "gender",
                              personGender.value
                            )
                          }
                        >
                          <span className="capitalize">
                            {personGender.label}
                          </span>
                        </Dropdown.Option>
                      ))}
                    </Dropdown.List>
                  </Dropdown>
                </FormGroup>
                <FormGroup>
                  <Label>Ngày sinh (*)</Label>
                  <Input
                    control={control}
                    name="address"
                    value={user.birthday}
                  ></Input>
                </FormGroup>
              </FormRow>
              {/* This is the line to separate between section */}
              <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
              <FormRow>
                <FormGroup>
                  <Label>Chức vụ (*)</Label>
                  <Dropdown>
                    <Dropdown.Select
                      placeholder={getDropdownLabel(
                        "role",
                        roleOptions,
                        "Chọn chức vụ"
                      )}
                    ></Dropdown.Select>
                    <Dropdown.List>
                      {roleOptions.map((personRole) => (
                        <Dropdown.Option
                          key={personRole.value}
                          onClick={() =>
                            handleSelectRoleDropdownOption(
                              "role",
                              personRole.value
                            )
                          }
                        >
                          <span className="capitalize">{personRole.label}</span>
                        </Dropdown.Option>
                      ))}
                    </Dropdown.List>
                  </Dropdown>
                </FormGroup>
              </FormRow>
              {(user.role === roleExchange.TRAINER ||
                user.role === roleExchange.TRAINEE) && (
                <>
                  <FormRow>
                    <FormGroup>
                      <Label>Mã số nhân viên (*)</Label>
                      <Input
                        control={control}
                        name="rollNumber"
                        placeholder="Ex: SE150056"
                        autoComplete="off"
                      ></Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Vị trí (*)</Label>
                      <Dropdown>
                        <Dropdown.Select
                          placeholder={getDropdownLabel(
                            "position",
                            positionOptions,
                            "Chọn vị trí"
                          )}
                        ></Dropdown.Select>
                        <Dropdown.List>
                          {positionOptions.map((personPosition) => (
                            <Dropdown.Option
                              key={personPosition.value}
                              onClick={() =>
                                handleSelectDropdownOption(
                                  "position",
                                  personPosition.value
                                )
                              }
                            >
                              <span className="capitalize">
                                {personPosition.label}
                              </span>
                            </Dropdown.Option>
                          ))}
                        </Dropdown.List>
                      </Dropdown>
                    </FormGroup>
                  </FormRow>
                  <FormRow>
                    <FormGroup>
                      <Label>Avatar</Label>
                      <label className="w-full h-[200px] border border-gray-200 border-dashed rounded-xl cursor-pointer flex items-center justify-center">
                        <img
                          className="w-full h-full object-contain"
                          src="logo.png"
                          alt="img"
                        ></img>
                      </label>
                    </FormGroup>
                  </FormRow>
                </>
              )}
              <div className="mt-5 text-center">
                <Button
                  type="submit"
                  className="px-10 mx-auto text-white bg-primary"
                >
                  Sửa thông tin{" "}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalUserDetailAdmin;
