import { Button } from "@mui/material";
import React, { BaseSyntheticEvent, ReactNode } from "react";
import {
  FieldValues,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import _ from "lodash";

interface formProp {
  okText?: string | undefined;
}

interface FormProps {
  children: ReactNode;
  handleSubmit: (
    onValid: SubmitHandler<FieldValues>,
    onInvalid?: SubmitErrorHandler<FieldValues> | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<FieldValues>;
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
