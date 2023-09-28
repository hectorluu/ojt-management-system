import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Avatar,
  useTheme,
  Typography,
  Autocomplete,
} from "@mui/material";
import MainCard from "views/components/cards/MainCard";
import { Label } from "views/components/label";
import {
  defaultUserIcon,
  genderOptions,
  roleExchange,
} from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { userPath } from "logic/api/apiUrl";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { accountNoti } from "logic/constants/notification";
import { toast } from "react-toastify";
import { changePasswordValid, profileValid } from "logic/utils/validateUtils";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
import ProfileSkeleton from "views/modules/account/ProfileSkeleton";
import { logOut } from "logic/utils/auth";
import { useDispatch } from "react-redux";
import { authUpdateUser } from "logic/store/auth/auth-slice";

const ManagerProfilePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [url, setUrl] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingLoading, setIsFetchingLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const moment = require("moment");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchUserDetail() {
    setIsFetchingLoading(true);
    try {
      const response = await axiosPrivate.get(userPath.GET_PERSONAL_USER);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setBirthday(response.data.birthday);
      setGender(response.data.gender);
      setPhoneNumber(response.data.phoneNumber);
      setAddress(response.data.address);
      setUrl(response.data.avatarURL);
      setIsFetchingLoading(false);
    } catch (error) {
      toast.error(error?.response?.data);
      setIsFetchingLoading(false);
    }
  }

  const handleUpdateAccount = async () => {
    if (avatarURL === "" || avatarURL === null || avatarURL === undefined) {
      setAvatarURL(url);
    }
    try {
      await axiosPrivate.put(userPath.UPDATE_PROFILE, {
        firstName,
        lastName,
        birthday,
        phoneNumber,
        gender,
        address,
        avatarURL,
      });
      toast.success(accountNoti.SUCCESS.UPDATE_PROFILE);
      setIsLoading(false);
      navigate("/trainer-dashboard");
    } catch (error) {
      toast.error(error?.response?.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (avatarURL) {
      handleUpdateAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarURL]);

  async function uploadFile() {
    setIsLoading(true);
    const birthdayConvert = new Date(birthday);
    const profile = {
      firstName,
      lastName,
      birthday: birthdayConvert,
      phoneNumber,
      gender,
      address,
    };
    const valid = profileValid(profile, roleExchange.TRAINER);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      if (avatar) {
        try {
          const imageRef = ref(storage, "images/users/" + avatar.name);
          await uploadBytes(imageRef, avatar).then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then((downloadURL) => {
              setAvatarURL(downloadURL);
            });
          });
        } catch (e) {
          toast.error("Upload img error");
        }
      } else {
        setAvatarURL(url);
      }
    }
    setIsLoading(false);
  }

  const handleNewPasswordSubmit = async () => {
    const request = {
      password,
      newPassword,
      confirm,
    };
    const valid = changePasswordValid(request);
    setError(valid);
    if (Object.keys(valid).length === 0) {
      try {
        await axiosPrivate.put(userPath.CHANGE_PASSWORD, {
          oldPassword: password,
          newPassord: newPassword,
        });
        toast.success(accountNoti.SUCCESS.UPDATE_PASSWORD);
        logOut();
        dispatch(authUpdateUser({}));
        setIsLoading(false);
      } catch (error) {
        toast.error(error?.response?.data);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const onImageChange = (file) => {
    setUrl(URL.createObjectURL(file));
    setAvatar(file);
  };

  const userAvatar = url || defaultUserIcon;
  const theme = useTheme();

  return (
    <MainCard title="Hồ sơ">
      {isFetchingLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <Card>
            <div className="relative w-full h-[100px] bg-gray-500 rounded"></div>
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
                  {firstName + " " + lastName}
                </Typography>
              </div>

              <div className="flex justify-center items-center mt-2">
                <input
                  id="image-updload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => onImageChange(e.target.files[0])}
                  className="hidden"
                />
                <Button
                  variant="outlined"
                  className="mt-1 p-2 rounded-lg bg-white"
                  onClick={() =>
                    document.getElementById("image-updload").click()
                  }
                >
                  <span className="mx-auto">Chọn ảnh</span>
                </Button>
              </div>
            </div>
            <CardHeader title="Thông tin cá nhân" />
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
                    inputProps={{ maxLength: 100 }}
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
                    inputProps={{ maxLength: 100 }}
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
                    inputProps={{ maxLength: 20 }}
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
                  inputProps={{ maxLength: 50 }}
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>Giới tính (*)</Label>
                  <Autocomplete
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

            <CardActions sx={{ justifyContent: "flex-end", mt: -4 }}>
              <LoadingButton
                variant="contained"
                component={"label"}
                onClick={() => uploadFile()}
                loading={isLoading}
              >
                Cập nhật
              </LoadingButton>
            </CardActions>
          </Card>
          <Divider />
          <Card>
            <CardHeader sx={{ mb: -2 }} title="Đổi mật khẩu" />
            <CardContent>
              <FormRow>
                <FormGroup>
                  <TextField
                    type="password"
                    error={error?.password ? true : false}
                    helperText={error?.password}
                    name="password"
                    placeholder="Mật khẩu..."
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label>Mật khẩu mới (*)</Label>
                  <TextField
                    type="password"
                    error={error?.newPassword ? true : false}
                    helperText={error?.newPassword}
                    name="newPassword"
                    placeholder="Mật khẩu mới..."
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={(e) => setNewPassword(e.target.value)}
                    inputProps={{ maxLength: 15 }}
                  />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label>Nhập lại mật khẩu mới (*)</Label>
                  <TextField
                    type="password"
                    error={error?.confirm ? true : false}
                    helperText={error?.confirm}
                    name="confirm"
                    placeholder="Nhập lại mật khẩu..."
                    onChange={(e) => setConfirm(e.target.value)}
                    onBlur={(e) => setConfirm(e.target.value)}
                    inputProps={{ maxLength: 15 }}
                  />
                </FormGroup>
              </FormRow>
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end", mt: -4 }}>
              <LoadingButton
                variant="contained"
                component={"label"}
                loading={isLoading}
                onClick={() => handleNewPasswordSubmit()}
              >
                Cập nhật
              </LoadingButton>
            </CardActions>
          </Card>
        </>
      )}
    </MainCard>
  );
};

export default ManagerProfilePage;
