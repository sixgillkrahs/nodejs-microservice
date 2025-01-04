import { Formik, Form as Formi } from "formik";
import * as Yup from "yup";
import { LoginObj } from "../../interfaces/login";
import { login } from "../../services/user/api";
import { useNavigate } from "react-router-dom";
import { Link as Linkss } from "react-router-dom";
import { Card } from "@mui/material";

const validationSchema = Yup.object({
  userName: Yup.string().required("Email is required").email("hhi"),
  password: Yup.string().required("Password is required").min(6, "h"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const initialValues: LoginObj = {
    userName: "",
    password: "",
  };

  const handelSubmit = async (values: LoginObj) => {
    const resp = await login(values);
    localStorage.setItem("token", resp.token);
    navigate("/");
  };

  return (
    <div className="pt-9  justify-center flex">
      <Card className="flex-shrink-0 w-full shadow-2xl bg-base-100 max-w-2xl">
        {/* <Card.Body>
          <p className="text-center text-4xl font-bold py-6">Login</p>
          <Formik
            onSubmit={handelSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {() => {
              return (
                <Formi>
                  <FormCusInput
                    label="Email"
                    propsOrFieldName={"userName"}
                    icon={<HiOutlineMail />}
                    position="right"
                    placeholder="Enter your email"
                  />
                  <FormCusInput
                    label="Password"
                    propsOrFieldName={"password"}
                    icon={<TbLockPassword />}
                    position="right"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <label className="label">
                    <Link href="#" className="label-text-alt" hover>
                      Forgot password?
                    </Link>
                  </label>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <label className="label flex justify-end">
                    <span className="flex items-center">
                      <p>You don't have account?</p>
                      <p>
                        <Link href="#" className="label-text-alt" hover>
                          <Linkss to={"/register"}> Sign up now!</Linkss>
                        </Link>
                      </p>
                    </span>
                  </label>
                </Formi>
              );
            }}
          </Formik>
        </Card.Body> */}
      </Card>
    </div>
  );
};

export default LoginPage;
