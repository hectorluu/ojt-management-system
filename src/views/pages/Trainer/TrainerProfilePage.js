import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Stack,
  Avatar,
  useTheme,
  Typography,
  Autocomplete,
} from "@mui/material";
import MainCard from "views/components/cards/MainCard";
import DatePicker from "react-date-picker";
import { Label } from "views/components/label";
import { defaultUserIcon, genderOptions } from "logic/constants/global";
import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { userPath } from "logic/api/apiUrl";
import FormRow from "views/components/common/FormRow";
import FormGroup from "views/components/common/FormGroup";
import { useForm } from "react-hook-form";
import { accountNoti } from "logic/constants/notification";
import { toast } from "react-toastify";
import { accountValid } from "logic/utils/validateUtils";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "logic/config/firebase/firebase";

const TrainerProfilePage = () => {
  const axiosPrivate = useAxiosPrivate();

  const [user, setUser] = useState([]);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [birthday, setBirthDay] = useState();
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const { handleSubmit, getValues } = useForm();

  useEffect(() => {
    async function fetchUserDetail() {
      try {
        const response = await axiosPrivate.get(userPath.GET_PERSONAL_USER);
        setUser(response.data);
      } catch (error) {}
    }
    fetchUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateAccount = async (values) => {
    try {
      await axiosPrivate.post(userPath.CREATE_USER, {
        firstName,
        lastName,
        phoneNumber,
        address,
        gender,
        birthday,
        avatarUrl,
      });

      toast.success(accountNoti.SUCCESS.UPDATE);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (avatarUrl) {
      handleUpdateAccount(getValues());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarUrl]);

  async function uploadFile() {
    setIsLoading(true);
    const account = {
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      birthday,
      avatarUrl,
    };
    const valid = accountValid(account);
    setError(valid);
    if (Object.keys(valid).length === 0) {
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

  const handleNewPasswordSubmit = async (values) => {
    try {
      toast.success(accountNoti.SUCCESS.UPDATE_PASSWORD);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error);
      setIsLoading(false);
    }
  };

  const userAvatar = user?.avatarUrl || defaultUserIcon;
  const theme = useTheme();

  return (
    <MainCard title="Hồ sơ">
      <form onSubmit={handleSubmit(uploadFile)}>
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
                {user.firstName + " " + user.lastName}
              </Typography>
            </div>

            <div className="flex justify-center items-center mt-2">
              <Button
                variant="outlined"
                className="mt-1 p-2 rounded-lg bg-white"
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
                  error={error?.lastName ? true : false}
                  helperText={error?.lastName}
                  name="lastName"
                  placeholder="Họ"
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={(e) => setLastName(e.target.value)}
                  value={user.firstName}
                />
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
                  value={user.lastName}
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Email (*)</Label>
                <TextField
                  name="email"
                  value={user.email}
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
                  value={user.phoneNumber}
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
                value={user.address}
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label>Giới tính (*)</Label>
                <Autocomplete
                  disablePortal={false}
                  id="combo-box-demo"
                  options={genderOptions}
                  value={user.gender}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={user.gender}
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
                  value={user.birthday}
                  onChange={(newValue) => setBirthDay(newValue.toDate())}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      error: error?.birthday ? true : false,
                      helperText: error?.birthday,
                    },
                  }}
                />
              </FormGroup>
            </FormRow>
            {/* This is the line to separate between section */}
            <div className="w-full rounded-full bg-black h-[5px] mb-6"></div>

            <FormRow>
              <FormGroup>
                <Label>Mã số nhân viên (*)</Label>
                <TextField
                  name="email"
                  value={user.rollNumber}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>Vị trí (*)</Label>
                <TextField
                  name="positionName"
                  value={user.positionName}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormGroup>
            </FormRow>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end", mt: -4 }}>
            <Button variant="contained" component={"label"}>
              Cập nhật
            </Button>
          </CardActions>
        </Card>
      </form>
      <Divider />
      <form onSubmit={handleNewPasswordSubmit}>
        <Card>
          <CardHeader sx={{ mb: -2 }} title="Đổi mật khẩu" />
          <CardContent>
            <FormRow>
              <FormGroup>
                <Label>Mật khẩu hiện tại (*)</Label>
                <TextField name="currentpassword" />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Mật khẩu mới (*)</Label>
                <TextField name="newpassword" />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label>Nhập lại mật khẩu mới (*)</Label>
                <TextField name="confirm" />
              </FormGroup>
            </FormRow>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end", mt: -4 }}>
            <Button variant="contained" component={"label"}>
              Cập nhật
            </Button>
          </CardActions>
        </Card>
      </form>
    </MainCard>
  );
};

export default TrainerProfilePage;
