import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
  IndexRouteObject,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home";
import NoFoundPage from "../pages/404";
import LoginPage from "../pages/User/login";
import RegisterPage from "../pages/User/register";
import { RouteObjectCus } from "../interfaces/base";

export const childRoutes: RouteObjectCus[] = [
  {
    index: true,
    name: "Home Page",
    path: "/",
    element: <HomePage />,
  },
  {
    index: true,
    path: "/login",
    name: "Login",
    element: <LoginPage />,
  },
  {
    index: true,
    path: "/sign-up",
    name: "Sign up",
    element: <RegisterPage />,
  },
];

export const routerRoot: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: childRoutes,
  },
  {
    path: "*",
    element: <NoFoundPage />,
  },
];

const rootRoute = createBrowserRouter(routerRoot);

const Routes = () => {
  return <RouterProvider router={rootRoute} />;
};

export default Routes;
