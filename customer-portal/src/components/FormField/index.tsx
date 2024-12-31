import { useField } from "formik";
import { Form, Input, Radio as RRadio } from "react-daisyui";
import { InputFormCusProp, InputFormProp, RadioFormProp } from "./interface";
import _ from "lodash";
import { Radio } from "../../interfaces/baseEvent";
import { renderLang } from "../../utils/render";

const FormInput: React.FC<InputFormProp> = ({
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

const FormCusInput: React.FC<InputFormCusProp> = ({
  label,
  propsOrFieldName,
  position = "right",
  icon,
  ...props
}) => {
  const [field, meta] = useField(propsOrFieldName);
  const inputColor = meta.touched ? (meta.error ? "error" : "ghost") : "ghost";

  return (
    <Form>
      <Form.Label title={label} />
      <label
        className={`input input-bordered flex items-center gap-2 ${
          position == "left" && "flex-row-reverse"
        }`}
      >
        {icon}
        <input
          type={props.type}
          className="grow"
          placeholder={props.placeholder}
          {...field}
          // {...props}
        />
      </label>
      {meta.touched && meta.error ? (
        <label className="label">
          <span className="label-text-alt text-error">{meta.error}</span>
        </label>
      ) : null}
    </Form>
  );
};

const FormRadio: React.FC<RadioFormProp> = ({
  label,
  propsOrFieldName,
  option,
  layout = "horizontal",
  ...props
}) => {
  const [field, meta] = useField(propsOrFieldName);
  return (
    <Form>
      <Form.Label className="flex flex-col items-start">
        <span className="block mb-2">{label}</span>
        <div
          className={`flex ${
            layout === "horizontal" ? "flex-row" : "flex-col"
          } gap-6`}
        >
          {_.isArray(option) &&
            option.map((item: Radio) => {
              return (
                <div key={item.value} className="flex items-center">
                  <RRadio
                    name={label}
                    className="checked:bg-red-500"
                    value={item.value}
                  />
                  <span className="ml-2">{renderLang(item.label)}</span>
                </div>
              );
            })}
        </div>
      </Form.Label>
    </Form>
  );
};

export { FormInput, FormCusInput, FormRadio };
