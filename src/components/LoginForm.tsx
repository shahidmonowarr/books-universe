"use client";

import { useFormik } from "formik";
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { cn } from "../lib/utils";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { loginState } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import { IError } from "../types/globalTypes";
import Loading from "./Loading";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [login, { isSuccess, data, isError, error, isLoading, reset }] =
    useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const path = state?.path || "/";

  // form handle
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      login(values);
      resetForm();
    },
  });

  // token set in local storage
  const accessToken = data?.data?.accessToken;
  if (accessToken) {
    localStorage.setItem("token", JSON.stringify(accessToken));
  }

  // notification
  React.useEffect(() => {
    if (isSuccess) {
      toast(`${data?.message}`);
      reset();
      // set token into state for header request
      if (accessToken) {
        dispatch(loginState({ accessToken }));
      }
      navigate(path, { replace: true });
    } else if (isError) {
      toast.error((error as IError)?.data.message);
      reset();
    }
  }, [data, error, isError, isSuccess, reset]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Input
              id="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <Button>Login with email</Button>
        </div>
      </form> */}
      <form onSubmit={formik.handleSubmit}>
        <input
          className="w-full p-2 mb-3"
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          onChange={formik.handleChange("email")}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="formik_err text-sm text-red-600">
            {formik.errors.email}
          </div>
        ) : null}

        <input
          className="w-full p-2 mb-3"
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          onChange={formik.handleChange("password")}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="formik_err text-sm text-red-600">
            {formik.errors.password}
          </div>
        ) : null}

        <Link to="/signup">
          <p className="text-sm font-bold">Create an account ?</p>
        </Link>
        <div className="flex justify-center gap-[30px] mt-[20px]">
          <button
            type="submit"
            className="first_button duration-300 rounded-full py-[10px] px-[20px] font-medium"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
