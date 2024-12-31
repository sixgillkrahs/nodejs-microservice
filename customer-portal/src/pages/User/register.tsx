import { Card, Link, Button, Input } from "react-daisyui";
import { Formik, Form as Formi } from "formik";
import * as Yup from "yup";
import React from "react";
import { Link as Linkss } from "react-router-dom";
import { FormCusInput, FormInput } from "../../components";
import { HiOutlineMail } from "react-icons/hi";
import { FormRadio } from "../../components";
import { gender } from "../../constants/user";

const validationSchema = Yup.object({
  userName: Yup.string().required("Email is required").email("hhi"),
  password: Yup.string().required("Password is required").min(6, "h"),
});

const RegisterPage = () => {
  const initialValues = {};

  const handelSubmit = async () => {};
  return (
    <Card className="flex-shrink-0 w-full shadow-2xl bg-base-100 max-w-2xl">
      <Card.Body>
        <p className="text-center text-4xl font-bold py-6">Register</p>
        <Formik
          onSubmit={handelSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {() => {
            return (
              <Formi>
                <FormInput
                  propsOrFieldName="fullName"
                  label="Full Name"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                />
                <FormInput
                  propsOrFieldName="phone"
                  label="Phone"
                  name="phone"
                  type="text"
                  placeholder="Enter your phone"
                />
                <FormInput
                  propsOrFieldName="userName"
                  label="Email"
                  name="userName"
                  type="text"
                  placeholder="Enter your email"
                />
                <FormInput
                  propsOrFieldName="dob"
                  label="Date of birthday"
                  name="dob"
                  type="date"
                />
                <FormRadio
                  label="Gender"
                  propsOrFieldName={"gender"}
                  option={gender}
                />
                <FormInput
                  propsOrFieldName="password"
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </Formi>
            );
          }}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default RegisterPage;
