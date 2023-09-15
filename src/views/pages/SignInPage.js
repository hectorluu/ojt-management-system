import useToggleValue from "logic/hooks/useToggleValue";
import React, { useState } from "react";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import FormGroup from "views/components/common/FormGroup";
import { useForm } from "react-hook-form";
import { Label } from "views/components/label";
import { IconEyeToggle } from "views/components/icons";
import { Button } from "views/components/button";
import { useDispatch } from "react-redux";
import { authLogin } from "logic/store/auth/auth-slice";
import { loginValid } from "logic/utils/validateUtils";
import { TextField } from "@mui/material";
const SignInPage = () => {
  const { handleSubmit } = useForm();
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
      <form onSubmit={handleSubmit(handleSignIn)}>
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
          <Label htmlFor="password">Password *</Label>
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
            <span className="inline-block text-sm font-medium text-primary underline hover:underline-offset-2">
              Forgot password
            </span>
          </div>
        </FormGroup>
        <Button
          className="w-full hover:bg-green-600"
          kind="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="w-5 h-5 mx-auto animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignInPage;
