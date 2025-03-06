import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import { useTranslate } from "../../../utils";
import { BpCheckbox, Form, FormInput } from "../../../components";
import { useForm } from "react-hook-form";
import {
  LockOutlined,
  PermIdentity,
  Google,
  Facebook,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { login } from "../../../services/user/api";
import { Resp } from "../../../interfaces/base";
import { useSnackbar } from "../../../contexts/SnackbarContext";

const LoginPage = () => {
  const translate = useTranslate();
  const { showSnackbar } = useSnackbar();

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required(translate("login.page.validate.field.email.required"))
      .email(translate("login.page.validate.field.email.formal")),
    password: Yup.string()
      .required(translate("login.page.validate.field.password.required"))
      .min(6, translate("login.page.validate.field.password.min")),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const resp: Resp = await login({
      userName: values?.userName,
      password: values?.password,
    });
    console.log(resp);
    if (resp.code === 1) {
      showSnackbar(resp.message, "success");
    } else {
      showSnackbar(resp.message, "error");
    }
  };

  return (
    <div className="pt-9 justify-center flex">
      <Card
        className="flex-shrink-0 w-full shadow-2xl bg-base-100 max-w-3xl"
        sx={{ display: "flex" }}
      >
        <CardMedia
          component="img"
          sx={{ width: 300 }}
          src="https://placehold.co/400x700"
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              component="div"
              variant="subtitle1"
              sx={{ color: "black", fontWeight: 500 }}
            >
              {translate("login.page.title.content.hello")}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "black", fontWeight: 500 }}
            >
              {translate("login.page.title.content.login.to.countiue")}
            </Typography>
            <Form
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              formProps={{ okText: translate("login.page.button.label.login") }}
              submiter={
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  size="large"
                  color="secondary"
                  id="demo-customized-button"
                >
                  {translate("login.page.button.label.login")}
                </Button>
              }
            >
              <FormInput
                control={control}
                label={translate("login.page.field.label.email")}
                name="userName"
                errors={errors.userName}
                required
                sx={{ mt: 5 }}
                helperText={errors.userName?.message}
                icon={<PermIdentity />}
                placeholder={translate("login.page.field.placeholder.email")}
              />
              <FormInput
                control={control}
                label={translate("login.page.field.label.password")}
                name="password"
                errors={errors.password}
                required
                helperText={errors.password?.message}
                type="password"
                sx={{ mt: 2 }}
                icon={<LockOutlined />}
                placeholder={translate("login.page.field.placeholder.password")}
              />
            </Form>
            <Box
              sx={{
                display: "flex",
                mt: 2,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <BpCheckbox
                label={translate("login.page.checkbox.label.remember.password")}
              />
              <Link to={""}>
                {translate("login.page.button.label.forgot.password")}
              </Link>
            </Box>
            <Divider>{translate("login.page.diveder.title.or")}</Divider>
            <Grid2 container spacing={2} columns={16} sx={{ mt: 2 }}>
              <Grid2 size={16}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  color="secondary"
                  id="demo-customized-button"
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <Facebook />
                    {translate("login.page.button.label.login.with.facebook")}
                  </span>
                </Button>
              </Grid2>
              <Grid2 size={16}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  color="secondary"
                  id="demo-customized-button"
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <Google />
                    {translate("login.page.button.label.login.with.google")}
                  </span>
                </Button>
              </Grid2>
            </Grid2>
            <Box
              style={{ textAlign: "center" }}
              sx={{
                mt: 2,
              }}
            >
              <Typography
                variant="caption"
                component="div"
                sx={{ color: "black", fontWeight: 500 }}
              >
                <div>
                  <span className="text-gray-400">
                    {translate("login.page.text.title.coutinue")}
                  </span>
                  <Link to={""} className="underline text-red-600">
                    {translate("login.page.text.title.terms.of.use")}
                  </Link>
                  ,{" "}
                  <Link to={""} className="underline text-red-600">
                    {translate("login.page.text.title.privacy.policy")}
                  </Link>
                  ,
                </div>
              </Typography>
              <Typography
                variant="caption"
                component="div"
                sx={{ color: "black", fontWeight: 500 }}
              >
                <Link to={""} className="underline text-red-600">
                  {translate("login.page.text.title.regulations")}
                </Link>
                ,{" "}
                <Link to={""} className="underline text-red-600">
                  {translate("login.page.text.title.policy")}
                </Link>{" "}
                <span className="text-gray-400">
                  {translate("login.page.text.title.our")}
                </span>
              </Typography>
            </Box>
            <Box
              style={{ textAlign: "center" }}
              sx={{
                mt: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ color: "black", fontWeight: 500 }}
              >
                <div>
                  <span className="text-gray-400">
                    {translate("login.page.text.title.not.member")}
                  </span>{" "}
                  <Link to={"/sign-up"} className="underline text-red-600">
                    {translate("login.page.text.title.register")}
                  </Link>{" "}
                  <span className="text-gray-400">
                    {translate("login.page.text.title.here")}
                  </span>
                </div>
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default LoginPage;
