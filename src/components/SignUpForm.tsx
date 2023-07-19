"use client";

import { useFormik } from "formik";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { cn } from "../lib/utils";
import { useSignUpMutation } from "../redux/features/auth/authApi";
import { IError } from "../types/globalTypes";
import Loading from "./Loading";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const [signUp, { isSuccess, data, isError, error, isLoading, reset }] =
    useSignUpMutation();
  const navigate = useNavigate();

  // form handle
  const formSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null!], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      const { firstName, lastName, email, password } = values;
      const data = { firstName, lastName, email, password };
      signUp(data);
      resetForm();
    },
  });

  React.useEffect(() => {
    if (isSuccess) {
      toast(`${data?.message}`);
      reset();
      navigate("/login");
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
              autoCorrect="off"
              {...register("password", { required: "Password is required" })}
            />
          </div>
          <Button>Create Account</Button>
        </div>
      </form> */}
      <form onSubmit={formik.handleSubmit}>
        <input
          className="w-full p-2 mb-3"
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          onChange={formik.handleChange("firstName")}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="formik_err text-sm text-red-600">
            {formik.errors.firstName}
          </div>
        ) : null}
        <input
          className="w-full p-2 mb-3"
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          onChange={formik.handleChange("lastName")}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="formik_err text-sm text-red-600">
            {formik.errors.lastName}
          </div>
        ) : null}
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
        <input
          className="w-full p-2 mb-3"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={formik.handleChange("confirmPassword")}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="formik_err text-sm text-red-600">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
        <Link to="/login">
          <p className="text-sm font-bold">Already have an account?</p>
        </Link>
        <div className="flex justify-center gap-[30px] mt-[20px]">
          <button
            type="submit"
            className="first_button duration-300 rounded-full py-[10px] px-[20px] font-medium "
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
