import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslate } from "../utils";
import {
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Dropdown,
  Indicator,
  Navbar,
} from "react-daisyui";
import { BreadcrumbsCustom, Header } from "../components";

const MainLayout = () => {
  const translate = useTranslate();
  return (
    <>
      <Header />
      <div className="lg:px-28">
        <BreadcrumbsCustom />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
