import { FieldHookConfig, useField } from "formik";
import { Form, Input, InputProps } from "react-daisyui";

interface InputCusProp extends InputProps {
  label: string;
  propsOrFieldName: string | FieldHookConfig<any>;
}

const FormInput: React.FC<InputCusProp> = ({
  label,
  propsOrFieldName,
  ...props
}) => {
  const [field, meta] = useField(propsOrFieldName);
  const inputColor = meta.touched ? (meta.error ? "error" : "ghost") : "ghost";

  return (
    <Form>
      <Form.Label title={label} />
      <Input
        type="text"
        color={inputColor}
        placeholder="email"
        className="input-bordered"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <label className="label">
          <span className="label-text-alt text-error">{meta.error}</span>
        </label>
      ) : null}
    </Form>
  );
};

export { FormInput };
