import React, { useEffect, useState } from "react";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import { changePasswordWithCodeValid, resetPasswordValid } from "logic/utils/validateUtils";
import { Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import axios from "logic/api/axios";
import { authPath } from "logic/api/apiUrl";
import { toast } from "react-toastify";
import { authNoti } from "logic/constants/notification";
const SignInPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [cooldown, setCooldown] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [code, setCode] = useState("");
  const [submitError, setSubmitError] = useState({});
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSendCodeClick = async () => {
    setCooldown(true);
    setRemainingTime(30); // Set the cooldown duration in seconds
    const valid = resetPasswordValid(email);
    setError(valid);
    if (valid === "") {
      try {
        await axios.post(authPath.RESET_PASSWORD_CODE + email);
        toast.success(authNoti.SUCCESS.RESET_CODE);
      } catch (error) {
        console.log(error);
        toast.error(authNoti.ERROR.RESET_CODE);
        setIsLoading(false);
      }
    };
  };

  useEffect(() => {
    let interval;

    if (cooldown && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setCooldown(false);
      clearInterval(interval); // Clear the interval when countdown reaches 0
    }

    return () => {
      clearInterval(interval);
    };
  }, [cooldown, remainingTime]);

  const onSubmit = async () => {
    setIsLoading(true);
    const valid = changePasswordWithCodeValid({ code, password });
    setSubmitError(valid);
    if (Object.keys(valid).length === 0) {
      console.log("here");
      try {
        await axios.post(authPath.VERIFY_RESET_CODE, { resetCode: code });
        await axios.put(authPath.RESET_PASSWORD, { resetCode: code, newPassword: password });
        navigate("/login");
      } catch (error) {
        console.log(error);
        toast.error(authNoti.ERROR.WRONG_CODE);
        setIsLoading(false);
      }
    };
    setIsLoading(false);
  };


  return (
    <LayoutAuthentication heading="Đặt lại mật khẩu">
      <FormGroup>
        <Label htmlFor="email">Email *</Label>
        <Stack
          spacing={2}
          direction="row"
        >
          <TextField
            sx={{ width: "80%" }}
            error={error ? true : false}
            helperText={error}
            name="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmail(e.target.value)} />
          <Button
            component="label"
            variant="contained"
            sx={{ width: "20%" }}
            onClick={() => onSendCodeClick()}
            disabled={cooldown}
          >
            {cooldown ? `${remainingTime}s` : "Gửi mã"}
          </Button>
        </Stack>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Mã">
          Mã xác thực*
        </Label>
        <TextField
          error={submitError?.code ? true : false}
          helperText={submitError?.code}
          name="code"
          placeholder="ABCDEF"
          onChange={(e) => setCode(e.target.value)}
          onBlur={(e) => setCode(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="Mã">
          Mật khẩu mới *
        </Label>
        <TextField
          type="password"
          error={submitError?.password ? true : false}
          helperText={submitError?.password}
          name="password"
          placeholder="Nhập mật khẩu mới"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => setPassword(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <LoadingButton
          component="label"
          variant="contained"
          color="success"
          sx={{ height: "50px" }}
          loading={isLoading}
          onClick={() => onSubmit()}
        >Đổi mật khẩu</LoadingButton>
      </FormGroup>
    </LayoutAuthentication >
  );
};

export default SignInPage;
