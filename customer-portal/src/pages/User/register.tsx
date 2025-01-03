import { Formik, Form as Formi, FormikHelpers } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { Link as Linkss } from "react-router-dom";
import { gender } from "../../constants/user";
import { RegisterObj } from "../../interfaces/register";
import { register } from "../../services/user/api";

const validationSchema = Yup.object({
  userName: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),

  fullName: Yup.string()
    .required("Full name is required")
    .min(5, "Full name must be at least 5 characters long")
    .max(50, "Full name must not exceed 50 characters"),

  phone: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 characters long"),

  gender: Yup.string().required("Gender is required"),

  dob: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
});

const RegisterPage = () => {
  const [alerts, setAlerts] = useState<any[]>([
    {
      text: "This is a custom alert!",
      status: "info",
    },
  ]);
  const handleAddToast = () => {
    setAlerts((alerts) => [
      ...alerts,
      {
        text: "New message arrived.",
        status: "success",
      },
    ]);
  };
  const initialValues = {
    userName: "",
    password: "",
    fullName: "",
    phone: "",
    gender: "",
    dob: "",
  };

  const handelSubmit = async (values: RegisterObj) => {
    const resp = await register(values);
    console.log(resp);
  };
  return <></>;
};

export default RegisterPage;
