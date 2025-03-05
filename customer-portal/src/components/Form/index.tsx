import { Button } from "@mui/material";
import React, { ReactNode } from "react";
import { UseFormHandleSubmit, FieldValues } from "react-hook-form";
import _ from "lodash";

interface formProp {
  okText?: string | any;
}

interface FormProps {
  children: ReactNode;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (values: any) => void;
  submiter?: ReactNode | boolean;
  formProps?: formProp;
}

const Form = ({
  children,
  handleSubmit,
  onSubmit,
  submiter,
  formProps,
}: FormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children}
      {_.isBoolean(submiter) && submiter ? (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {formProps?.okText || "Gửi"}
        </Button>
      ) : (
        <>{submiter === false ? null : submiter}</>
      )}
    </form>
  );
};

export default Form;
