import useAxiosPrivate from "logic/hooks/useAxiosPrivate";
import { useState } from "react";
import MainCard from "views/components/cards/MainCard";
import { Card, CardActions, CardContent } from "@mui/material";
import FormRow from "views/components/common/FormRow";
import TextField from '@mui/material/TextField';
import { LoadingButton } from "@mui/lab";
import { changePasswordValid } from "logic/utils/validateUtils";
import { userPath } from "logic/api/apiUrl";
import { accountNoti } from "logic/constants/notification";
import { toast } from "react-toastify";
import { logOut } from "logic/utils/auth";
import { useDispatch } from "react-redux";
import { authUpdateUser } from "logic/store/auth/auth-slice";
import { Label } from "views/components/label";
import FormGroup from "views/components/common/FormGroup";

const ChangPassword = () => {
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(false); // New loading state
  const [error, setError] = useState({}); // New error state
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const dispatch = useDispatch();

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
        toast.error(error.response.data);
        setIsLoading(false);
      }
    };
    setIsLoading(false);
  };


  return (
    <MainCard
      title="Đổi mật khẩu"
    >
      <Card>
        <CardContent>
          <FormRow>
            <FormGroup>
              <Label>Mật khẩu hiện tại (*)</Label>
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
            onClick={() => handleNewPasswordSubmit()}>
            Cập nhật
          </LoadingButton>
        </CardActions>
      </Card>
    </MainCard>
  );
};

export default ChangPassword;
