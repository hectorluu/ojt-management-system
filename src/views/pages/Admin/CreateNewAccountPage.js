//eslint-disable-next-line
import { Fragment, use, useEffect, useState } from "react";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "views/components/label";
import { Button } from "views/components/button";
import ImageUpload from "views/components/image/ImageUpload";
import {
  genderOptions,
  roleOptions,
  skillLevel,
  defaultUserIcon,
} from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import {
  ojtBatchPath,
  positionPath,
  skillPath,
  universityPath,
  userPath,
} from "logic/api/apiUrl";
import { roleExchange } from "logic/constants/global";
import { storage } from "logic/config/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { accountNoti } from "logic/constants/notification";
import { accountValid } from "logic/utils/validateUtils";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Autocomplete, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";


const CreateNewAccountPage = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [role, setRole] = useState("");
  const [birthday, setBirthDay] = useState();
  const [avatar, setAvatar] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [userRoleWhenChosen, setUserRoleWhenChosen] = useState("");
  const [createSkills, setCreateSkills] = useState([
    { skillId: "", level: "" },
  ]);
  const [skillList, setSkillList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [position, setPosition] = useState();
  const [filteredSkillList, setFilteredSkillList] = useState([]);
  const [universityId, setUniversityId] = useState(0);
  const [universityList, setUniversityList] = useState([]);
  const [ojtBatchList, setOjtBatchList] = useState([{ id: "", name: "" }]);
  const [batchId, setBatchId] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (userRoleWhenChosen && userRoleWhenChosen === roleExchange.TRAINEE) {
      fetchSkills();
      fetchPositions();
      fetchUniversities();
    }
    if (userRoleWhenChosen && userRoleWhenChosen === roleExchange.TRAINER) {
      fetchPositions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRoleWhenChosen]);

  useEffect(() => {
    fetchOJTBatchs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universityId]);

  useEffect(() => {
    removeItems(createSkills, skillList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createSkills]);

  useEffect(() => {
    if (avatarUrl) {
      handleAddNewAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarUrl]);

  const removeItems = (rmItems, items) => {
    const filteredItems = items.filter(
      (item) => !rmItems.some((rmItem) => item.id === rmItem.skillId)
    );

    // Update the state with the filtered items
    setFilteredSkillList(filteredItems);
  };

  const fetchSkills = async () => {
    try {
      const response = await axiosPrivate.get(
        skillPath.GET_SKILL_LIST + "?PageSize=" + 100000 + "&PageIndex=" + 1
      );
      setSkillList(response.data.data);
      setFilteredSkillList(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await axiosPrivate.get(
        positionPath.GET_POSITION_LIST +
        "?PageSize=" +
        100000 +
        "&PageIndex=" +
        1
      );
      setPositionList(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const fetchOJTBatchs = async () => {
    try {
      const response = await axiosPrivate.get(
        ojtBatchPath.GET_OJT_BATCH_LIST_OF_UNIVERSITY +
        "/" +
        universityId +
        "?PageSize=" +
        100000 +
        "&PageIndex=" +
        1
      );
      setOjtBatchList(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  const fetchUniversities = async () => {
    try {
      const response = await axiosPrivate.get(
        universityPath.GET_UNIVERSITY_LIST + "?id=" + universityId + "&PageSize=" + 100000 + "&PageIndex=" + 1
      );
      setUniversityList(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  async function uploadFile() {
    setIsLoading(true);
    const account = {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      gender,
      role,
      position,
      rollNumber,
      batchId,
      studentCode,
      birthday,
      createSkills,
      avatarUrl,
    };
    const valid = accountValid(account);
    setError(valid);

    let check = false;

    for (const key in valid) {
      if (key !== "createSkills" && valid[key] !== "") {
        check = true;
        break; // If any non-empty value is found, exit the loop
      } else if (key === "createSkills" && Array.isArray(valid[key])) {
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
      if (avatar) {
        try {
          const imageRef = ref(storage, "images/users/" + avatar.name);
          await uploadBytes(imageRef, avatar).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((downloadURL) => {
              setAvatarUrl(downloadURL);
            });
          });
        } catch (e) {
          toast.error("Upload img error");
        }
      } else {
        setAvatarUrl(defaultUserIcon);
      }
    }
    setIsLoading(false);
  }

  const handleAddNewAccount = async () => {
    try {
      if (createSkills[0].skillId) {
        await axiosPrivate.post(userPath.CREATE_USER, {
          firstName,
          lastName,
          phoneNumber,
          email,
          address,
          gender,
          role,
          position,
          rollNumber,
          batchId,
          studentCode,
          birthday,
          createSkills,
          avatarUrl,
        });
      } else {
        await axiosPrivate.post(userPath.CREATE_USER, {
          firstName,
          lastName,
          phoneNumber,
          email,
          address,
          gender,
          role,
          position,
          rollNumber,
          birthday,
          avatarUrl,
        });
      }
      toast.success(accountNoti.SUCCESS.CREATE);
      setIsLoading(false);
      navigate("/account-list");
    } catch (error) {
      reset();
      toast.error(error?.response?.data);
      setIsLoading(false);
    }
  };

  const handleSelectRoleDropdownOption = (value) => {
    setUserRoleWhenChosen(() => value);
    setRole(value);
    setAvatar(null);
    setPosition(undefined);
    setRollNumber(undefined);
    setBatchId("");
    setError([]);
    setCreateSkills([{ skillId: "", initLevel: "" }]);
  };

  const handleAddField = () => {
    if (
      filteredSkillList.length > 0 &&
      createSkills.length < skillList.length
    ) {
      const newField = {
        skillId: "",
        initLevel: "",
      };
      setCreateSkills([...createSkills, newField]);
    } else {
      toast.error(accountNoti.ERROR.SKILL_OVERFLOW);
    }
  };

  const handleRemoveField = (index) => {
    let temp = createSkills.slice();
    temp.pop();
    setCreateSkills(temp);
  };

  const onChangeUserSkill = (index, name, value) => {
    const newArray = createSkills.slice();
    newArray[index][name] = value;
    setCreateSkills(newArray);
  };

  return (
    <Fragment>
      <div className="bg-white rounded-xl py-10 px-[66px]">
        <div className="text-center">
          <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
            Tạo tài khoản mới
          </h1>
          <form onSubmit={handleSubmit(uploadFile)}>
            <FormRow>
              <FormGroup>
                <Label>Họ (*)</Label>
                <TextField
                  error={error?.lastName ? true : false}
                  helperText={error?.lastName}
                  name="lastName"
                  placeholder="Họ"
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={(e) => setLastName(e.target.value)}
                  inputProps={{ maxLength: 100 }} />
              </FormGroup>
              <FormGroup>
                <Label>Tên (*)</Label>
                <TextField
                  error={error?.firstName ? true : false}
                  helperText={error?.firstName}
                  name="firstName"
                  placeholder="Tên"
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={(e) => setFirstName(e.target.value)}
                  inputProps={{ maxLength: 100 }} />
              </FormGroup>
              <FormGroup>
                <Label>Số điện thoại (*)</Label>
                <TextField
                  error={error?.phoneNumber ? true : false}
                  helperText={error?.phoneNumber}
                  name="phoneNumber"
                  placeholder="1234567890"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onBlur={(e) => setPhoneNumber(e.target.value)}
                  inputProps={{ maxLength: 20 }} />
              </FormGroup>
            </FormRow>
            {/* This is the line to separate between section */}
            <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
            <FormRow>
              <FormGroup>
                <Label>Email (*)</Label>
                <TextField
                  error={error?.email ? true : false}
                  helperText={error?.email}
                  name="email"
                  placeholder="admin@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => setEmail(e.target.value)}
                  inputProps={{ maxLength: 100 }} />
              </FormGroup>
              <FormGroup>
                <Label>Địa chỉ (*)</Label>
                <TextField
                  error={error?.address ? true : false}
                  helperText={error?.address}
                  name="address"
                  placeholder="Ex: số 54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội..."
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={(e) => setAddress(e.target.value)}
                  inputProps={{ maxLength: 50 }} />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Giới tính (*)</Label>
                <Autocomplete
                  disablePortal={false}
                  id="combo-box-demo"
                  options={genderOptions}
                  renderInput={(params) => <TextField {...params} placeholder="Chọn giới tính" error={error?.gender ? true : false} helperText={error?.gender} />}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setGender(newValue.value);
                    } else {
                      setGender("");
                    }
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Ngày sinh (*)</Label>
                <DatePicker
                  onChange={(newValue) => setBirthDay(newValue.toDate())}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: error?.birthday ? true : false,
                      helperText: error?.birthday,
                      readOnly: true,
                    },
                  }}
                />
              </FormGroup>
            </FormRow>
            {/* This is the line to separate between section */}
            <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
            <FormRow>
              <FormGroup>
                <Label>Chức vụ (*)</Label>
                <Autocomplete
                  disablePortal={false}
                  id="combo-box-demo"
                  options={roleOptions}
                  renderInput={(params) => <TextField {...params} placeholder="Chọn chức vụ" error={error?.role ? true : false} helperText={error?.role} />}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      handleSelectRoleDropdownOption(newValue.value);
                    } else {
                      handleSelectRoleDropdownOption("");
                    }
                  }}
                />
              </FormGroup>
            </FormRow>
            {userRoleWhenChosen &&
              (userRoleWhenChosen === roleExchange.TRAINER ||
                userRoleWhenChosen === roleExchange.TRAINEE) && (
                <>
                  <FormRow>
                    <FormGroup>
                      <Label>Mã số nhân viên (*)</Label>
                      <TextField
                        error={error?.rollNumber ? true : false}
                        helperText={error?.rollNumber}
                        name="rollNumber"
                        placeholder="Ex: KNS1234"
                        onChange={(e) => setRollNumber(e.target.value)}
                        onBlur={(e) => setRollNumber(e.target.value)}
                        inputProps={{ maxLength: 20 }} />
                    </FormGroup>
                    <FormGroup>
                      <Label>Vị trí (*)</Label>
                      <Autocomplete
                        disablePortal={false}
                        id="combo-box-demo"
                        options={positionList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} placeholder="Chọn vị trí" error={error?.position ? true : false} helperText={error?.position} />}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setPosition(newValue.id);
                          } else {
                            setPosition("");
                          }
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                      />
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
              userRoleWhenChosen === roleExchange.TRAINEE && (
                <>
                  <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
                  <FormGroup>
                    <Label>Tên trường (*)</Label>
                    <Autocomplete
                      disablePortal={false}
                      id="combo-box-demo"
                      options={universityList}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => <TextField {...params} placeholder="Chọn trường đại học" />}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setUniversityId(newValue.id);
                        } else {
                          setUniversityId("");
                        }
                      }}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                    />
                  </FormGroup>
                  <FormRow>
                    <FormGroup>
                      <Label>Mã số sinh viên (*)</Label>
                      <TextField
                        error={error?.studentCode ? true : false}
                        helperText={error?.studentCode}
                        name="studentCode"
                        placeholder="Ex: SE150056"
                        onChange={(e) => setStudentCode(e.target.value)}
                        onBlur={(e) => setStudentCode(e.target.value)}
                        inputProps={{ maxLength: 20 }} />
                    </FormGroup>
                    <FormGroup>
                      <Label>Kì thực tập (*)</Label>
                      <Autocomplete
                        disablePortal={false}
                        id="combo-box-demo"
                        options={ojtBatchList}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} placeholder="Chọn kì thực tập" error={error?.batchId ? true : false} helperText={error?.batchId} />}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setBatchId(newValue.id);
                          } else {
                            setBatchId("");
                          }
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                      />
                    </FormGroup>
                  </FormRow>
                  <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>
                  {createSkills.map((userSkill, index) => (
                    <div key={index}>
                      <FormRow>
                        <FormGroup>
                          <Label>Kỹ năng (*)</Label>
                          <Autocomplete
                            disablePortal={false}
                            id="combo-box-demo"
                            options={filteredSkillList}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} placeholder="Chọn kỹ năng"
                              error={error?.createSkills?.[index]?.skillId ? true : false} helperText={error?.createSkills?.[index]?.skillId} />}
                            onChange={(event, newValue) => {
                              if (newValue) {
                                onChangeUserSkill(index, "skillId", newValue.id);
                              } else {
                                onChangeUserSkill(index, "skillId", "");
                              }
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Trình độ (*)</Label>
                          <Autocomplete
                            disablePortal={false}
                            id="combo-box-demo"
                            options={skillLevel}
                            renderInput={(params) => <TextField {...params} placeholder="Chọn trình độ" type="number"
                              error={error?.createSkills?.[index]?.initLevel ? true : false} helperText={error?.createSkills?.[index]?.initLevel} />}
                            onChange={(event, newValue) => {
                              if (newValue) {
                                onChangeUserSkill(
                                  index,
                                  "initLevel",
                                  newValue.value
                                )
                              } else {
                                onChangeUserSkill(
                                  index,
                                  "initLevel",
                                  ""
                                )
                              }
                            }}
                          />
                        </FormGroup>
                      </FormRow>
                    </div>
                  ))}
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton color="error" aria-label="delete" onClick={() => handleRemoveField()}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="delete" onClick={() => handleAddField()}>
                      <AddIcon />
                    </IconButton>
                  </Stack>
                </>
              )}
            <div className="mt-5 text-center">
              <Button
                type="submit"
                className="px-10 mx-auto text-white bg-primary"
                isLoading={isLoading}
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
