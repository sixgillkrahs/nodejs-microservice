import React from "react";
import {
  Input,
  InputProps,
  Form,
  FormProps,
  Card,
  Link,
  Button,
} from "react-daisyui";

const LoginPage = () => {
  const formProps: FormProps = {};

  const inputProps: InputProps = {
    name: "userName",
    title: "hihi",
    type: "text",
    placeholder: "Enter your email",
  };

  return (
    <div className="pt-9">
      <Card className="flex-shrink-0 w-full shadow-2xl bg-base-100">
        <Card.Title>Login</Card.Title>
        <Card.Body>
          <Form>
            <Form.Label title="Email" />
            <Input type="text" placeholder="email" className="input-bordered" />
          </Form>
          <Form>
            <Form.Label title="Password" />
            <Input
              type="text"
              placeholder="password"
              className="input-bordered"
            />
            <label className="label">
              <Link href="#" className="label-text-alt" hover>
                Forgot password?
              </Link>
            </label>
          </Form>
          <Form className="mt-6">
            <Button>Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginPage;
