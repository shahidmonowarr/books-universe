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
      <form onSubmit={formik.handleSubmit}>
        <input
          className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
          className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
            className=" duration-300 border rounded-md hover:bg-black hover:text-white py-[10px] px-[20px] font-medium"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
