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

const validationSchema = Yup.object({
  userName: Yup.string()
    .required("Email is required")
    .email("Email không hợp lệ"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Mật khẩu phải ít nhất 6 ký tự"),
});

const LoginPage = () => {
  const translate = useTranslate();

  // ✅ Sử dụng Yup resolver
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

  const onSubmit = (data: any) => {
    console.log("Dữ liệu form:", data);
  };

  return (
    <div className="pt-9 justify-center flex">
      <Card
        className="flex-shrink-0 w-full shadow-2xl bg-base-100 max-w-2xl"
        sx={{ display: "flex" }}
      >
        <CardMedia
          component="img"
          sx={{ width: 151 }}
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
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default LoginPage;
