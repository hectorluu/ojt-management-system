import useToggleValue from "logic/hooks/useToggleValue";
import React, { useState } from "react";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import FormGroup from "views/components/common/FormGroup";
import { Label } from "views/components/label";
import { IconEyeToggle } from "views/components/icons";
import { useDispatch } from "react-redux";
import { authLogin } from "logic/store/auth/auth-slice";
import { loginValid } from "logic/utils/validateUtils";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
const SignInPage = () => {
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  const dispatch = useDispatch();
  // const handleSignIn = (values) => {
  //   dispatch(authLogin(values));
  // };
  const handleSignIn = async () => {
    setIsLoading(true); // Set loading state
    const valid = loginValid({ email, password });
    setError(valid);
    if (Object.keys(valid).length === 0) {
      // Simulate a delay of 0.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 500));

      dispatch(authLogin({ email, password }));
    }
    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LayoutAuthentication heading="KNS OJT Management">
      <FormGroup>
        <Label htmlFor="email">Email *</Label>
        <TextField
          error={error.email ? true : false}
          helperText={error.email}
          name="email"
          placeholder="example@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Mật khẩu *</Label>
        <TextField
          error={error.password ? true : false}
          helperText={error.password}
          name="password"
          placeholder="Enter Password"
          type={`${showPassword ? "text" : "password"}`}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconEyeToggle
                open={showPassword}
                onClick={handleTogglePassword}
              ></IconEyeToggle>
            ),
          }} />
      </FormGroup>
      <FormGroup>
        <div className="text-right">
          <a href="/reset-password" className="inline-block text-sm font-medium text-primary underline hover:underline-offset-2">Quên mật khẩu?</a>
        </div>
      </FormGroup>
      <FormGroup>
        <LoadingButton
          component="label"
          loading={isLoading}
          onClick={() => handleSignIn()}
          variant="contained"
          color="success"
          sx={{ height: "50px" }}
        >
          Đăng nhập
        </LoadingButton>
      </FormGroup>
    </LayoutAuthentication>
  );
};

export default SignInPage;
