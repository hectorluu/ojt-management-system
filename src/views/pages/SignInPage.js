import useToggleValue from "logic/hooks/useToggleValue";
import React, { useState } from "react";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import FormGroup from "views/components/common/FormGroup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Label } from "views/components/label";
import { Input } from "views/components/input";
import { IconEyeToggle } from "views/components/icons";
import { Button } from "views/components/button";
import { useDispatch } from "react-redux";
import { authLogin } from "logic/store/auth/auth-slice";

const schema = yup.object({
  email: yup.string().email("").required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be 8 character "),
});
const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  const dispatch = useDispatch();
  // const handleSignIn = (values) => {
  //   dispatch(authLogin(values));
  // };
  const handleSignIn = async (values) => {
    setIsLoading(true); // Set loading state

    // Simulate a delay of 0.5 seconds
    await new Promise((resolve) => setTimeout(resolve, 500));

    dispatch(authLogin(values));

    // Reset loading state after dispatching the action
    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <LayoutAuthentication heading="KNS OJT Management">
      <form onSubmit={handleSubmit(handleSignIn)}>
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            control={control}
            name="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            control={control}
            name="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Enter Password"
            error={errors.password?.message}
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            ></IconEyeToggle>
          </Input>
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
