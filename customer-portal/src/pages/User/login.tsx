import { Form, Card, Link, Button } from "react-daisyui";
import { Formik, Form as Formi } from "formik";
import * as Yup from "yup";
import { LoginObj } from "../../interfaces/login";
import { FormInput } from "../../components";

const LoginPage = () => {
  const initialValues: LoginObj = {
    userName: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("Email is required").email("hhi"),
    password: Yup.string().required("Password is required").min(6, "h"),
  });

  const handelSubmit = (values: LoginObj) => {
    console.log(values);
  };

  return (
    <div className="pt-9  justify-center flex">
      <Card className="flex-shrink-0 w-full shadow-2xl bg-base-100 max-w-2xl">
        <Card.Body>
          <p className="text-center text-4xl font-bold py-6">Login</p>
          <Formik
            onSubmit={handelSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {() => {
              return (
                <Formi>
                  <FormInput
                    propsOrFieldName="userName"
                    label="Email"
                    name="userName"
                    type="text"
                    placeholder="Enter your email"
                  />
                  <FormInput
                    propsOrFieldName="password"
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <label className="label">
                    <Link href="#" className="label-text-alt" hover>
                      Forgot password?
                    </Link>
                  </label>
                  <Form className="mt-6">
                    <Button type="submit">Login</Button>
                  </Form>
                  <label className="label flex justify-end">
                    <Link href="#" className="label-text-alt" hover>
                      I dont have a account, Sign up now!
                    </Link>
                  </label>
                </Formi>
              );
            }}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
