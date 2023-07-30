//eslint-disable-next-line
import React, { Fragment, useEffect, useState } from "react";
import FormRow from "components/common/FormRow";
import FormGroup from "components/common/FormGroup";
import DatePicker from "react-date-picker";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "components/label";
import { Input } from "components/input";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import ImageUpload from "components/image/ImageUpload";
import { genderOptions, roleOptions, positionOptions, skillLevel } from "constants/global";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { skillPath, userPath } from "api/apiUrl";
import { roleExchange } from "constants/global";
import moment from "moment";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { accountNoti } from "constants/notification";

const CreateNewAccountPage = () => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [avatar, setAvatar] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [userSkill, setUserSkill] = useState([{"skillId": "", "level": ""}]);
  const [skillList, setSkillList] = useState([]);
  const [filteredSkillList, setFilteredSkillList] = useState([]);

  const { handleSubmit, control, setValue, reset, watch } = useForm();

  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    removeItems(userSkill, skillList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSkill]);

  const removeItems = (rmItems, items) => {
    const filteredItems = items.filter((item) => !rmItems.some((rmItem) => item.id === rmItem.skillId));
  
    // Update the state with the filtered items
    setFilteredSkillList(filteredItems);
  };

  const fetchSkills = async () => {
    try {
      const response = await axiosPrivate.get(
        skillPath.GET_SKILL_LIST +
        "?PageSize=" +
        100000 +
        "&PageIndex=" +
        1
      );
      setSkillList(response.data.data);
      setFilteredSkillList(response.data.data);
    } catch (error) {
      console.log("fetchSkills ~ error", error);
    }
  };

  const getDropdownLabel = (
    name,
    options = [{ value: "", label: "" }],
    defaultValue = ""
  ) => {
    const value = watch(name) || defaultValue;
    const label = options.find((label) => label.value === value);
    return label ? label.label : defaultValue;
  };

  const resetValues = () => {
    setDateOfBirth("");
    reset({});
  };

  async function uploadFile() {
    const imageRef = ref(storage, "images/" + avatar.name);
    uploadBytes(imageRef, avatar).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setValue("avatarUrl", downloadURL);
      });
    });
  }

  const handleAddNewAccount = async (values) => {
    try {
      uploadFile();
      const birthday = moment(dateOfBirth).format("DD/MM/YYYY");
      await axiosPrivate.post(userPath.CREATE_USER, {
        ...values,
        birthday,
      });
      toast.success("Create account successfully with password ");
      resetValues();
    } catch (error) {
      console.log("error", error);
      toast.error("Can not create new account");
    }
  };

  const handleSelectDropdownOption = (name, value) => {
    setValue(name, value);
  };

  const [userRoleWhenChosen, setUserRoleWhenChosen] = useState("");

  const handleSelectRoleDropdownOption = (name, value) => {
    setUserRoleWhenChosen(() => value);
    setValue(name, value);
    setValue("rollNumber", "");
    setValue("position", "");
    setAvatar(null);
    setUserSkill([{"skillId": "", "level": ""}]);
  };

  const handleAddField = () => {
    if(filteredSkillList.length > 0 && userSkill.length < skillList.length){
      const newField = {
        skillId: "",
        level: "",
      };
      setUserSkill([...userSkill, newField]);
    }else{
      toast.error(accountNoti.ERROR.SKILL_OVERFLOW);
    }
  };

  const getSkillDropdownLabel = (index, name, options = [{ value: "", label: "" }], defaultValue = "") => {
    const skills = userSkill.slice();
    const value = skills[index][name] || defaultValue;
    const label = options.find((label) => label.id === value);
    return label ? label.name : defaultValue;
  };

  const getLevelDropdownLabel = (index, name, options = [{ value: "", label: "" }], defaultValue = "") => {
    const levels = userSkill.slice();
    const value = levels[index][name] || defaultValue;
    const label = options.find((label) => label.value === value);
    return label ? label.label : defaultValue;
  };

  const onChangeUserSkill = (index, name, value) => {
    const newArray = userSkill.slice();
    newArray[index][name] = value;
    setUserSkill(newArray);
    console.log(userSkill);
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
                  name="fullName"
                  placeholder="Họ và tên đầy đủ"
                  autoComplete="off"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label>Số điện thoại (*)</Label>
                <Input
                  control={control}
                  name="phoneNumber"
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
                <Label>Địa chỉ (*)</Label>
                <Input
                  control={control}
                  name="address"
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
                        <span className="capitalize">{personGender.label}</span>
                      </Dropdown.Option>
                    ))}
                  </Dropdown.List>
                </Dropdown>
              </FormGroup>
              <FormGroup>
                <Label>Ngày sinh (*)</Label>
                <DatePicker
                  name=""
                  onChange={setDateOfBirth}
                  value={dateOfBirth}
                  format="dd-MM-yyyy"
                  autoComplete="off"
                />
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
            {userRoleWhenChosen &&
              (userRoleWhenChosen === roleExchange.TRAINER ||
                userRoleWhenChosen === roleExchange.TRAINEE) && (
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
                      <Label>Tải ảnh lên</Label>
                      <ImageUpload onChange={setAvatar}></ImageUpload>
                    </FormGroup>

                    {avatar && (
                      <FormGroup>
                        <Label>Preview</Label>
                        <label className="w-full h-[200px] border border-gray-200 border-dashed rounded-xl cursor-pointer flex items-center justify-center">
                          <img
                            className="w-full h-full object-contain"
                            src={URL.createObjectURL(avatar)}
                            alt="img"
                          ></img>
                        </label>
                      </FormGroup>
                    )}
                  </FormRow>
                </>
              )}

            {userRoleWhenChosen &&
              (userRoleWhenChosen === roleExchange.TRAINEE) && (
                <>
                  <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
                  {userSkill.map((userSkill, index) => (
                    <FormRow key={index}>
                      <FormGroup>
                        <Label>Kỹ năng (*)</Label>
                        <Dropdown>
                          <Dropdown.Select
                            placeholder={getSkillDropdownLabel(index, "skillId", skillList, "Lựa chọn")}
                          ></Dropdown.Select>
                          <Dropdown.List>
                            {filteredSkillList.map((option) => (
                              <Dropdown.Option
                                key={option.id}
                                onClick={() =>
                                  onChangeUserSkill(index, "skillId", option.id)
                                }
                              >
                                <span className="capitalize">{option.name}</span>
                              </Dropdown.Option>
                            ))}
                          </Dropdown.List>
                        </Dropdown>
                      </FormGroup>
                      <FormGroup>
                        <Label>Trình độ (*)</Label>
                        <Dropdown>
                          <Dropdown.Select
                            placeholder={getLevelDropdownLabel(index, "level", skillLevel, "Lựa chọn")}
                          ></Dropdown.Select>
                          <Dropdown.List>
                            {skillLevel.map((option) => (
                              <Dropdown.Option
                                key={option.value}
                                onClick={() =>
                                  onChangeUserSkill(index, "level", option.value)
                                }
                              >
                                <span className="capitalize">{option.label}</span>
                              </Dropdown.Option>
                            ))}
                          </Dropdown.List>
                        </Dropdown>
                      </FormGroup>
                    </FormRow>
                  ))}
                  <button type="button" onClick={() => handleAddField()}>
                    Remove
                  </button>
                </>
              )}
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
              >
                Tạo tài khoản{" "}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateNewAccountPage;
