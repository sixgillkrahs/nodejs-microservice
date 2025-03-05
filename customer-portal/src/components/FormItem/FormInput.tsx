import { InputAdornment, TextField } from "@mui/material";
import React, { FC, HTMLInputTypeAttribute, ReactNode } from "react";
import { Controller } from "react-hook-form";
import AccountCircle from "@mui/icons-material/AccountCircle";

interface FormInputProps {
  control: any;
  errors: any;
  name: string;
  label: string | ReactNode | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  sx?: any;
  icon?: ReactNode;
}

const FormInput: FC<FormInputProps> = ({
  control,
  errors,
  name,
  label,
  placeholder,
  type,
  helperText,
  required = false,
  sx,
  icon = undefined,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          error={!!errors}
          helperText={helperText}
          placeholder={placeholder}
          type={type}
          required={required}
          fullWidth
          sx={sx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
};

export default FormInput;
