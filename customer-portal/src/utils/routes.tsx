import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home";
import NoFoundPage from "../pages/404";
import LoginPage from "../pages/User/login";
import RegisterPage from "../pages/User/register";

const childRoutes: RouteObject[] = [
  {
    path: "",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

const routerRoot: RouteObject[] = [
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
