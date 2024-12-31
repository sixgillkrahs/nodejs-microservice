import { FieldHookConfig } from "formik";
import { InputProps, RadioProps } from "react-daisyui";
import { Radio } from "../../interfaces/baseEvent";

export interface InputFormProp extends InputProps {
  label: string;
  propsOrFieldName: string | FieldHookConfig<any>;
}

export interface InputFormCusProp extends InputProps {
  label: string;
  propsOrFieldName: string | FieldHookConfig<any>;
  icon?: React.ReactNode;
  position?: "right" | "left";
}

export interface RadioFormProp extends RadioProps {
  label: string;
  propsOrFieldName: string | FieldHookConfig<any>;
  option: Radio[];
  layout?: "horizontal" | "vertical";
}
