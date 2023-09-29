import React, { useEffect, useState } from "react";
import {
  Typography,
  Avatar,
  useTheme,
  TextField,
  CardHeader,
  CardContent,
  Autocomplete,
} from "@mui/material";
import MainCard from "views/components/cards/MainCard";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { userPath } from "logic/api/apiUrl";
import { defaultUserIcon, genderOptions } from "logic/constants/global";
import { toast } from "react-toastify";

import AccountDetailSkeleton from "views/modules/account/AccountDetailSkeleton";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import { DatePicker } from "@mui/x-date-pickers";
import FormRow from "views/components/common/FormRow";

const AccountDetailPage = () => {
  const { userId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState([]);
  // const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [url, setUrl] = useState("");
  const [isFetchingLoading, setIsFetchingLoading] = useState(false);
  const [error] = useState({});

  const moment = require("moment");

  useEffect(() => {
    fetchUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchUserDetail() {
    setIsFetchingLoading(true);
    try {
      const response = await axiosPrivate.get(userPath.GET_USER + userId);
      setUser(response.data);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setBirthday(moment(response.data.birthday, "DD/MM/YYYY").toDate());
      setGender(response.data.gender);
      setPhoneNumber(response.data.phoneNumber);
      setAddress(response.data.address);
      setUrl(response.data.avatarUrl);
      setIsFetchingLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsFetchingLoading(false);
    }
  }

  // const handleUpdateAccount = async () => {
  //   if (avatarUrl === "" || avatarUrl === null || avatarUrl === undefined) {
  //     setAvatarUrl(url);
  //   }
  //   try {
  //     await axiosPrivate.put(userPath.UPDATE_PROFILE, {
  //       firstName,
  //       lastName,
  //       birthday,
  //       phoneNumber,
  //       gender,
  //       address,
  //       avatarUrl,
  //     });
  //     toast.success(accountNoti.SUCCESS.UPDATE_USER);
  //     setIsLoading(false);
  //   } catch (error) {
  //     toast.error(error.response.data);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (avatarUrl) {
  //     handleUpdateAccount();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [avatarUrl]);

  // async function uploadFile() {
  //   setIsLoading(true);

  //   if (avatar) {
  //     try {
  //       const imageRef = ref(storage, "images/users/" + avatar.name);
  //       await uploadBytes(imageRef, avatar).then(async (snapshot) => {
  //         await getDownloadURL(snapshot.ref).then((downloadURL) => {
  //           setAvatarUrl(downloadURL);
  //         });
  //       });
  //     } catch (e) {
  //       toast.error("Upload img error");
  //     }
  //   } else {
  //     setAvatarUrl(defaultUserIcon);
  //   }

  //   setIsLoading(false);
  // }

  // const onImageChange = (file) => {
  //   setUrl(URL.createObjectURL(file));
  //   setAvatar(file);
  // };

  const userAvatar = url || defaultUserIcon;
  const theme = useTheme();

  // const handleEditClick = () => {
  //   setIsEditing(!isEditing);
  // };

  return (
    <MainCard>
      {isFetchingLoading ? (
        <AccountDetailSkeleton />
      ) : (
        <>
          <div className="w-full h-[100px] bg-gray-500 rounded"></div>
          <div className="flex flex-col items-center -mt-20">
            <Avatar
              src={userAvatar}
              onError={(e) => {
                e.target.src = defaultUserIcon;
              }}
              sx={{
                ...theme.typography.mediumAvatar,
                margin: "8px 0 8px 8px !important",
                cursor: "pointer",
              }}
              className="w-32 h-32 border-4 border-white rounded-full pointer-events-none"
            />
            <div className="flex items-center space-x-2">
              <Typography variant="h3">
                {user?.firstName + " " + user?.lastName}
              </Typography>
            </div>
          </div>
          {/* {isEditing && (
            <div className="flex justify-center items-center mt-2">
              <input
                id="image-updload"
                type="file"
                accept="image/*"
                // onChange={(e) => onImageChange(e.target.files[0])}
                className="hidden"
              />
              <Button
                variant="outlined"
                className="mt-1 p-2 rounded-lg bg-white"
                onClick={() => document.getElementById("image-updload").click()}
              >
                <span className="mx-auto">Chọn ảnh</span>
              </Button>
            </div>
          )} */}

          <CardHeader title="Thông tin cá nhân" sx={{ mt: 2 }} />
          <CardContent sx={{ pt: 0 }}>
            <FormRow>
              <FormGroup>
                <Label>Họ (*)</Label>
                <TextField
                  error={error?.firstName ? true : false}
                  helperText={error?.firstName}
                  name="firstName"
                  placeholder="Họ"
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  inputProps={{ maxLength: 100, readOnly: true }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Tên (*)</Label>
                <TextField
                  error={error?.lastName ? true : false}
                  helperText={error?.lastName}
                  name="lastName"
                  placeholder="Tên"
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={(e) => setLastName(e.target.value)}
                  value={lastName}
                  inputProps={{ maxLength: 100, readOnly: true }}
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Email (*)</Label>
                <TextField
                  name="email"
                  value={email}
                  InputProps={{
                    readOnly: true,
                  }}
                />
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
                  value={phoneNumber}
                  inputProps={{ maxLength: 20, readOnly: true }}
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label>Địa chỉ (*)</Label>
              <TextField
                error={error?.address ? true : false}
                helperText={error?.address}
                name="address"
                placeholder="Ex: số 54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội..."
                onChange={(e) => setAddress(e.target.value)}
                onBlur={(e) => setAddress(e.target.value)}
                value={address}
                inputProps={{ maxLength: 50, readOnly: true }}
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label>Giới tính (*)</Label>
                <Autocomplete
                  readOnly
                  disablePortal={false}
                  id="combo-box-demo"
                  options={genderOptions}
                  value={
                    genderOptions.find((item) => item.value === gender) || {
                      value: 0,
                      label: "Chọn giới tính",
                    }
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Chọn giới tính"
                      error={error?.gender ? true : false}
                      helperText={error?.gender}
                    />
                  )}
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
                  value={moment(birthday)}
                  onChange={(newValue) => setBirthday(newValue.toDate())}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      error: error?.birthday ? true : false,
                      helperText: error?.birthday,
                      readOnly: true,
                    },
                  }}
                />
              </FormGroup>
            </FormRow>
          </CardContent>
          {/* {isEditing && (
            <div className="flex justify-center items-center mt-2">
              <LoadingButton
                variant="contained"
                component={"label"}
                onClick={() => {
                  // uploadFile();
                  setIsEditing(false);
                }}
                loading={isLoading}
              >
                Cập nhật
              </LoadingButton>
            </div>
          )}

          {!isEditing && (
            <div className="flex justify-center items-center ">
              <LoadingButton
                variant="contained"
                component={"label"}
                onClick={handleEditClick}
                loading={isLoading}
              >
                Chỉnh sửa
              </LoadingButton>
            </div>
          )} */}
        </>
      )}
    </MainCard>
  );
};

export default AccountDetailPage;
