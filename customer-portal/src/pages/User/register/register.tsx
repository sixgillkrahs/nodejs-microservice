import {
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
  Divider,
} from "@mui/material";
import { useTranslate } from "../../../utils";
import { Form, FormInput } from "../../../components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Facebook, Google, LocalPhoneRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  phone: Yup.string().required("Phone is required"),
});

const RegisterPage = () => {
  const translate = useTranslate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    console.log("Dữ liệu form:", values);
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
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              component="div"
              variant="subtitle1"
              sx={{ color: "black", fontWeight: 500 }}
            >
              {translate("register.page.title.content.hello")}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "black", fontWeight: 500 }}
            >
              {translate("register.page.title.content.register")}
            </Typography>
            <Form
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
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
                  {translate("login.page.button.label.register")}
                </Button>
              }
            >
              <FormInput
                control={control}
                label={translate("register.page.field.label.phone")}
                name="phone"
                errors={errors.phone}
                required
                sx={{ mt: 5 }}
                helperText={errors.phone?.message}
                icon={<LocalPhoneRounded />}
                placeholder={translate("register.page.field.placeholder.phone")}
              />
            </Form>
            <Divider sx={{ mt: 2 }}>
              {translate("login.page.diveder.title.or")}
            </Divider>
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
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default RegisterPage;
